import { setDefaultTimeout } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { Expect, expect } from "playwright/test";

export class StorePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate2() {
    await this.page.goto('https://magento.softwaretestingboard.com/'); // Altere para a URL da sua loja online
  }

  async AddItemToWishList() {
    await this.page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('S', { exact: true }).click();
    await this.page.getByLabel('Orange').click();
    await this.page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('link').nth(3).click();
    await this.page.locator('#maincontent div').filter({ hasText: 'Customer Login' }).click();  
    await this.page.getByLabel('Email', { exact: true }).click();
    await this.page.getByLabel('Email', { exact: true }).fill('teste@gmail.com'); 
    await this.page.getByLabel('Email', { exact: true }).press('Tab');
    await this.page.getByLabel('Password').fill('1234Asdf');
    await this.page.getByRole('button', { name: 'Sign In' }).click({timeout:30000});
  }

  async SuccessfullyAddedToWish() {
    const mensagemsucesso = await this.page.textContent('.message-success');
    expect(mensagemsucesso).toMatch('Radiant Tee has been added to');
  }

  async AccessWishList() {
    await this.page.locator('span').filter({ hasText: 'My Wish List' }).click();
  }

  async RemoveItemFromWishList() {
    await this.page.getByRole('link', { name: ' Remove item' }).click(); 
  }

  async SuccessMessage() {
    const mensagemsucesso = await this.page.textContent('.message-success');
    expect(mensagemsucesso).toMatch('Radiant Tee has been removed');  
  }
}

