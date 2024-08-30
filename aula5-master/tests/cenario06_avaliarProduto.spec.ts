import { test, expect, Page } from '@playwright/test';
import { ProdutoPage } from './pages/ProdutoPage.spec';
import { AvaliacaoPage } from './pages/AvaliacaoPage.spec';


test.beforeEach(async ({ page }) => {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();
});

test('Cenario 6 - Adicionar Avaliacao', async ({ page }) => {
    const produtoPage = new ProdutoPage(page);
    const avaliacaoPage = new AvaliacaoPage(page);

    await produtoPage.clicarProduto('Radiant Tee');

    // Verificar se a página do produto foi carregada corretamente
    const isProductPage = await produtoPage.verificarPaginaProduto('Radiant Tee');
    expect(isProductPage).toBe(true);

    // Clicar na opção para adicionar um review do produto
    await produtoPage.clicarAdicinarAvaliacao();

    await page.waitForTimeout(3000);

    // Selecionar estrelas
    await avaliacaoPage.selecionarEstrela();

    // Informar o nickname
    await avaliacaoPage.preencherNome('Natalia');

    // Informar o título da avaliação
    await avaliacaoPage.preencherResumo('Excelente custo-beneficio');

    // Descrever a avaliação
    await avaliacaoPage.preencherAvaliacao('TesteTesteTesteTeste');

    // Enviar a avaliação
    await avaliacaoPage.enviarAvaliacao();

    // Valida que a avaliação foi enviada:
    const isReviewSubmitted = await avaliacaoPage.verificarEnvioAvaliacao();
    expect(isReviewSubmitted).toBe(true);
});
