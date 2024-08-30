import { Page, Locator } from '@playwright/test';

export class CarrinhoPage {
  readonly page: Page;
  readonly botaoCarrinho: Locator;
  readonly cartModal: Locator;
  readonly firstCartItem: Locator;
    checkoutBtn: any;

  constructor(page: Page) {
    this.page = page;
    this.botaoCarrinho = page.locator(".action.showcart");
    this.cartModal = page.locator(".block-minicart").first();
    this.firstCartItem = this.cartModal.locator(".minicart-items-wrapper").first();
  }

  async abrircarrinho() {
    await this.botaoCarrinho.click();
  }

  async obterNomeProdutoCarrinho() {
    return await this.firstCartItem.locator(".product-item-name");
  }

  async obterQuantidadeCarrinho() {
    return await this.firstCartItem.locator(".item-qty");
  }

  async fazerCheckout() {
    await this.abrircarrinho();
    this.checkoutBtn = this.page.locator("#top-cart-btn-checkout");
    await this.checkoutBtn.click();
  }
}
