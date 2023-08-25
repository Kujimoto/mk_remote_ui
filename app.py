from flask import Flask, render_template, send_from_directory, request
from flask_cors import CORS
from pymachinetalk.dns_sd import ServiceDiscovery
import pymachinetalk.halremote as halremote
from pymachinetalk import application

  

class BasicClass(object):

    def __init__(self):
        self.sd = ServiceDiscovery()

        rcomp = halremote.RemoteComponent('remote_gui', debug=False)
        rcomp.no_create = True
        rcomp.newpin('button0', halremote.HAL_BIT, halremote.HAL_OUT)
        heater_pin = rcomp.newpin('heater', halremote.HAL_FLOAT, halremote.HAL_IN)
        heater_pin.on_value_changed.append(self.heater_pin_changed)
        heater_pin.on_synced_changed.append(self.heater_pin_synced)
        rcomp.on_connected_changed.append(self._connected)

        self.halrcomp = rcomp
        self.halheaters = {}
        self.halaxes = {}
        self.hal_switch = {}
        self.hal_leds = {}
        self.heater_synced = False

        self.sd.register(rcomp)

    def add_heater(self, heater_name):
        heater_pin = self.halrcomp.newpin(heater_name, halremote.HAL_FLOAT, halremote.HAL_IN)
        heater_pin.on_value_changed.append(self.heater_pin_changed)
        heater_pin.on_synced_changed.append(self.heater_pin_synced)
        self.halheaters[heater_name] = heater_pin
    
    def add_switch(self, switch_name):
        switch_pin = self.halrcomp.newpin(switch_name, halremote.HAL_BIT, halremote.HAL_OUT)
        self.heater_switch[switch_name] = switch_pin

    def add_led(self, led_name):
        led_pin = self.halrcomp.newpin(led_name, halremote.HAL_BIT, halremote.HAL_IN)
        self.hal_leds[led_name] = led_pin

    def add_axis(self, rcomp, axis_name):
        axis_pin = self.halrcomp.newpin(axis_name, halremote.HAL_FLOAT, halremote.HAL_IN)
        axis_pin.on_synced_changed.append(self.axis_pin_synced)
        self.halaxi[axis_name] = axis_pin
        

app = Flask(__name__, instance_relative_config=True, static_folder="./react/my-ui/build/static")
CORS(app)

count = 0
@app.route("/", methods=("GET", "POST"))
def serve_index():
   return send_from_directory("./react/my-ui/build", "index.html")

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('./react/my-ui/build/static', path)

@app.route('/api/data', methods=['GET'])
def index():
    #data = request.json.get('name')
    global count
    count += 1
    print(count)
    return {"id": count, "title": "Test count"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

