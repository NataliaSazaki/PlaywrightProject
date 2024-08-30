import { test, expect } from '@playwright/test';
import { ProdutoPage } from './pages/ProdutoPage.spec';
import { CarrinhoPage } from './pages/CarrinhoPage.spec';
import { CheckoutPage } from './pages/CheckoutPage.spec';

test.beforeEach(async ({ page }) => {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();
});

test("Finalizar compra", async ({ page }) => {
  const produtoPage = new ProdutoPage(page);
  const carrinhoPage = new CarrinhoPage(page);
  const checkoutPage = new CheckoutPage(page);

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

  // Completing the purchase form
  await checkoutPage.login('wesley.victor@icloud.com', 'teste123456!');
  test.setTimeout(60000);
  await checkoutPage.finalizarCompra();
});
