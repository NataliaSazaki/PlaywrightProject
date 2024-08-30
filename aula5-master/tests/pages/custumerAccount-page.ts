import { Locator, Page, expect } from "playwright/test";
import { UserDTO } from "../dto/user-dto";

export class CustumerAccount{
    page: Page;
    result: Locator;
    contactInformation: Locator;
    welcome: Locator;

    constructor(page: Page){
        this.page = page;
        this.result = this.page.getByText('Thank you for registering');
        this.contactInformation = this.page.getByText('Account Information Contact');
        this.welcome = this.page.getByRole('banner', { name: 'Welcome, José Maria!'});
    }

    async verificarMsgRegistro(){
        // const resultText = await this.result.getByText;
        // expect(resultText).toBe('Thank you for registering with Main Website Store.');
        await expect(this.page.getByText('Thank you for registering')).toBeVisible();
        await expect(this.page.getByRole('alert')).toContainText('Thank you for registering with Main Website Store.');
    }

    async verificarUsuario(userDTO: UserDTO){

        await this.page.waitForTimeout(5000);
        await this.page.waitForLoadState();
        await expect(this.page.getByRole('banner')).toContainText('Welcome, José Maria!');
        const contactInformationText = await this.contactInformation.textContent();
        expect(contactInformationText).toContain(userDTO.firstName + ' ' + userDTO.lastName);
        expect(contactInformationText).toContain(userDTO.email);
    }
}