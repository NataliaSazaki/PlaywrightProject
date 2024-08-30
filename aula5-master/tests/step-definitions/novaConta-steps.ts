import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, Page } from "playwright/test";
import { HomePage } from "../pages/home-page";
import { CreateNewCustomerAccount } from "../pages/createNewUser-page";
import { UserDTO } from "../dto/user-dto";
import { CustumerAccount } from "../pages/custumerAccount-page";

let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web
let user: UserDTO [] = [];

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
});

After(async function () {
    await page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});

setDefaultTimeout(20000);
Given('acesso a página inicial do Magento',async function () {
    const homePage = new HomePage(page);
    await homePage.HomePage();
  });

Given('o usuário escolhe realizar um novo cadastro', async function () {
    const createAccount = new HomePage(page);
    createAccount.goToCreateAccount();
});

setDefaultTimeout(20000);
When('preenche os dados do cadastro', async function (dataTable) {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);

    const table = dataTable.hashes();
    user = [];
    for (const row of table){
        const emailAleatorio = Date.now() + row['Email'];
        user.push({
            firstName: row['FirstName'],
            lastName: row ['LastName'],
            email: emailAleatorio,
            password: row ['Password'],
            confirmPassword: row ['ConfirmPassword'],
        })
    }
    await createNewCustumerAccount.submitFormCreateAccount(user[0]);
});
       
Then('o novo usuário é cadastrado com sucesso', async function () {
    const custumerAccount = new CustumerAccount(page);
    await custumerAccount.verificarMsgRegistro();
    await custumerAccount.verificarUsuario(user[0]);
});

When('o usuário NÃO preenche os dados do cadastro', async function (dataTable) {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);

    const table = dataTable.hashes();
    user = [];
    for (const row of table){
        user.push({
            firstName: row['FirstName'],
            lastName: row ['LastName'],
            email: row['Email'],
            password: row ['Password'],
            confirmPassword: row ['ConfirmPassword'],
        })
    }
    await createNewCustumerAccount.submitFormCreateAccount(user[0]);
});

setDefaultTimeout(20000);
Then('o sistema informa que os campos são obrigatórios', async function () {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);
    await createNewCustumerAccount.verificaMsgErro('First Name');
    await createNewCustumerAccount.verificaMsgErro('Last Name');
    await createNewCustumerAccount.verificaMsgErro('Email');
});

When('o usuário realiza cadastro com tamanho de senha inválida e confirmação de senha diferente da senha', async function (dataTable) {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);

    const table = dataTable.hashes();
    user = [];
    for (const row of table){
        const emailAleatorio = Date.now() + row['Email'];
        user.push({
            firstName: row['FirstName'],
            lastName: row ['LastName'],
            email: emailAleatorio,
            password: row ['Password'],
            confirmPassword: row ['ConfirmPassword'],
        })
    }
    await createNewCustumerAccount.submitFormCreateAccount(user[0]);
});

setDefaultTimeout(20000);
Then('o sistema apresenta mensagens descrevendo as divergencias encontradas', async function () {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);
    await createNewCustumerAccount.verificaDivergenciaSenha('Password');
    await createNewCustumerAccount.verificaDivergenciaSenha('Confirm Password');
});

When('o usuário realiza cadastro com uma senha fraca', async function (dataTable) {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);

    const table = dataTable.hashes();
    user = [];
    for (const row of table){
        const emailAleatorio = Date.now() + row['Email'];
        user.push({
            firstName: row['FirstName'],
            lastName: row ['LastName'],
            email: emailAleatorio,
            password: row ['Password'],
            confirmPassword: row ['ConfirmPassword'],
        })
    }
    await createNewCustumerAccount.submitFormCreateAccount(user[0]);
  });

  setDefaultTimeout(20000);
Then('o sistema apresenta mensagem informando a complexidade esperada para uma senha', async function () {
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);
    await createNewCustumerAccount.verificaComplexidadeSenha('Password');
    await createNewCustumerAccount.verificaComplexidadeSenha('Confirm Password');
  });