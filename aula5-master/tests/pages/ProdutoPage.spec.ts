import { Page, Locator, expect } from '@playwright/test';

export class ProdutoPage {
  readonly page: Page;
  readonly sizes: Locator;
  readonly colorOptions: Locator;
  readonly botaoAdicionarCarrinho: Locator;
  readonly campoQuantidade: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sizes = page.locator(".swatch-option.text");
    this.colorOptions = page.locator(".swatch-option.color");
    this.botaoAdicionarCarrinho = page.locator(".product-options-bottom .actions").getByTitle("Add to Cart");
    this.campoQuantidade = page.getByTitle("Qty");
  }

  async HomePage() {
    await this.page.goto('https://magento.softwaretestingboard.com/');
}

  async selecionarTamanho(size: string) {
    const botaoTamanho = this.page.getByText(size);
    await botaoTamanho.click();
  }

  async selecionarCor() {
    const cor = this.colorOptions.first();
    await cor.click();
    await expect(cor).toHaveClass("swatch-option color selected");
  }

  async adicionarCarrinho() {
    await this.botaoAdicionarCarrinho.click();
  }

  async definirQuantidade(quantidade: number) {
    await this.campoQuantidade.fill(quantidade.toString());
    await expect(this.campoQuantidade).toHaveValue(quantidade.toString());
  }

  async selecionarQuantidade(quantidade: number) {
    await this.campoQuantidade.press("ArrowRight");
    await this.campoQuantidade.press("Backspace");
    await this.campoQuantidade.fill(quantidade.toString());
    await expect(this.campoQuantidade).toHaveValue(quantidade.toString());
  }

  async abrirPrimeiroProduto() {
    const modals = this.page.locator(".product-item-info");
    const modal = modals.first();
    await modal.hover();
    const toCartButton = modal.getByTitle("Add to Cart");
    await toCartButton.click();
  }

  async verificarPaginaProduto(nomeProduto: string) {
    const tituloProduto = await this.page.textContent('.page-title');
    if (tituloProduto !== null) {
    return tituloProduto.includes(nomeProduto);
    }
}

async clicarAdicinarAvaliacao() {
    const adicionarAvaliacao = await this.page.getByRole('link', { name: 'Add Your Review' });
    await adicionarAvaliacao.click();
}

async clicarProduto(nomeProduto: string) {
  await this.page.getByRole('link', { name: nomeProduto }).first().click();
  await this.page.waitForTimeout(5000);
}

async ClicarLogotipoLoja() {
  const logo = await this.page.getByLabel('store logo');
  await logo.click();
}

async esperarTituloProduto(titulo: string) {
  await this.page.waitForTimeout(5000);
  await expect(this.page.getByRole('heading', { name: titulo })).toBeVisible();
}

async clicarAdicionarComparacao() {
  const addToCompareButton = await this.page.getByText('Add to Compare');
  await addToCompareButton.first().click();
  await this.page.waitForTimeout(5000);
}
}
