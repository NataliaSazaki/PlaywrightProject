import { Page, expect } from '@playwright/test';

export class BuscaProdutoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async HomePage() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async buscarProduto(nomeProduto: string) {
        //clica no campo de buscar produto
        const botao = await this.page.getByPlaceholder('Search entire store here...');
        await botao.click();
        await botao.fill(nomeProduto);
        await this.page.keyboard.press('Enter');

        // Aguardar a página de resultados de busca carregar
        await this.page.waitForNavigation();
    }

    async verificarResultadoBuscaProdutoPage(produto: string) {
        const tituloAposBuscaProduto = await this.page.title();
        expect(tituloAposBuscaProduto).toMatch(`Search results for: '${produto}'`);
    }

    async verificaProdutoPaginaResultado() {
        // Verificar se o produto está presente na página de resultados
        const produto = await this.page.$('.product-item');
        expect(produto).toBeTruthy();//Verifica se um elemento com a classe .product-item foi encontrado na página
    }

    async verificaMensagemProdutoNaoEncontrado(produto: string) {
        //Verifica se retornou mensagem de não encontrou resultados para o produto pesquisado
        const tituloAposAdicionarCarrinho = await this.page.textContent('.notice');
        expect(tituloAposAdicionarCarrinho).toMatch("Your search returned no results.");
    }
}
