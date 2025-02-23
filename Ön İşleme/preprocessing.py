import mne
import numpy as np
import os
from config import CH_MAPPING

def preprocess_eeg(file_path, annotations):
    print(f"Processing {file_path}...")

    eeg = mne.io.read_raw_edf(file_path, preload=True)
    eeg.rename_channels(CH_MAPPING)
    eeg.set_montage("standard_1020", on_missing="ignore")

    # Band-pass filtreleme (1 Hz - 40 Hz)
    eeg.filter(1, 40)

    # ICA ile artefakt temizliği
    ica = mne.preprocessing.ICA(method="picard", fit_params={"extended": True, "ortho": False}, random_state=1)
    ica.fit(eeg)

    artifact_components = []
    frontal_ch_names = ['Fp1', 'Fp2']
    component_activations = ica.get_sources(eeg).get_data()

    for i in range(ica.n_components_):
        component_data = component_activations[i]
        for ch in frontal_ch_names:
            if ch in eeg.ch_names:
                ch_data = eeg.copy().pick_channels([ch]).get_data()[0]
                corr = np.corrcoef(component_data, ch_data)[0, 1]
                if abs(corr) > 0.4:
                    artifact_components.append(i)
                    break

    ica.exclude = artifact_components
    eeg_corrected = eeg.copy()
    ica.apply(eeg_corrected)
    eeg_corrected.set_meas_date(None)

    file_key = os.path.basename(file_path)
    if file_key in annotations:
        onset_times = [ann['onset'] for ann in annotations[file_key]]
        durations = [ann['duration'] for ann in annotations[file_key]]
        descriptions = [ann['description'] for ann in annotations[file_key]]
        ann = mne.Annotations(onset=onset_times, duration=durations, description=descriptions)
        eeg_corrected.set_annotations(ann)

    return eeg_corrected
