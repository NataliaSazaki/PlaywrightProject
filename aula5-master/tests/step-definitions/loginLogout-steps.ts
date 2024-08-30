import { After, AfterAll, Before, BeforeAll, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, Page } from "playwright/test";
import { HomePage } from "../pages/home-page";
import { UserDTO } from "../dto/user-dto";
import { CustumerAccount } from "../pages/custumerAccount-page";
import { CustomerLogin } from "../pages/custumerLogin-page";
import { ForgotPassword } from "../pages/forgotPassword-page";


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

Given('acesso ao Magento', async function () {
    const homePage = new HomePage(page);
    await homePage.HomePage();
});
       
Given('o usuário escolhe realizar login na página', async function () {
    const homePage = new HomePage(page);
    homePage.goToSingIn();
});
       
When('preenche os dados do login', async function (dataTable) {

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
});

Then('o usuário acessa o sistema com sucesso', async function () {
    const login = new CustomerLogin(page);
    await login.goToLogin(user[0]);
    await page.waitForTimeout(2000);
    await login.goToMyAccount();
    //Entra no sistema e valida usuário
    const custumerAccount = new CustumerAccount(page);
    await custumerAccount.verificarUsuario(user[0]);
});

setDefaultTimeout(20000);
Then('o usuário sai do sistema com sucesso', async function () {
    const logout = new CustomerLogin(page);
    await logout.goToLogin(user[0]);
    await page.waitForTimeout(5000);
    await logout.gotoLogout();
});

When('o usuário solicita a recuperação de senha', async function () {
    const forgotPws = new CustomerLogin(page);
    await forgotPws.goToForgotPassword();
});

Then('o usuário recebe email de recuperação de senha', async function () {
    const forgotPwsForm = new ForgotPassword(page);
    await forgotPwsForm.submitFormForgotPassword(user[0]);
});
