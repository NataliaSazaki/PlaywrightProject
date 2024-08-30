import { test, expect, Page } from '@playwright/test';
import { ProdutoPage } from './pages/ProdutoPage.spec';
import { CarrinhoPage } from './pages/CarrinhoPage.spec';


test.beforeEach(async ({ page }) => {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();
});

test.describe("Selecionar tamanhos/cores e qtd do produto", () => {
    test("verificando opções", async ({ page }) => {
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

    test("Adcionando ao carrinho", async ({ page }) => {
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

        // Checks the cart addition
        await carrinhoPage.abrircarrinho();
        const name = await carrinhoPage.obterNomeProdutoCarrinho();
        await expect(name).toHaveText("Radiant Tee");

        const quantidade = await carrinhoPage.obterQuantidadeCarrinho();
        await expect(quantidade).toHaveValue("10");

        // Proceeds to checkout
        await carrinhoPage.fazerCheckout();
    });
});
