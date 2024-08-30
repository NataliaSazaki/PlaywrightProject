import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, expect, Page } from "playwright/test";
import { ProdutoPage } from "../pages/ProdutoPage.spec";
import { CarrinhoPage } from "../pages/CarrinhoPage.spec";
import { CheckoutPage } from "../pages/CheckoutPage.spec";

let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web

setDefaultTimeout(60000);
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

Given('acessar o site do Magento Luma', async function () {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();
});


When('adicionar um produto no carrinho', async function () {
    const produtoPage = new ProdutoPage(page);
    const carrinhoPage = new CarrinhoPage(page);

    await page.waitForSelector(".action.tocart.primary");
    await page.waitForSelector(".product-item-info");

    // First product modal
    await produtoPage.abrirPrimeiroProduto();

    // Selects the size
    await produtoPage.selecionarTamanho("XS");

    // Selects the color
    await produtoPage.selecionarCor();

    // Changes the quantity
    await produtoPage.selecionarQuantidade(10);

    // Adds to cart
    await produtoPage.adicionarCarrinho();

    // Checks the cart addition
    await carrinhoPage.abrircarrinho();
    const name = await carrinhoPage.obterNomeProdutoCarrinho();
    await expect(name).toHaveText("Radiant Tee");

    const quantidade = await carrinhoPage.obterQuantidadeCarrinho();
    await expect(quantidade).toHaveValue("10");

    // Proceeds to checkout
    await carrinhoPage.fazerCheckout();
});

setDefaultTimeout(20000);
Then('devo finalizar a compra', async function () {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.login('wesley.victor@icloud.com', 'teste123456!');
    await checkoutPage.finalizarCompra();
});