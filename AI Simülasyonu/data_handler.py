# CSV dosyası üzerinden veri okuma, işleme ve grafiğe aktarma işlemleri
#bu koda tekrar bak

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

class DataHandler:
    def __init__(self, csv):
        self.data = pd.read_csv(csv)
        self.x_data = self.data.index
        self.y_data = self.data.iloc[:, 1:].values 
        self.fig, self.ax = plt.subplots()
        self.lines = []
        
        for i in range(self.y_data.shape[1]): #her kanal için bir çizgi (bu değişebilir, aşağıda tek ok yeter sanki)
            line = self.ax.plot(self.x_data[:1], self.y_data[:1, i])
            self.lines.append(line)
        self.ax.set_xlabel("Anlık Veri Noktası")
        self.ax.set_ylabel("Frekans Değerleri / Hz")
        self.ax.set_title("Anlık EEG Verisi Analizi ve Nöbet Tahmini", fontdict=12)
        self.ax.set_xlim(self.x_data.min(), self.x_data.max())
        self.ax.axvline(x=0, color='r', linestyle='--', linewidth= 0.5)
        
        plt.ion()            
        plt.show(block=False)
    
    def get_data_point(self, idx):
        return self.data.iloc[[idx], 1:].values
    
    def update_graph(self, idx):
        for i, line in enumerate(self.lines):
            line.set_data(self.x_data[:idx+1], self.y_data[:idx+1, i])
        
        self.ax.relim()
        self.ax.autoscale_view()
        self.ax.axvline(x=idx, color='b', linestyle='--', linewidth= 0.5)
        self.fig.canvas.flush_events()
    