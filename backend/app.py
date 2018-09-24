from flask import Flask
from flask import render_template as render
import json as j 
import serial, time


app = Flask(__name__)

@app.route('/')
def index():
    return 'API-Arduino-Flask'
#home routes
@app.route('/home')
def home():
    return j.dumps({"status":200,"message":"home"})

@app.route('/home/<string:component>')
def componente(component="default"):
    return j.dumps({"status":200,"message":"el componente: "+component+" esta: arduino_resp"})

@app.route('/home/<string:component>/<int:mode>')
def componenteToggle(component="default",mode=-1):
    if(mode == 1):
        action="encendio"
        return j.dumps({"status":200,"message":"el componente: "+component+" se : "+action})
    elif(mode == 0):
        action="apago"
        return j.dumps({"status":200,"message":"el componente: "+component+" se : "+action})
    else:
        return j.dumps({"status":404,"message":"el componente: "+component+" SOLO acepta valores 1 y 0"} )



@app.route('/monitor')
def monitor():
    return j.dumps({"status":200,"message":"monitor"})

@app.route('/monitor/<string:module>')
def monitorStatus(module="default"):
    return j.dumps({"status":200,"message":"Arduino_response"})

@app.route('/monitor/light/<string:mode>')
def monitorLigth(mode="defaul"):
    if(mode=="day"):
        return j.dumps({"status":2,"message":"monitor-day","day":"1112"})
    elif(mode=="week"):
        return j.dumps({"status":2,"message":"monitor-week","week":{"monday":"1231","tuesday":"1231","wednesday":"1231","thrusday":"1231","friday":"1231","saturday":"1231","sunday":"1231"}})
    elif(mode=="month"):
        return j.dumps({"status":2,"message":"monitor-month","month":["1231","122","113","234","323","1231","122","113","234","323","1231","122","113","234","323","1231","122","113","234","323","1231","122","113","234","323"]})
    else:
        return j.dumps({"status":2,"message":"wrong mode in light query, are you ok?"})

@app.route('/monitor/water/<string:mode>')
def monitorWater(mode="default"):
    if(mode=="day"):
        return j.dumps({"status":2,"message":"monitor-day","day":"1112"})
    elif(mode=="week"):
        return j.dumps({"status":2,"message":"monitor-week","week":{"monday":"1231","tuesday":"1231","wednesday":"1231","thrusday":"1231","friday":"1231","saturday":"1231","sunday":"1231"}})
    elif(mode=="month"):
        return j.dumps({"status":2,"message":"monitor-month","month":["1231","122","113","234","323","1231","122","113","234","323","1231","122","113","234","323","1231","122","113","234","323","1231","122","113","234","323"]})
    else:
        return j.dumps({"status":2,"message":"wrong mode in water query, are you ok?"})



@app.route('/light')
def light():
    return j.dumps({"status":3,"message":"ligth"})

@app.route('/light/<int:module>')
def lightStatus(module=-1):
    return j.dumps({"status":3,"message":"ligth : "+str(module)+" esta: arduino_response "})

@app.route('/light/<int:module>/<int:status>')
def lightMode(module=-1,status=-1):
    if(status==1):
        return j.dumps({"status":3,"message":"ligth: "+str(module)+" se ha Encendido"})
    elif(status==0):
        return j.dumps({"status":3,"message":"ligth: "+str(module)+" se ha Apagado"})
    else:
        return j.dumps({"status":3,"message":"Ha ocurrido un erro en la peticion"})



@app.route('/IoT')
def iot():
    return j.dumps({"status":4,"message":"OK"})



@app.errorhandler(404)
def page_not_found(error):
    return j.dumps({'message':"no se encontro la peticion",'status':404}),404


app.run(debug=False,port=5000)