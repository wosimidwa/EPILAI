import torch
import torch.nn.functional as F
from collections import Counter

class  AIModel:
    def __init__(self, model_file, log_file):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = torch.load(model_file, map_location=self.device)
        self.model.eval()
        self.log_file = log_file
        self.predictions = []

    def predict(self, data_point, timestamp):
        data_point = torch.tensor(data_point, dtype=torch.float32).unsqueeze(0).to(self.device) # Batch boyutu ekle

        self.model.eval()
        with torch.no_grad(): 
            output = self.model(data_point)

            if output.shape[1] > 1:
                probs = F.softmax(output, dim=1)
            
                _, predicted_label = torch.max(probs, 1)
        predicted_label = predicted_label.item()

        with open(self.log_file, "a") as f:
            f.write(f"{timestamp}: {predicted_label}\n")

        self.predictions.append(predicted_label)
        return predicted_label
    
    def check_majority(self, idx):
        return (idx + 1) % 20 == 0
    
    def final_label(self):
        if len(self.predictions) >= 20:
            return Counter(self.predictions[-20:]).most_common(1)[0][0]
        return None