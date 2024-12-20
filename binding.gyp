{
    "targets": [
        {
            "target_name": "waveshare2in7v2",
            "cflags!": [
                "-fno-exceptions",
                "-Wextra"
            ],
            "cflags_cc!": [
                "-fno-exceptions"
            ],
            "sources": [
                "./src/rpi-2in7-v2/src/c/EPD_2in7_V2_node.cc",
                "./src/rpi-2in7-v2/src/c/DEV_Config.c",
                "./src/rpi-2in7-v2/src/c/EPD_2in7_V2.c",
                "./src/rpi-2in7-v2/src/c/dev_hardware_SPI.c",
                "./src/rpi-2in7-v2/src/c/RPI_sysfs_gpio.c"
            ],
            "defines": [
                "RPI",
                "USE_DEV_LIB"
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "libraries": [
                "-lm"
            ]
        }
    ]
}
