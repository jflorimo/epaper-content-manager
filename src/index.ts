import { cli } from "@epaperjs/cli/dist/cli"

const refreshDisplay = () => {
    console.log("refreshing")
    cli(["display", "--debug", "-c", "4gray", "rpi-2in7", "http://192.168.1.106:8888/"])
}

refreshDisplay()