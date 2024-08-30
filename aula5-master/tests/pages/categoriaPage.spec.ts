import { Page, expect } from '@playwright/test';

export class CategoriaPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async HomePage() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async navegarPorCategoria(nomeCategoria: string) {
        const link = await this.page.locator(`text=${nomeCategoria}`);
        await link.click();
    }

    async navegarPorCategoriaID(nomeCategoria: string) {
        const link = await this.page.locator(`${nomeCategoria}`);
        await link.click();
    }

    async verificarTituloCategoria(tituloEsperado: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toMatch(tituloEsperado);
    }
}
