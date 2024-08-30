import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly nextButton: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email Address *' });
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.emailInput.press('Tab');
    await this.passwordInput.fill(password);
    await this.loginButton.click({ timeout: 30000 });
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState();
  }

  async finalizarCompra() {
    await this.page.getByText('Wesley Victor Souza da Silva').click({ timeout: 90000 });
    await this.page.getByLabel('Fixed').check();
    await this.nextButton.click({ timeout: 60000 });
    await this.placeOrderButton.click({ timeout: 60000 });
  }
}
