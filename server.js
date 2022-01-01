#!/usr/bin/env node

const WLED_IP = '192.168.3.28' // IP address of your ESP8266 with the WLED firmware

const WebSocketClient = require('websocket').client
const player = require('play-sound')(opts = {})

const client = new WebSocketClient()

client.on('connectFailed', error => {
    console.log('Connect Error: ' + error.toString())
})

client.on('connect', connection => {
    console.log('WebSocket Client Connected')
    connection.on('error', error => {
        console.log("Connection Error: " + error.toString())
    })
    connection.on('close', () => {
        console.log('echo-protocol Connection Closed')
    })
    //let previousLedArr = []
    let previousAction = 'explosion'
    connection.on('message', message => {
        if (message.type === 'utf8') {
            //console.log("Received: '" + message.utf8Data + "'")
            const parsedMsg = JSON.parse(message.utf8Data)
            if (parsedMsg.leds) {
                const ledArr = parsedMsg.leds
                const ledCount = ledArr.length
                const blackLedCount = ledArr.filter(led=>led==="000000").length
                //const previousBlackLedCount = previousLedArr.filter(led=>led==="000000").length

                if (previousAction === 'explosion' && blackLedCount === ledCount) { 
                   //(previousBlackLedCount === ledCount && blackLedCount === ledCount-1) { // Rocket launch - frame 1
                    console.log("Rocket launch detected! Playing launch sound!") // We actually just detected the end of the previous explosion
                    setTimeout(()=>{ //and know that the next launch is in about 200ms                   
                        player.play('./launch.mp3', err => {
                            if (err) throw err
                        })
                    }, 200)
                    previousAction = 'launch'
                } else if (previousAction === 'launch' && blackLedCount < ledCount-1) {
                        //(previousBlackLedCount === ledCount-1 && blackLedCount < previousBlackLedCount) { // Explosion
                    console.log("Explosion detected! Playing explosion sound!")
                    player.play('./explosion.mp3', err => {
                        if (err) throw err
                    })
                    previousAction = 'explosion'
                }
                //previousLedArr = ledArr
            }
        }
    })
    
    const msg = {'lv':true}
    connection.sendUTF(JSON.stringify(msg))
})

const wsAddress = `ws://${WLED_IP}/ws`
console.log(`Attempting to connect with your ESP via '${wsAddress}'.`)
console.log(`Change the IP address in the server.js if it doesn't match your ESP's.`)
console.log(`Make sure you've got the WLED firmware flashed to the ESP and enabled the Firework 1d animation.`)
client.connect(`ws://${WLED_IP}/ws`, 'echo-protocol')
