#label==1 ise telefona TCP ile bildirim gönderme kodu
import socket

class Notifier:
    def __init__(self, ip, port):
        self.ip = ip
        self.port = port
        
    def send_notif(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((self.ip, self.port))
            s.sendall(b"Kriz tespit edildi.")