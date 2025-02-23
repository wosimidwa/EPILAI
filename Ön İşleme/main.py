import os
from config import DATA_DIRECTORY, OUTPUT_DIRECTORY, ANNOTATIONS_FILE
from annotations import parse_annotations
from preprocessing import preprocess_eeg
from dataset import save_epochs_to_csv

annotations = parse_annotations(ANNOTATIONS_FILE)

for filename in os.listdir(DATA_DIRECTORY):
    if filename.endswith(".edf"):
        file_path = os.path.join(DATA_DIRECTORY, filename)

        eeg_corrected = preprocess_eeg(file_path, annotations)
        save_epochs_to_csv(eeg_corrected, filename, OUTPUT_DIRECTORY)
