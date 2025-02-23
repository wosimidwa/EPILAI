import os
import mne
import pandas as pd
from sklearn.model_selection import train_test_split

def save_epochs_to_csv(eeg_corrected, file_key, output_directory):
    events, event_id = mne.events_from_annotations(eeg_corrected)

    if len(events) > 0:
        epochs = mne.Epochs(eeg_corrected, events, event_id=event_id, tmin=0, tmax=5, baseline=None, preload=True)
        
        labels = [(event_id[desc] == 'seizure') for desc in event_id]

        output_path = os.path.join(output_directory, file_key.replace('.edf', '_processed-epo.fif'))
        epochs.save(output_path, overwrite=True)
        print(f"Processed {output_path}")

        data = epochs.get_data()
        n_epochs, n_channels, n_times = data.shape
        df = pd.DataFrame(data.reshape(n_epochs, -1))
        df['seizure_label'] = labels

        csv_output_path = os.path.join(output_directory, file_key.replace('.edf', '_processed.csv'))
        df.to_csv(csv_output_path, index=False)
        print(f"Saved {file_key} at {csv_output_path}")

        X = df.drop('seizure_label', axis=1)
        y = df['seizure_label']
        X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
        X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, stratify=y_temp, random_state=42)

        X_train.to_csv(os.path.join(output_directory, file_key.replace('.edf', '_train_X.csv')), index=False)
        y_train.to_csv(os.path.join(output_directory, file_key.replace('.edf', '_train_y.csv')), index=False)
        X_val.to_csv(os.path.join(output_directory, file_key.replace('.edf', '_val_X.csv')), index=False)
        y_val.to_csv(os.path.join(output_directory, file_key.replace('.edf', '_val_y.csv')), index=False)
        X_test.to_csv(os.path.join(output_directory, file_key.replace('.edf', '_test_X.csv')), index=False)
        y_test.to_csv(os.path.join(output_directory, file_key.replace('.edf', '_test_y.csv')), index=False)

        print(f"Data split and saved for {file_key}: Train, Validation, Test sets")

    else:
        print(f"No events found for {file_key}, skipping epoching and labeling.")
