import os

import eel
# from vnc import VNC
from threading import Thread
import atexit
import sys

# from inputVNC import InputManager
# from pRD import VNC
from PIL import Image
from io import BytesIO
import socket
import mss
import base64
import struct
import time


class VNC:

    def __init__(self, ip='192.168.1.241', port=7000):
        self.ip = ip
        self.port = port

    def screenshot(self):
        with mss.mss() as sct:
            img = sct.grab(sct.monitors[1])
        return self.rgba_to_rgb(img)

    def rgba_to_rgb(self, image):
        return Image.frombytes('RGB', image.size, image.bgra, 'raw', 'BGRX')

    def image_serializer(self, resolution=(1600, 900)):
        image = self.screenshot().resize(resolution, Image.LANCZOS)# ANTIALIAS
        buffer = BytesIO()
        image.save(buffer, format='jpeg')
        data_string = base64.b64encode(buffer.getvalue())
        return data_string

    def image_deserializer(self, image_string):
        return Image.open(BytesIO(base64.b64decode(image_string)))

    def send_msg(self, sock, msg):
        # Prefix each message with a 4-byte length (network byte order)
        msg = struct.pack('>I', len(msg)) + msg
        sock.sendall(msg)

    def recv_msg(self, sock):
        # Read message length and unpack it into an integer
        raw_msglen = self.recvall(sock, 4)
        if not raw_msglen:
            return None
        msglen = struct.unpack('>I', raw_msglen)[0]
        # Read the message data
        return self.recvall(sock, msglen)

    def recvall(self, sock, n):
        # Helper function to recv n bytes or return None if EOF is hit
        data = b''
        while len(data) < n:
            packet = sock.recv(n - len(data))
            if not packet:
                return None
            data += packet
        return data

    def transmit(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sender:
            sender.bind((self.ip, self.port))
            sender.listen()
            print('Waiting for connection...')
            conn, addr = sender.accept()
            with conn:
                print('Connected by', addr)
                while True:
                    # start_time = time.time()
                    self.send_msg(conn, self.image_serializer())
                    # print(self.data_string)
                    # print("FPS: ", 1/(time.time() - start_time))

    def start_receive(self):
        self.conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.conn.connect((self.ip, self.port))
        print("Connected to ", self.ip, ":", self.port)

    def receive(self):
        try:
            # start_time = time.time()
            data_string = self.recv_msg(self.conn)
            return data_string.decode()
            # self.image.show()
            # print("FPS: ", 1/(time.time() - start_time))

        except Exception as e:
            print(e)
        return None

import socket
import time
import pyautogui
import struct
from pynput import mouse
from pynput import keyboard


class InputManager:

    def __init__(self, ip='192.168.1.241', port=6969):
        self.input = {
            "mouse_pos": [0.0, 0.0],
            "lmb": False,
            "rmb": False,
            "keys": [],
        }
        self.ip = ip
        self.port = port

    def send_msg(self, sock, msg):
        # Prefix each message with a 4-byte length (network byte order)
        msg = struct.pack('>I', len(msg)) + msg
        sock.sendall(msg)

    def recv_msg(self, sock):
        # Read message length and unpack it into an integer
        raw_msglen = self.recvall(sock, 4)
        if not raw_msglen:
            return None
        msglen = struct.unpack('>I', raw_msglen)[0]
        # Read the message data
        return self.recvall(sock, msglen)

    def recvall(self, sock, n):
        # Helper function to recv n bytes or return None if EOF is hit
        data = b''
        while len(data) < n:
            packet = sock.recv(n - len(data))
            if not packet:
                return None
            data += packet
        return data

    def set_resolution(self, width=1280, height=720):
        self.width = width
        self.height = height
        # print(self.width, self.height)

    def motion(self, event):
        self.input["mouse_pos"] = [event.x / self.width, event.y / self.height]
        self.send_msg(self.conn, str(self.input).encode())

    def key_pressed(self, event):
        print("Key Press: ", repr(event.char))
        self.input["keys"].append(repr(event.char))
        self.input["keys"] = list(set(self.input["keys"]))
        self.send_msg(self.conn, str(self.input).encode())

    def key_released(self, event):
        print("Key Released: ", repr(event.char))
        try:
            self.input["keys"].remove(repr(event.char))
        finally:
            self.send_msg(self.conn, str(self.input).encode())

    def left_click_pressed(self, event):
        self.input["mouse_pos"] = [event.x / self.width, event.y / self.height]
        self.input["lmb"] = True
        self.send_msg(self.conn, str(self.input).encode())

    def left_click_released(self, event):
        self.input["mouse_pos"] = [event.x / self.width, event.y / self.height]
        self.input["lmb"] = False
        self.send_msg(self.conn, str(self.input).encode())

    def right_click_pressed(self, event):
        self.input["mouse_pos"] = [event.x / self.width, event.y / self.height]
        self.input["rmb"] = True
        self.send_msg(self.conn, str(self.input).encode())

    def right_click_released(self, event):
        self.input["mouse_pos"] = [event.x / self.width, event.y / self.height]
        self.input["rmb"] = False
        self.send_msg(self.conn, str(self.input).encode())

    def transmit(self):
        self.conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.conn.connect((self.ip, self.port))
        print("Connected to ", self.ip, ":", self.port)
        # while True:
        #     #print(self.input["mouse_pos"])
        #     conn.send(str(self.input).encode())
        #     conn.recv(10)

    def receive(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sender:

            sender.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            sender.bind((self.ip, self.port))
            sender.listen()
            print('Waiting for connection on port(' + str(self.port) + ')...')
            conn, addr = sender.accept()

            with conn:
                print('Connected by', addr)

                width, height = pyautogui.size()
                print(width, height)
                mouse_var = mouse.Controller()
                keyboard_var = keyboard.Controller()
                last_mouse_input = [0, 0]
                while True:
                    # start_time = time.time()
                    received_input = eval(self.recv_msg(conn).decode())
                    mouse_input = received_input["mouse_pos"]
                    mouse_input[0] = mouse_input[0] * width
                    mouse_input[1] = mouse_input[1] * height
                    # print(received_input)
                    if mouse_input != last_mouse_input:
                        mouse_var.position = tuple(mouse_input)
                        last_mouse_input = mouse_input
                        # print(received_input)
                    if received_input['lmb']:
                        # mouse_var.press(mouse.Button.left)
                        mouse_var.click(mouse.Button.left)
                        print("LMB")
                    # else:
                    #    mouse_var.release(mouse.Button.left)
                    if received_input['rmb']:
                        # mouse_var.press(mouse.Button.right)
                        mouse_var.click(mouse.Button.right)
                        print("RMB")
                    # else:
                    #    mouse_var.release(mouse.Button.right)
                    for k in received_input['keys']:
                        print(eval(k))
                        keyboard_var.press(str(eval(k)))

    # EEL

    def connect_input(self):
        self.conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.conn.connect((self.ip, self.port))
        print("Connected to ", self.ip, ":", self.port)

    def transmit_input(self, mouse_pos=None, mouse_down=None, mouse_up=None, keydown=None, keyup=None):
        key_input = {
            "mouse_pos": mouse_pos,
            "mouse_down": mouse_down,
            "mouse_up": mouse_up,
            "keydown": keydown,
            "keyup": keyup
        }
        self.send_msg(self.conn, str(key_input).encode())

    def receive_input(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sender:

            sender.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            sender.bind((self.ip, self.port))
            sender.listen()
            print('Waiting for connection on port(' + str(self.port) + ')...')
            conn, addr = sender.accept()

            with conn:
                print('Connected by', addr)

                width, height = pyautogui.size()
                print(width, height)
                mouse_controller = mouse.Controller()
                keyboard_controller = keyboard.Controller()

                mouse_buttons = [mouse.Button.left, mouse.Button.middle, mouse.Button.right]

                while True:
                    # start_time = time.time()
                    try:
                        received_input = eval(self.recv_msg(conn).decode())
                        print(received_input)

                        mouse_input = received_input['mouse_pos']
                        if mouse_input:
                            mouse_input[0] = mouse_input[0] * width
                            mouse_input[1] = mouse_input[1] * height

                            mouse_controller.position = tuple(mouse_input)

                        if received_input['mouse_down'] == 0:
                            mouse_controller.press(mouse.Button.left)

                        if received_input['mouse_up'] == 0:
                            mouse_controller.release(mouse.Button.left)

                        if received_input['mouse_down'] == 2:
                            mouse_controller.press(mouse.Button.right)

                        if received_input['mouse_up'] == 2:
                            mouse_controller.release(mouse.Button.right)

                        if received_input['keydown']:
                            keyboard_controller.press(keyboard.KeyCode(received_input['keydown']))

                        if received_input['keyup']:
                            keyboard_controller.release(keyboard.KeyCode(received_input['keyup']))

                    except Exception as e:
                        print(e)
                        pass

status = 'None'
connection = 'None'
vnc = VNC()
input_manager = InputManager()

eel.init('webVNC')

@eel.expose
def host():
    global status
    global vnc
    global transmit_thread
    global input_manager

    print('Hosting...')
    status = 'host'

    transmit_thread = Thread(target=vnc.transmit)
    transmit_thread.daemon = True
    transmit_thread.start()

    input_thread = Thread(target=input_manager.receive_input, args=[])
    input_thread.daemon = True
    input_thread.start()

@eel.expose
def stop_host():
    global status
    status = 'None'
    print("Stopping server...")

@eel.expose
def connect(ip):
    global status
    global vnc
    global connection
    print('Connecting...')
    status = 'client'
    vnc.ip = ip
    input_manager.ip = ip
    try:
        vnc.start_receive()
        input_manager.connect_input()
        connection = 'active'
    except Exception as e:
        print('Connection failed...')
import sys

# def close_callback(route, websockets):
#     if not websockets:
#         print('Bye!')
#         exit()

@eel.expose
def transmit_input(data, event_type):
    # print(status)
    if status == 'client':
        if event_type == 'keydown':
            input_manager.transmit_input(keydown=data)
            pass
        elif event_type == 'keyup':
            input_manager.transmit_input(keyup=data)
            pass
        elif event_type == 'mousemove':
            #print(data)
            input_manager.transmit_input(mouse_pos=data)
            pass
        elif event_type == 'mousedown':
            #print(data)
            input_manager.transmit_input(mouse_pos=data['pos'], mouse_down=data['button'])
        elif event_type == 'mouseup':
            #print(data)
            input_manager.transmit_input(mouse_pos=data['pos'], mouse_up=data['button'])

eel.start('testVNC.html', host="192.168.1.241", block=False, port=8080, disable_cache=True)#, mode=None
# mode='user selection', mode='default',mode=None, shutdown_delay=0.0, size=(800, 600), disable_cache=True, all_interfaces= False,
while True:
    if status == 'host':
        eel.updateScreen(vnc.image_serializer().decode())
    elif status == 'client':
        if connection == 'active':
            eel.updateScreen(vnc.receive())

    eel.sleep(.01)
