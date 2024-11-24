"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpi2In7V2 = void 0;
const core_1 = require("@epaperjs/core");
const bindings_1 = __importDefault(require("bindings"));
class Rpi2In7V2 {
    constructor(orientation = core_1.Orientation.Horizontal, colorMode = core_1.ColorMode.Black) {
        this.orientation = orientation;
        this.colorMode = colorMode;
        const supportedColorModes = [core_1.ColorMode.Black, core_1.ColorMode.Gray4];
        if (!supportedColorModes.includes(colorMode)) {
            throw new Error(`Only color modes: [${supportedColorModes}] are supported`);
        }
        this.driver = (0, bindings_1.default)('waveshare2in7v2.node');
        this.width = this.orientation === core_1.Orientation.Horizontal ? 264 : 176;
        this.height = this.orientation === core_1.Orientation.Horizontal ? 176 : 264;
    }
    connect() {
        this.driver.dev_init();
        this.wake();
    }
    disconnect() {
        this.sleep();
        this.driver.dev_exit();
    }
    wake() {
        if (this.colorMode === core_1.ColorMode.Gray4) {
            this.driver.init_4Gray();
        }
        else {
            this.driver.init();
        }
    }
    clear() {
        this.driver.clear();
    }
    sleep() {
        this.driver.sleep();
    }
    async displayPng(img, options) {
        if (this.colorMode === core_1.ColorMode.Gray4) {
            await this.displayPngGray4(img, options);
        }
        else {
            await this.displayPngBW(img, options);
        }
    }
    async displayPngBW(img, options) {
        const converter = new core_1.Monochrome(img);
        const blackBuffer = await converter.toBlack({
            ...options,
            rotate90Degrees: this.orientation === core_1.Orientation.Horizontal,
        });
        this.driver.display(blackBuffer);
    }
    async displayPngGray4(img, options) {
        const converter = new core_1.GrayLR(img);
        const grayBuffer = await converter.to4Gray({
            ...options,
            rotate90Degrees: this.orientation === core_1.Orientation.Horizontal,
        });
        this.driver.display_4Gray(grayBuffer);
    }
}
exports.Rpi2In7V2 = Rpi2In7V2;
