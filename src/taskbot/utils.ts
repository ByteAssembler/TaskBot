import type { ElementHandle, Page } from "puppeteer-core";

export const wait = async (milliseconds: number) => {
	await new Promise((resolve) => {
		return setTimeout(resolve, milliseconds);
	});
};

export const waitS = async (seconds: number) => {
	await new Promise((resolve) => {
		return setTimeout(resolve, seconds * 1000);
	});
};


export async function elemFirst(page: Page, xpath: string) {
	await page.waitForXPath(xpath);
	const ele = await page.$x(xpath);
	return ele[0] as ElementHandle<Element> | undefined;
}

export async function elemFirstClick(page: Page, xpath: string) {
	(await elemFirst(page, xpath))!.click();
}

export async function elemFirstType(page: Page, xpath: string, text: string, pressEnter: boolean = false) {
	const ele = (await elemFirst(page, xpath))!;
	await ele.type(text);
	if (pressEnter) await ele?.press('Enter');
}
