import { expect, Page, Locator } from "@playwright/test";

export default class LoginPage {
    readonly page: Page;
    readonly signInLink: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;
    readonly newArticleLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInLink = page.getByRole('link', { name: 'Sign in' });
        this.email = page.locator('input[type="text"]');
        this.password = page.locator('input[type="password"]');
        this.signInBtn = page.getByRole('button', { name: 'Sign in' });
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    }

    async launchURL() {
        await this.page.goto('https://conduit.bondaracademy.com/');
    }

    async userLogin(strUser: string, strPwd: string) {
        await expect(this.signInLink).toBeVisible( { timeout: 2000 });
        await this.signInLink.click();
        await expect(this.email).toBeVisible({ timeout: 2000 });
        await this.email.fill(strUser);
        await this.password.fill(strPwd);
        await this.signInBtn.click();
        await expect(this.page).toHaveTitle('Conduit | Practice Test Automation');
        await expect(this.newArticleLink).toBeVisible( { timeout: 2000 });
    }

}
