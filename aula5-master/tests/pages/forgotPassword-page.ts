import { Locator, Page, expect  } from "playwright/test";
import { UserDTO } from "../dto/user-dto";

export class ForgotPassword{

    page: Page;
    forgotPasswordTxt: Locator;
    email: Locator;
    resetPasswordButton: Locator;
    resetPasswordTxt: Locator;
    resetPasswordAlert: Locator;


    constructor(page: Page){
        this.page = page;
        this.forgotPasswordTxt = this.page.getByRole('heading');
        this.resetPasswordButton = this.page.getByRole('button', { name: 'Reset My Password' });
        this.email = this.page.getByLabel('Email', { exact: true });
        this.resetPasswordTxt = this.page.getByText('If there is an account');
        this.resetPasswordAlert = this.page.getByRole('alert');
    }

    async submitFormForgotPassword(userDTO: UserDTO){
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState();
        await this.email.fill(userDTO.email);
        await this.resetPasswordButton.click();
        await this.page.waitForTimeout(2000);
        await expect(this.resetPasswordTxt).toBeVisible();
        const expectText = 'If there is an account associated with ' + userDTO.email + ' you will receive an email with a link to reset your password.';    
        await expect(this.resetPasswordAlert).toContainText(expectText);
    };     
}