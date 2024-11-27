// import { Rpi2In7V2 } from "./device/2in7v2/rpi2In7V2"

import { SERVER_ADDR } from "./configuration"
import { Rpi2In7V2 } from "./rpi-2in7-v2/lib/rpi2In7V2"
import { takeScreenshot } from "./screen"
import axios from "axios"
const refreshDisplay = async () => {
    console.log("screenshot")
    // await takeScreenshot(SERVER_ADDR, 264, 176, "screenshot/latest.png")
    const _2in7v2Url = [SERVER_ADDR, "2in7v2", "bin"].join("/")
    const response = await axios.get<{ imageData: string; date: string }>(_2in7v2Url);
    console.log("response:", response.data.date)
    const buffer = Buffer.from(response.data.imageData, "base64")
    console.log("connecting")

    const device = new Rpi2In7V2()
    device.connect()
    device.displayPng(buffer)
    // cli(["display", "--debug", "-c", "4gray", "rpi-2in7", "http://192.168.1.106:8888/"])
}

refreshDisplay()
