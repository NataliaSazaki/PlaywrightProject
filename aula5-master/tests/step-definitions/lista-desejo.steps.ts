import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { Expect, expect } from "playwright/test";
import { pageFixture } from "../support/pageFixture";
import { Browser, chromium } from 'playwright';
import { Page } from "playwright";
import { BrowserContext } from "playwright";
import { StorePage } from "../pages/lista-desejo.spec";


let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web

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

//Adicionando produto na lista de desejo

Given('acessar a página inicial do sistema Magento Luma', async () => {
  const listaDesejoPage= new StorePage(page);
  await listaDesejoPage.navigate2();
  });

When('adiciono o produto na lista de desejo',  {timeout: 2 * 5000}, async () => {
    const listaDesejoPage= new StorePage(page);
    await listaDesejoPage.AddItemToWishList();
  });

Then('o produto é inserido com sucesso na lista de desejo',  {timeout: 2 * 5000}, async () => {
  const listaDesejoPage= new StorePage(page);
  await listaDesejoPage.SuccessfullyAddedToWish();
  });


//Removendo produto da lista de desejo

Given('acesso a lista de desejo', async () => {
  const listaDesejoPage= new StorePage(page);
  await listaDesejoPage.AccessWishList();
});

When('removo o item da lista',  {timeout: 2 * 5000}, async () => {
  const listaDesejoPage= new StorePage(page);
  await listaDesejoPage.RemoveItemFromWishList();
});

Then('o produto é removido com sucesso da lista de desejo', {timeout: 2 * 5000}, async () => {
  const listaDesejoPage= new StorePage(page);
  await listaDesejoPage.SuccessMessage();
});

