import { test, expect } from '@playwright/test';
import { BuscaProdutoPage } from './pages/BuscaProdutoPage.spec';

test.describe('Testes de busca por produto', () => {

    test.beforeEach(async ({ page }) => {
        const buscaProdutoPage= new BuscaProdutoPage(page);
        await buscaProdutoPage.HomePage();
    });

    test('Buscar produto existente', async ({page}) => {
        const buscaProdutoPage= new BuscaProdutoPage(page);
        await buscaProdutoPage.buscarProduto('portia capri');
        await buscaProdutoPage.verificarResultadoBuscaProdutoPage('portia capri');
        await buscaProdutoPage.verificaProdutoPaginaResultado();
    });

    test('Buscar produto inexistente', async ({page}) => {
        const buscaProdutoPage= new BuscaProdutoPage(page);
        await buscaProdutoPage.buscarProduto('Teste');
        await buscaProdutoPage.verificarResultadoBuscaProdutoPage('Teste');
        await buscaProdutoPage.verificaMensagemProdutoNaoEncontrado('Teste');
    });
});
