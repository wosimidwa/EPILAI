#AI simülasyonu için ana dosya - tamam deneme yapılacak 

from eeg_handler import EEGHandle
from data_handler import DataHandler
from AI_model import AIModel
from notification import Notifier
import time

csv = "D:/dataset2/numbered_chb06_13.csv"
output_log = "C:/Users/lenovo03/Desktop/tubitak/sunum_comp/AI Simülasyonu/output_log.txt"
trained = "D:/model kayıtları/lstm_model7.pth"
edf = "D:/raw"
phone_ip = "ip" #düzenlenecek
port = 5000 #düzenlenecek 

if __name__ == "__main__":
    eeg_handler = EEGHandle(edf)
    eeg_handler.process_eeg_data()
    
    data_handler = DataHandler(csv)
    AI_model = AIModel(trained, output_log)
    notification = Notifier(phone_ip, port )
    
    for i in range(len(data_handler.data)):
        data_point = data_handler.get_data_point(i)
        prediction = AI_model.predict(data_point, i) # i = zaman damgası
        data_handler.update_graph(i)
        
        if AI_model.label_set(i):
            majority_label = AI_model.final_label()
            if majority_label == 1:
                notification.send_notif()
                
        time.sleep(0.5) #okunabilite için veri akışını yavaşlatma
