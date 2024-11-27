// import { Rpi2In7V2 } from "./device/2in7v2/rpi2In7V2"

import { ColorMode, Orientation } from "@epaperjs/core"
import { MINUTE, SERVER_ADDR } from "./configuration"
import { Rpi2In7V2 } from "./rpi-2in7-v2/lib/rpi2In7V2"
import { takeScreenshot } from "./screen"
import axios from "axios"



class DeviceCommand {
    private device: Rpi2In7V2
    private url = [SERVER_ADDR, "2in7v2", "bin"].join("/")

    constructor(orientation?: Orientation, colorMode?: ColorMode) {
        process.on('SIGINT', () => this.dispose());
        process.on('SIGTERM', () => this.dispose());
        this.device = new Rpi2In7V2(orientation, colorMode)

        console.log("[DEVICE] connect")
        this.device.connect()
    }

    private dispose = () => {
        console.log("[DEVICE] disconnect")
        this.device.disconnect();
    }

    public refreshDisplay = async () => {
        console.log("[DEVICE] fetch data:", new Date().toISOString())
        const response = await axios.get<{ imageData: string; date: string }>(this.url);
        console.log("[DEVICE] fetch res:", response.data.date)

        console.log("[DEVICE] generate buffer")
        const buffer = Buffer.from(response.data.imageData, "base64")

        console.log("[DEVICE] wake")
        this.device.wake()
        console.log("[DEVICE] display")
        await this.device.displayPng(buffer)
        console.log("[DEVICE] sleep")
        this.device.sleep()
        // cli(["display", "--debug", "-c", "4gray", "rpi-2in7", "http://192.168.1.106:8888/"])
    }
}

const command = new DeviceCommand(Orientation.Horizontal, ColorMode.Black)
command.refreshDisplay()
setInterval(() => {
    command.refreshDisplay()
}, 5 * MINUTE)
