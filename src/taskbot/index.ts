import { config } from 'dotenv'

import type { Browser, Page } from 'puppeteer-core'
import { launch } from 'puppeteer-core'

type BrowserLaunch = { browser: Browser, page: Page }
type BrowserFn = (browser: Browser, page: Page) => void

export async function run(fn: BrowserFn) {
	const { browser, page } = await initAll();
	await fn(browser, page);
	await browser.close();
}

export async function initAll(
	url?: string,
	browserPath: string = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
) {
	init();
	return await launchBrowser(url, browserPath);
}

export async function init() {
	config();
}

export async function launchBrowser(
	url?: string,
	browserPath: string = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
): Promise<BrowserLaunch> {
	const browser = await launch({
		headless: false,
		executablePath: browserPath,
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1366, height: 768 });

	await page.goto(url || process.env.AM_URL!);

	return { browser, page };
}
