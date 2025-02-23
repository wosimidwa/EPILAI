
#%% imports
import os
import pandas as pd
import numpy as np
from collections import Counter
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from torch.utils.data import Dataset, DataLoader, WeightedRandomSampler #new for imbalanced data
import torch
import torch.nn as nn
from tqdm import tqdm
from torch.optim.lr_scheduler import ReduceLROnPlateau

#%%
def list_files_in_folders(root_folder):
    all_files = []
    for folder_name, subfolders, filenames in tqdm(os.walk(root_folder)):
        for file in filenames:
            if file.endswith(".csv"):
                all_files.append(os.path.join(folder_name, file))
    return all_files

#%%
def preprocess_data(df, feature_columns, target_column):
    #normalizasyon
    scaler = MinMaxScaler()
    df[feature_columns] = scaler.fit_transform(df[feature_columns])


    label_encoder = LabelEncoder()
    df[target_column] = label_encoder.fit_transform(df[target_column])


    sequences = df[feature_columns].values
    labels = df[target_column].values
    return sequences, labels, scaler, label_encoder


#%% datasetin hazırlanması 
class TimeSeriesDataset(Dataset):
    def __init__(self, sequences, labels, sequence_length=10):
        self.sequences = []
        self.labels = []
        for i in range(len(sequences) - sequence_length): #eşit pencerelere ayrılmış verinin sonuna gelene kadar
            self.sequences.append(sequences[i:i+sequence_length]) #ne kadar ilerlediğimizin takibi
            self.labels.append(labels[i + sequence_length - 1])
        
    def __len__(self):
        return len(self.sequences)
    
    def __getitem__(self, index):
        return torch.tensor(self.sequences[index], dtype=torch.float32), torch.tensor(self.labels[index], dtype=torch.long)



#%% Model Mimarisi 
#dosyadan dosyaya geçişte gizli durumu sıfırlayacak şekilde güncellendi
class ImprovedLSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes, dropout=0.3):
        super(ImprovedLSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, bidirectional=True)
        self.fc = nn.Linear(hidden_size * 2, num_classes)  # Bidirectional LSTM'den dolayı 2 katına çıkıyor
        # self.sigmoid = nn.Sigmoid() # 2 label için sigmoid eklemesi çıktı katmanına
        self.dropout = nn.Dropout(0.4) #0.2-0.5 arası denemeler yap

    def forward(self, x, hidden):
        lstm_out, hidden = self.lstm(x,hidden)
        lstm_out = self.dropout(lstm_out[:, -1, :])  # Son zaman adımını al ve Dropout uygula
        out = self.fc(lstm_out)
        return out, hidden
    
    def hidden(self, batch_size, device): #sıfırlama fonksiyonu (ilk gizli durum + hücre durumu)
        return (torch.zeros(self.num_layers * 2, batch_size, self.hidden_size).to(device),
                torch.zeros(self.num_layers * 2, batch_size, self.hidden_size).to(device))

#%%
def calculate_class_weights(files, target_column):
    dataframes = [pd.read_csv(file) for file in tqdm(files)]
    combined_df = pd.concat(dataframes, ignore_index=True)

    label_encoder = LabelEncoder()
    combined_df[target_column] = label_encoder.fit_transform(combined_df[target_column])
    labels = combined_df[target_column].values
   
    class_counts = Counter(labels)
    total_samples = len(labels)
   
    class_weights = {cls: total_samples / count for cls, count in class_counts.items()}
    return class_weights, label_encoder

#%%
def preprocess_data(df, feature_columns, target_column):
    #normalizasyon - min max scaler
    scaler = MinMaxScaler()
    df[feature_columns] = scaler.fit_transform(df[feature_columns])

    label_encoder = LabelEncoder()
    df[target_column] = label_encoder.fit_transform(df[target_column])

    sequences = df[feature_columns].values
    labels = df[target_column].values
    return sequences, labels, scaler, label_encoder

def train_model_with_class_weights(model, num_epochs, learning_rate, device, feature_columns, target_column):
    files = list_files_in_folders(root_folder)
    class_weights, label_encoder = calculate_class_weights(files, target_column)
    weights = torch.tensor([class_weights[i] for i in sorted(class_weights.keys())], dtype=torch.float32).to(device)

    criterion = nn.CrossEntropyLoss(weight=weights) # 2'den fazlası için CrossEntropyLoss
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate) #adam optimizer
    scheduler = ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=3, verbose=True)
    
    train_files = files[:int(len(files)*0.8)]
    val_files = files[int(len(files)*0.8):] #0.2 :)
    model.to(device) #test dataset ayrıc ayrılmış durumda test koduyla beraber kullanılacak
    
    for epoch in range(num_epochs):
        total_loss = 0
        all_sequences, all_labels = [], []
        
        for file in tqdm(files):
            zero = model.hidden(sequences.shape[0], device)
            df = pd.read_csv(file)
            sequences, labels, _scaler, _label_encoder = preprocess_data(df, feature_columns, target_column)
            dataset = TimeSeriesDataset(sequences, labels, sequence_length)
            train_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
            
            for sequences, labels in tqdm(train_loader):
                sequences, labels = sequences.to(device), labels.to(device)
                
                optimizer.zero_grad()
                outputs, zero = model(sequences, zero)
                loss = criterion(outputs, labels)
                loss.backward()
                optimizer.step()
                
                total_loss += loss.item()
                zero = (zero[0].detach(), zero[1].detach()) #gradyan bağlantılarını siliyoruz ki önceki dosyadan bilgi taşımasın 

        
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for val_file in tqdm(val_files):
                df = pd.read_csv(val_file)
                val_sequences, val_labels, _, _ = preprocess_data(df, feature_columns, target_column)
                val_dataset = TimeSeriesDataset(val_sequences, val_labels, sequence_length)
                val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=True)
                for val_sequences, val_labels in val_loader:
                    val_sequences, val_labels = val_sequences.to(device), val_labels.to(device)
                    val_outputs = model(val_sequences)
                    val_loss += criterion(val_outputs, val_labels).item()
        val_loss /= len(val_files)
        print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {total_loss/len(train_loader):.4f}, Val Loss: {val_loss:.4f}")
        scheduler.step(val_loss)
        
#%% hiper parametreler
root_folder = "D:/dataset2/14 gb"
feature_columns = ['Fp1', 'F7', 'T7', 'P7', 'P2', 'F3', 'C3', 'P3', 'Fz', 'Cz',
                    'Fp2', 'F4', 'C4', 'P4', 'P5', 'F8', 'T8', 'P8', 'P9', 'T9',
                    'FT9', 'FT10', 'TP8']
target_column = "label"
sequence_length = 20
num_epochs = 10
learning_rate = 0.001
hidden_size = 128
num_layers = 3
batch_size = 32
device = "cuda" if torch.cuda.is_available() else "cpu"

model = ImprovedLSTMModel(input_size=len(feature_columns), hidden_size=hidden_size, num_layers=num_layers, num_classes=2)
train_model_with_class_weights(model, num_epochs, learning_rate, device, feature_columns, target_column)
torch.save(model.state_dict(), "D:/model_kayitlari/lstm_model11.pth")
print("Model kaydedildi.")
