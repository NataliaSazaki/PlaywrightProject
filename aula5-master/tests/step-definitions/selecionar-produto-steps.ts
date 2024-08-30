import { After, AfterAll, Before, BeforeAll, Given, Then, When } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, expect, Page } from "playwright/test";
import { BuscaProdutoPage } from "../pages/BuscaProdutoPage.spec";
import { ProdutoPage } from "../pages/ProdutoPage.spec";
import { CarrinhoPage } from "../pages/CarrinhoPage.spec";

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

Given('acesso ao Magento Luma', async function () {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();
});

Given('que ao verificar as opções de produto', async function () {
    const produtoPage = new ProdutoPage(page);

    // Select all the size buttons
    const count = await produtoPage.sizes.count();

    // Asserts that all buttons are selected
    for (let i = 0; i < count; i++) {
        const el = produtoPage.sizes.nth(i);
        await el.click();
        await expect(el).toHaveClass("swatch-option text selected");
    }
});

When('adicionar produto no carrinho', async function () {
    const produtoPage = new ProdutoPage(page);
    const carrinhoPage = new CarrinhoPage(page);

    await page.waitForSelector(".action.tocart.primary");
    await page.waitForSelector(".product-item-info");

    // First product modal
    const modals = page.locator(".product-item-info");
    const modal = modals.first();
    await modal.hover();

    // Opens the product page
    const toCartButtons = modal.getByTitle("Add to Cart");
    await toCartButtons.click();

    // Selects the size
    await produtoPage.selecionarTamanho("XS");

    // Selects the color
    await produtoPage.selecionarCor();

    // Changes the quantity
    await produtoPage.definirQuantidade(10);

    // Adds to cart
    await produtoPage.adicionarCarrinho();
});

Then('devo visualizar produto e quantidade no carrinho', async function () {
    const carrinhoPage = new CarrinhoPage(page);
    // Checks the cart addition
    await carrinhoPage.abrircarrinho();
    const name = await carrinhoPage.obterNomeProdutoCarrinho();
    await expect(name).toHaveText("Radiant Tee");

    const amount = await carrinhoPage.obterQuantidadeCarrinho();
    await expect(amount).toHaveValue("10");

    // Proceeds to checkout
    await carrinhoPage.fazerCheckout();
});