import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { CreateNewCustomerAccount } from "./pages/createNewUser-page";
import { UserDTO } from "./dto/user-dto";
import { CustumerAccount } from "./pages/custumerAccount-page";

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    const homePage = new HomePage(page);
    homePage.goToCreateAccount();

});

test ('Cadastrar novo usuário', async ({ page }) => {
    const dateTime = Date.now();
    const userDTO: UserDTO = {
        firstName:'José',
        lastName: 'Maria',
        email: dateTime + 'jm@mailinator.com',
        password: 'Teste_123',
        confirmPassword: 'Teste_123',
    }
const createNewCustumerAccount = new CreateNewCustomerAccount(page);
await createNewCustumerAccount.submitFormCreateAccount(userDTO);

const custumerAccount = new CustumerAccount(page);
await custumerAccount.verificarMsgRegistro();
await custumerAccount.verificarUsuario(userDTO);
});

test ('Validar campos obrigatórios', async ({page}) => {
    const dateTime = Date.now();
    const userDTO: UserDTO = {
        firstName:'',
        lastName: '',
        email: '',
        password: 'Teste_123',
        confirmPassword: 'Teste_123',
    }
const createNewCustumerAccount = new CreateNewCustomerAccount(page);
await createNewCustumerAccount.submitFormCreateAccount(userDTO);
await createNewCustumerAccount.verificaMsgErro('First Name');
await createNewCustumerAccount.verificaMsgErro('Last Name');
await createNewCustumerAccount.verificaMsgErro('Email');
});

test ('Validar tamanho e divergência na senha', async ({page}) => {
    const dateTime = Date.now();
    const userDTO: UserDTO = {
        firstName:'José',
        lastName: 'Maria',
        email: dateTime + 'jm@mailinator.com',
         //senha menor q 8 caracteres e confirmaçao de senha diferente
        password: 'z',
        confirmPassword: 'y',
    }
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);
    await createNewCustumerAccount.submitFormCreateAccount(userDTO);
    await createNewCustumerAccount.verificaDivergenciaSenha('Password');
    await createNewCustumerAccount.verificaDivergenciaSenha('Confirm Password');
});

test ('Validar complexidade da senha', async ({page}) => {
    const dateTime = Date.now();
    const userDTO: UserDTO = {
        firstName:'José',
        lastName: 'Maria',
        email: dateTime + 'jm@mailinator.com',
         //senha menor q 8 caracteres e confirmaçao de senha diferente
        password: '12345678',
        confirmPassword: '12345678',
    }
    const createNewCustumerAccount = new CreateNewCustomerAccount(page);
    await createNewCustumerAccount.submitFormCreateAccount(userDTO);
    await createNewCustumerAccount.verificaComplexidadeSenha('Password');
    await createNewCustumerAccount.verificaComplexidadeSenha('Confirm Password');
});