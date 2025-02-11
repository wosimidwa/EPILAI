#EEG cihazından .edf dosyasını alıp, filtreleyip, csv'e dönüştürecek kod
import mne
import pandas as pd 
class EEGHandle:
    def __init__(self, edf):
        self.edf = edf
        
    def process_eeg_data(self):
        raw = mne.io.read_raw_edf(self.edf, preload= True)
        raw.filter(1,40) #band-pass filter
        # autonomous ICA
        # min max normalization
        
 
