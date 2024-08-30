import { Locator, Page, expect } from "@playwright/test";
import { UserDTO } from "../dto/user-dto";

export class CustomerLogin{
    page: Page;
    email: Locator;
    password: Locator;
    signInButton: Locator;
    showMenuButton: Locator;
    myAccountOption: Locator;
    signOutOption: Locator;
    signOutMsg: Locator;
    //forgotPasswordButton: Locator;
    forgotPasswordTxt: Locator;

    constructor (page: Page){
        this.page = page;
        this.signOutOption = this.page.getByRole('link', { name: 'Sign Out' });
        this.signOutMsg = this.page.getByText('You are signed out');
        this.email = this.page.getByLabel('Email', { exact: true });
        this.password = this.page.getByLabel('Password');
        this.signInButton = this.page.getByRole('button', { name: 'Sign In' });
        this.showMenuButton = this.page.getByRole('banner').locator('button').filter({ hasText: 'Change' });
        this.forgotPasswordTxt = this.forgotPasswordTxt = this.page.getByRole('heading');
        this.myAccountOption = this.page.getByRole('link', { name: 'My Account' });
    }

    async goToLogin(userDTO: UserDTO){
        await this.email.fill(userDTO.email);
        await this.password.fill(userDTO.password);
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState();
        await this.signInButton.click();
    }

    async goToMyAccount(){
        await this.showMenuButton.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForLoadState();
        await this.myAccountOption.click();
    }

    async gotoLogout(){
        await this.showMenuButton.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForLoadState();
        await this.signOutOption.click();
        await this.signOutMsg.isVisible();
        await expect(this.signOutMsg).toContainText('You are signed out');
    }

    async goToForgotPassword(){
        await this.page.click('text=Forgot Your Password?');
        await this.page.waitForTimeout(5000);
        await this.page.waitForLoadState();
        await this.forgotPasswordTxt.isVisible();
        await expect(this.forgotPasswordTxt).toContainText('Forgot Your Password?');
    }

}