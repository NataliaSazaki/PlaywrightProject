import { Locator, Page, expect } from "@playwright/test";

export class HomePage{
    page: Page
    loginPage: Locator;
    loginPageTitle: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginPage = this.page.getByText('Customer Login');
        this.loginPageTitle = this.page.locator('h1');
    }
    async HomePage() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async goToCreateAccount(){
        await this.page.getByRole('link', { name: 'Create an Account' }).click();
    }

    async goToSingIn(){
        await this.page.getByRole('link', { name: 'Sign In' }).click();
        await expect(this.loginPage).toBeVisible();
        await expect(this.loginPageTitle).toContainText('Customer Login');
    }
}