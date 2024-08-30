import { chromium, test, expect, type Page} from '@playwright/test';

test('Adicionando e removendo produto do carrinho de compras', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');

  //Inserindo produto no carrinho
  await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('S', { exact: true }).click();
  await page.getByLabel('Orange').click();
  await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('button').click();
  
  //Verifica se o produto foi inserido com sucesso no carrinho
  const mensagemok = await page.textContent('.message-success');
  expect(mensagemok).toMatch('You added Radiant Tee to your');

  //Excluindo produto do carrinho
  await page.getByRole('link', { name: 'shopping cart' }).click();
  await page.getByRole('link', { name: ' Remove item' }).click();
  await page.locator('#maincontent').getByText('You have no items in your').click();
  await page.getByRole('link', { name: ' My Cart' }).click();
  await page.getByRole('strong').click();
});
