## Demo
[![Video](./thumbnail.png)](https://www.reddit.com/r/WLED/comments/rtj4yd/you_may_ban_fireworks_but_you_cant_keep_me_from/)  

# Prerequisites
- A device (Windows, Linux, Mac) with speakers attached and NodeJS installed on
- An ESP8266 or ESP32 flashed with the WLED firmware
- A supported LED strip (e.g. ws2812b) connected to the ESP8266/ESP32

## Installation
```
git clone https://github.com/T-vK/WLED-Fireworks-Sound-Effect-Companion.git
cd WLED-Fireworks-Sound-Effect-Companion
npm ci
```
On Windows you also have to download mplayer and put the executable in the `WLED-Fireworks-Sound-Effect-Companion` directory.

## Configuration
You have to change the IP address in the server.js file to the IP address of your ESP8266/ESP32.

## Starting the companion
```
node ./server.js
```

## Credits
- `launch.mp3` is a free sound effect from https://freesound.org/people/ReadeOnly/sounds/186956/
- `explosion.mp3` is an edited version of this free sound effect: https://freesound.org/people/HerbertBoland/sounds/196704/
