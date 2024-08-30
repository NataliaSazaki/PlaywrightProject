import { test, expect } from '@playwright/test';

test('Adicionando e removendo produto da lista de desejo', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');

  // Adicionando produto na lista de desejo
  await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('S', { exact: true }).click();
  await page.getByLabel('Orange').click();
  await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('link').nth(3).click();
  await page.locator('#maincontent div').filter({ hasText: 'Customer Login' }).click();

  await page.getByLabel('Email', { exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill('teste@gmail.com');
  await page.getByLabel('Email', { exact: true }).press('Tab');
  await page.getByLabel('Password').fill('1234Asdf');
  await page.getByRole('button', { name: 'Sign In' }).click();

  //Verifica se o produto foi inserido com sucesso na lista de desejo
  const mensagemsucesso = await page.textContent('.message-success');
  expect(mensagemsucesso).toMatch('Radiant Tee has been added to your Wish List. Click here to continue shopping.');
  
  //Removendo produto da lista de desejo
  await page.locator('span').filter({ hasText: 'My Wish List' }).click();
  await page.getByRole('link', { name: ' Remove item' }).click();
  await page.getByText('Radiant Tee has been removed').click();
});