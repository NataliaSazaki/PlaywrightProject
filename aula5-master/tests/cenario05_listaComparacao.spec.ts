import { test, expect, Page } from '@playwright/test';
import { ProdutoPage } from './pages/ProdutoPage.spec';
import { ListaComparacaoPage } from './pages/ListaComparacaoPage.spec';


test.beforeEach(async ({ page }) => {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();
});

test('Cenario 5 - Adicionar a lista de comparacao', async ({ page }) => {
    const produtoPage = new ProdutoPage(page);
    const listaComparacaoPage = new ListaComparacaoPage(page);

    // Clicar no primeiro produto da página inicial: Radiant Tee
    await produtoPage.clicarProduto('Radiant Tee');

    // Validar que a página carregou localizando pelo título do produto e depois recarregá-la
    await produtoPage.esperarTituloProduto('Radiant Tee');
    await page.reload();

    // Localizar e clicar no botão "Adicionar à lista de comparação"
    await produtoPage.clicarAdicionarComparacao();

    await page.waitForTimeout(5000);

    // Verificar se a mensagem de sucesso está presente
    await listaComparacaoPage.verificarMensagemSucesso('You added product Radiant Tee to the comparison list.');

    // Voltar para a página inicial (clicar no logo)
    await produtoPage.ClicarLogotipoLoja();

    await page.waitForTimeout(5000);

    // Clicar no segundo produto da página inicial: Breathe-Easy Tank
    await produtoPage.clicarProduto('Breathe-Easy Tank');

    // Validar que a página carregou localizando pelo título do produto e depois recarregá-la
    await produtoPage.esperarTituloProduto('Breathe-Easy Tank');
    await page.reload();

    //await page.waitForTimeout(5000);

    // Localizar e clicar no botão "Adicionar à lista de comparação"
    await produtoPage.clicarAdicionarComparacao();

    // Verificar se a mensagem de sucesso está presente
    await listaComparacaoPage.verificarMensagemSucesso('You added product Breathe-Easy Tank to the comparison list.');

    // Clicar para ver a lista de comparação
    await listaComparacaoPage.clicarListaComparacaoLink();
});