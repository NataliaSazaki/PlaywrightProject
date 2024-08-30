import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, Page } from "playwright/test";
import { BuscaProdutoPage } from "../pages/BuscaProdutoPage.spec";
import { CategoriaPage } from "../pages/categoriaPage.spec";

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

setDefaultTimeout(20000);
Given('acesso a página home do Magento Luma', async function () {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.HomePage();
});


When('clicar na categoria {string}', async function (categoria: string) {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoria(categoria);
});

When('clicar no id da categoria {string}', async function (categoria: string) {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoriaID(categoria);
});

setDefaultTimeout(60000);
Then('devo visualizar o titulo da categoria na página {string}', async function (categoria: string) {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.verificarTituloCategoria(categoria);
});