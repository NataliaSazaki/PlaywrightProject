import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout} from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, expect, Page } from "playwright/test";
import { ProdutoPage } from "../pages/ProdutoPage.spec";
import { AvaliacaoPage } from "../pages/AvaliacaoPage.spec";
import { ListaComparacaoPage } from "../pages/ListaComparacaoPage.spec";


let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web

setDefaultTimeout(60000);
BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
});

After(async function () {
    //await page.close();
    //await context.close();
});

AfterAll(async function () {
    await browser.close();
});

Given('ao acessar o site inicial do Magento Luma', async function () {
    const produtoPage = new ProdutoPage(page);
    await produtoPage.HomePage();    
});

setDefaultTimeout(100000);
When('quando adicionar os produtos para comparação', async function () {
    const produtoPage = new ProdutoPage(page);
    const listaComparacaoPage = new ListaComparacaoPage(page);

    // Clicar no primeiro produto da página inicial: Radiant Tee
    await produtoPage.clicarProduto('Radiant Tee');

    // Validar que a página carregou localizando pelo título do produto e depois recarregá-la
    await produtoPage.esperarTituloProduto('Radiant Tee');
    await page.reload();

    // Localizar e clicar no botão "Adicionar à lista de comparação"
    await produtoPage.clicarAdicionarComparacao();

    await page.waitForTimeout(5000);

    // Verificar se a mensagem de sucesso está presente
    await listaComparacaoPage.verificarMensagemSucesso('You added product Radiant Tee to the comparison list.');

    // Voltar para a página inicial (clicar no logo)
    await produtoPage.ClicarLogotipoLoja();

    await page.waitForTimeout(5000);

    // Clicar no segundo produto da página inicial: Breathe-Easy Tank
    await produtoPage.clicarProduto('Breathe-Easy Tank');

    // Validar que a página carregou localizando pelo título do produto e depois recarregá-la
    await produtoPage.esperarTituloProduto('Breathe-Easy Tank');
    await page.reload();

    //await page.waitForTimeout(5000);

    // Localizar e clicar no botão "Adicionar à lista de comparação"
    await produtoPage.clicarAdicionarComparacao();

    // Verificar se a mensagem de sucesso está presente
    await listaComparacaoPage.verificarMensagemSucesso('You added product Breathe-Easy Tank to the comparison list.');
    
});

Then('devo ver a lista de validação', async function () {
    const listaComparacaoPage = new ListaComparacaoPage(page);
     // Clicar para ver a lista de comparação
     await listaComparacaoPage.clicarListaComparacaoLink();
});