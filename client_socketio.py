# client.py
import requests
import socketio

r = requests.get("http://127.0.0.1:5000/test") # server prints "test"
cl = socketio.Client()
cl2 = socketio.Client()


@cl.on("event_name")
def foo(data):
    print(f"client 1 {data}")


@cl2.on("event_name")
def foo2(data):
    print(f"client 2 {data}")


cl.connect("http://127.0.0.1:5000/") # server prints "on connect"
cl2.connect("http://127.0.0.1:5000/")
cl.emit("direct", "msg_2") # prints client 1 msg_1
# cl2.emit("broadcast", "msg_2") # prints client 2 msg_2 and client 1 msg_2
