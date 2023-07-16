import { config } from 'dotenv'

import type { Browser, Page } from 'puppeteer-core'
import { launch } from 'puppeteer-core'

const BrowserPathDefault = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
type BrowserLaunch = { browser: Browser, page: Page }
type BrowserFn = (browser: Browser, page: Page) => void

export async function run(url: string, fn: BrowserFn) {
	const { browser, page } = await initAll(url);
	await fn(browser, page);
	await browser.close();
}

export async function initAll(
	url: string,
	browserPath: string = BrowserPathDefault
) {
	init();
	return await launchBrowser(url, browserPath);
}

export async function init() {
	config();
}

export async function launchBrowser(
	url: string,
	browserPath: string = BrowserPathDefault
): Promise<BrowserLaunch> {
	const browser = await launch({
		headless: false,
		executablePath: browserPath,
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1366, height: 768 });
	await page.goto(url);

	return { browser, page };
}
