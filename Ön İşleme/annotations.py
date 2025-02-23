def parse_annotations(file_path):
    """ Anotasyon dosyasını okur ve nöbet başlangıç-bitiş zamanlarını bir sözlük olarak döndürür. """
    annotations_dict = {}
    with open(file_path, 'r') as file:
        lines = file.readlines()
        current_file = None
        for line in lines:
            line = line.strip()
            if line.startswith("File Name:"):
                current_file = line.split(": ")[1].strip()
                annotations_dict[current_file] = []
            elif "Seizure" in line and "Start Time" in line:
                seizure_start = int(line.split(": ")[1].strip())
            elif "Seizure" in line and "End Time" in line:
                seizure_end = int(line.split(": ")[1].strip())
                if current_file:
                    annotations_dict[current_file].append({
                        'onset': seizure_start,
                        'duration': seizure_end - seizure_start,
                        'description': 'seizure'
                    })
    return annotations_dict
