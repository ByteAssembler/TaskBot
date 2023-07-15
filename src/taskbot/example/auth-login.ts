import type { Page } from "puppeteer-core";
import { elemFirst } from "$taskbot/utils";

// username?: string, 
export async function authLogin(page: Page, email?: string, password?: string) {
	const c_field_login = await elemFirst(page, '');
	// const c_field_username = await elemFirst(page, '');
	const c_field_password = await elemFirst(page, '');
	const c_btn_login = await elemFirst(page, '');

	await c_field_login!.type(email || process.env.AM_LOGIN_EMAIL!);
	// await c_field_username!.type(username || process.env.AM_LOGIN_USERNAME!);
	await c_field_password!.type(password || process.env.AM_LOGIN_PASSWORD!);
	await c_btn_login!.click();
}
