import os
from config import DATA_DIRECTORY, CHANNEL_MAPPING, OUTPUT_DIRECTORY
from annotations import parse_annotations
from preprocessing import process_file

if __name__ == "__main__":
    annotations = parse_annotations()
    
    for filename in os.listdir(DATA_DIRECTORY):
        if filename.endswith(".edf"):
            file_path = os.path.join(DATA_DIRECTORY, filename)
            process_file(file_path, CHANNEL_MAPPING, OUTPUT_DIRECTORY, annotations)
