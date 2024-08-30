import { After, AfterAll, Before, BeforeAll, Given, Then, When } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, Page } from "playwright/test";
import { BuscaProdutoPage } from "../pages/BuscaProdutoPage.spec";

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
    await page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});

Given('acesso a Magento Luma', async function () {
    await page.goto('https://magento2-demo.magebit.com/');
});

Given('que ao buscar pelo produto {string}', async function (produto: string) {
    const buscaProdutoPage = new BuscaProdutoPage(page);
    await buscaProdutoPage.buscarProduto(produto);

});

When('verificar o resultado da busca {string}', async function (produto: string) {
    const buscaProdutoPage = new BuscaProdutoPage(page);
    await buscaProdutoPage.verificarResultadoBuscaProdutoPage(produto);
});

Then('devo visualizar o produto na página', async function () {
    const buscaProdutoPage = new BuscaProdutoPage(page);
    await buscaProdutoPage.verificaProdutoPaginaResultado();
});

Then('devo visualizar mensagem de produto não encontrado', async function () {
    const buscaProdutoPage = new BuscaProdutoPage(page);
    await buscaProdutoPage.verificaMensagemProdutoNaoEncontrado('Teste');
});