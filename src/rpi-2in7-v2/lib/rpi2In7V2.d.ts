import { DisplayDevice } from '@epaperjs/core';
import { ImageOptions } from '@epaperjs/core/src/image/imageOptions';
export declare class Rpi2In7V2 implements DisplayDevice {
    readonly orientation: any;
    readonly colorMode: any;
    readonly height: number;
    readonly width: number;
    private readonly driver;
    constructor(orientation?: any, colorMode?: any);
    connect(): void;
    disconnect(): void;
    wake(): void;
    clear(): void;
    sleep(): void;
    displayPng(img: Buffer, options?: ImageOptions): Promise<void>;
    private displayPngBW;
    private displayPngGray4;
}
//# sourceMappingURL=rpi2In7V2.d.ts.map