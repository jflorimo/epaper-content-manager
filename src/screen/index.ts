import puppeteer from 'puppeteer';

/**
 * Takes a screenshot of a webpage with specified width and height.
 * @param url - The URL of the page to capture.
 * @param width - The width of the viewport.
 * @param height - The height of the viewport.
 * @param outputPath - The path where the screenshot will be saved.
 */
export async function takeScreenshot(url: string, width: number, height: number, outputPath: string): Promise<void> {
    // Launch the browser
    const browser = await puppeteer.launch();

    try {
        // Open a new page
        const page = await browser.newPage();

        // Set the viewport dimensions
        await page.setViewport({ width, height });

        // Navigate to the specified URL
        await page.goto(url);

        // Take the screenshot and save it
        await page.screenshot({
            path: outputPath,
            fullPage: false, // Only capture the viewport area
        });

        console.log(`Screenshot saved to ${outputPath}`);
    } catch (error) {
        console.error('Error taking screenshot:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

/**
 * Wrapper for calling the async function in a synchronous-like manner
 */
export function takeScreenshotSync(url: string, width: number, height: number, outputPath: string): void {
    takeScreenshot(url, width, height, outputPath)
        .then(() => {
            console.log('Screenshot operation completed successfully.');
        })
        .catch((error) => {
            console.error('Screenshot operation failed:', error);
        });
}
