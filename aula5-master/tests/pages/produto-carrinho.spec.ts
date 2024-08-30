import { Page } from 'playwright';
import { Expect, expect } from "playwright/test";

export class StorePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://magento2-demo.magebit.com/'); // Altere para a URL da sua loja online
  }

  async selectProductSize() {
    await this.page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('S', { exact: true }).click();
  }
  async selectProductColor() {
    await this.page.getByLabel('Orange').click();
  }

  async addFirstProductToCart() {
    await this.page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('button').click(); // Seletor para o primeiro produto
  }

  async proceedToCart() {
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState();
    const mensagemok = await this.page.textContent('.message-success');
    expect(mensagemok).toMatch('You added Radiant Tee to your');
  }

  async accessCart() {
    await this.page.getByRole('link', { name: 'shopping cart' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState();
  }

  async RemovefromCart() {
  await this.page.getByRole('link', { name: ' Remove item' }).click();
   
  }
  async SuccessMessage() {
    await this.page.locator('#maincontent').getByText('You have no items in your');
     
    }

  
}
