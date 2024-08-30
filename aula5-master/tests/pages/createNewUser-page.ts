import { Locator, Page, expect  } from "playwright/test";
import { UserDTO } from "../dto/user-dto";

export class CreateNewCustomerAccount{
    page: Page;
    fieldFirstName: Locator;
    fieldLastName: Locator;
    fieldEmail: Locator;
    fieldPassword: Locator;
    FieldConfirmPassword: Locator;
    buttonCreateAccount: Locator;

    constructor(page: Page){
        this.page = page;
        this.fieldFirstName = this.page.getByLabel('First Name');
        this.fieldLastName = this.page.getByLabel('Last Name');
        this.fieldEmail = this.page.getByLabel('Email', { exact: true });
        this.fieldPassword = this.page.getByRole('textbox', { name: 'Password*', exact:true});
        this.FieldConfirmPassword =  this.page.getByLabel('Confirm Password');
        this.buttonCreateAccount = this.page.getByRole('button', { name: 'Create an Account' });
    }

    async submitFormCreateAccount(userDTO: UserDTO){
        await this.page.waitForTimeout(5000);
        await this.fieldFirstName.fill(userDTO.firstName);
        await this.fieldLastName.fill(userDTO.lastName);
        await this.fieldEmail.fill(userDTO.email);
        await this.fieldPassword.fill(userDTO.password);
        await this.FieldConfirmPassword.fill(userDTO.confirmPassword);
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState();
        await this.buttonCreateAccount.click();
    };

    async verificaMsgErro(field: string){
        const errorMsg = this.page.locator('#form-validate div')
        .filter({hasText: field})
        .getByText('This is a required field');
        await errorMsg.isVisible()
        const errorMsgtxt = await errorMsg.textContent();
        expect(errorMsgtxt).toBe('This is a required field.');
    };

    async verificaDivergenciaSenha(field: string){
        const errorSenha = this.page.locator('#password-error').getByText('Minimum length of this field');
        const isVisible = await errorSenha.isVisible();

        if (field === 'password') {
            //await errorSenha.isVisible();
            const errorSenhaTxt = await errorSenha.textContent();
            expect(errorSenhaTxt).toBe('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');
        } else if (field === 'confirm password') {
             await this.buttonCreateAccount.click();
             const errorConfirmSenha = this.page.locator('#password-confirmation-error'); 
             await errorConfirmSenha.isVisible();
             await expect(errorConfirmSenha).toContainText('Please enter the same value again.');
        }     
    };

    async verificaComplexidadeSenha(field: string){
        const errorSenha = this.page.locator('#password-error').getByText('Minimum of different classes');
        await errorSenha.isVisible();
        const errorSenhaTxt = await errorSenha.textContent();
        expect(errorSenhaTxt).toBe('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
    };

}