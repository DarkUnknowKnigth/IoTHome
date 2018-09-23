from flask import Flask
from flask import render_template as render
from flask import jsonify
import serial, time


app = Flask(__name__)
@app.route('/')
def index():
    return 'API-Arduino-Flask'

@app.route('/home')
def home():
    return jsonify(status=1,message="Probando ....")

@app.route('/monitor')
def monitor():
    return jsonify(status=1,message="Probando ....")

@app.route('/ligth')
def ligth():
    return jsonify(status=1,message="Probando ....")

@app.route('/iot/<int:id>/on')
def on(id):
    arduino=serial.Serial('COM4',9600)
    pin=bytes([id])
    arduino.write(pin)
    request=arduino.read()
    time.sleep(2)
    arduino.close()
    if request != 0:
        return jsonify(status=request,message="Done")
    else:
        return jsonify(status=request,message="Bad response")
    
app.run(debug=False,port=5000)