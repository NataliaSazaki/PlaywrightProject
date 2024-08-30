import { Page, expect } from "playwright/test";


export class ListaComparacaoPage {
readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    async clicarListaComparacaoLink() {
        const comparisonListLink = await this.page.getByRole('link', { name: 'comparison list' });
        await comparisonListLink.click();
    }

    async verificarMensagemSucesso(texto:string) {
        await this.page.waitForTimeout(5000);
        const successMessage = await this.page.textContent('.message-success');
        expect(successMessage).toContain(texto);
    }

}