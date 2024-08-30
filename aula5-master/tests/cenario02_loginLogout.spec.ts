import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { UserDTO } from "./dto/user-dto";
import { CustumerAccount } from "./pages/custumerAccount-page";
import { CustomerLogin } from "./pages/custumerLogin-page";
import { ForgotPassword } from "./pages/forgotPassword-page";


test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    const homePage = new HomePage(page);
    homePage.goToSingIn();
});

test ('Login com sucesso', async ({page}) => {

    const userDTO: UserDTO = {
        firstName:'José',
        lastName: 'Maria',
        email:  'ze@mail.com',
        password: 'Teste1234',
        confirmPassword: '',
    }

    const login = new CustomerLogin(page);
    await login.goToLogin(userDTO);
    await login.goToMyAccount();
    await page.waitForTimeout(5000);
    
    //Entra no sistema e valida usuário
    const custumerAccount = new CustumerAccount(page);
    await custumerAccount.verificarUsuario(userDTO);
});

test ('Logout com sucesso', async ({page}) => {

    const userDTO: UserDTO = {
        firstName:'José',
        lastName: 'Maria',
        email:  'ze@mail.com',
        password: 'Teste1234',
        confirmPassword: '',
    }

    const logout = new CustomerLogin(page);
    await logout.goToLogin(userDTO);
    await page.waitForTimeout(5000);
    
    //Sai do sistema e valida retorno para página inicial
    await logout.gotoLogout();
});

test ('Esqueci minha senha', async ({page}) => {
    const userDTO: UserDTO = {
        firstName:'',
        lastName: '',
        email:  'zemaria@mailinator.com',
        password: '',
        confirmPassword: '',
    }

    const forgotPws = new CustomerLogin(page);
    await forgotPws.goToForgotPassword();

    const forgotPwsForm = new ForgotPassword(page);
    await forgotPwsForm.submitFormForgotPassword(userDTO);


});

// para problemas com time out, alguns dos recursos encontrados foram esses aqui:
// para classe de testes: test.setTimeout(60000);
// para a step: setDefaultTimeout(20000);
// para a feature: @timeout=40000
// para clicar em um elemento específico: click({ timeout: 30000 });