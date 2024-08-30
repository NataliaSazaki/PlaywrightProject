import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { Expect, expect } from "playwright/test";
import { pageFixture } from "../support/pageFixture";
import { Browser, chromium } from 'playwright';
import { Page } from "playwright";
import { BrowserContext } from "playwright";
import { StorePage } from "../pages/produto-carrinho.spec";


let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web

setDefaultTimeout(60000);
BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
});

/*Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
});
*/
/*After(async function () {
    await page.close();
    await context.close();
});*/

AfterAll(async function () {
    await browser.close();
});

setDefaultTimeout(20000);

//Adicionando produto no carrinho de compras

Given('acesso a homepage do Magento', async () => {
  const carrinhoPage= new StorePage(page);
  await carrinhoPage.navigate();
  });

When('adiciono o produto no carrinho', async () => {
  const carrinhoPage= new StorePage(page);
    await carrinhoPage.selectProductSize();
    await carrinhoPage.selectProductColor();
    await carrinhoPage.addFirstProductToCart();
  });

setDefaultTimeout(20000);
Then('o produto é inserido com sucesso no carrinho de compras', async () => {
  const carrinhoPage= new StorePage(page);
  await carrinhoPage.proceedToCart();
  });

  
//Excluindo produto do carrinho
setDefaultTimeout(20000);
Given('acesso o carrinho de compras', async () => {
  const carrinhoPage= new StorePage(page);
  await carrinhoPage.accessCart();
});

When('removo o item do carrinho', async () => {
  const carrinhoPage= new StorePage(page);
  setDefaultTimeout(20000);
  await carrinhoPage.RemovefromCart();
  
});

Then('o produto é removido com sucesso do carrinho', async () => {
  const carrinhoPage= new StorePage(page);
  await carrinhoPage.SuccessMessage();
  
});

