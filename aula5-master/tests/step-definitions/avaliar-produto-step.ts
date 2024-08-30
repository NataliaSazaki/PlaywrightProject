import { After, AfterAll, Before, BeforeAll, Given, Then, When } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, expect, Page } from "playwright/test";
import { ProdutoPage } from "../pages/ProdutoPage.spec";
import { AvaliacaoPage } from "../pages/AvaliacaoPage.spec";


let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
});

After(async function () {
    //await page.close();
    //await context.close();
});

AfterAll(async function () {
    await browser.close();
});

Given('ao acessar a página inicial do Magento Luma', async function () {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();    
});

Given('que ao clicar pelo produto {string}', async function (nomeProduto: string) {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.clicarProduto('Radiant Tee');

});

When('enviar a avaliação preenchida', async function () {
    const produtoPage = new ProdutoPage(page);
    const avaliacaoPage = new AvaliacaoPage(page);
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
    
});

Then('devo validar que a avaliação foi enviada', async function () {
     // Valida que a avaliação foi enviada:
     const avaliacaoPage = new AvaliacaoPage(page);
     const isReviewSubmitted = await avaliacaoPage.verificarEnvioAvaliacao();
     expect(isReviewSubmitted).toBe(true);    
});