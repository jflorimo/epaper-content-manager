// import { Rpi2In7V2 } from "./device/2in7v2/rpi2In7V2"

import { SERVER_ADDR } from "./configuration"
import { Rpi2In7V2 } from "./rpi-2in7-v2/lib/rpi2In7V2"
import { takeScreenshot } from "./screen"

const refreshDisplay = async () => {
    console.log("screenshot")
    await takeScreenshot(SERVER_ADDR, 128, 75, "screenshot/latest.png")
    console.log("refreshing")
    // const device = new Rpi2In7V2()
    console.log("connecting")
    // device.connect()
    // device.displayPng([])
    // cli(["display", "--debug", "-c", "4gray", "rpi-2in7", "http://192.168.1.106:8888/"])
}

refreshDisplay()