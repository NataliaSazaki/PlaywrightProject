import { test } from '@playwright/test';
import { CategoriaPage } from './pages/categoriaPage.spec';

test.beforeEach(async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.HomePage();
});

test("Navegar pela categoria What's New", async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoria("What's New");
    await categoryPage.verificarTituloCategoria("What's New");
});

test('Navegar pela categoria Women', async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoria('Women');
    await categoryPage.verificarTituloCategoria('Women');
});

test('Navegar pela categoria Men', async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoriaID('#ui-id-5');
    await categoryPage.verificarTituloCategoria('Men');
});

test('Navegar pela categoria Gear', async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoriaID('#ui-id-6');
    await categoryPage.verificarTituloCategoria('Gear');
});

test('Navegar pela categoria Training', async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoria('Training');
    await categoryPage.verificarTituloCategoria('Training');
});

test('Navegar pela categoria Sale', async ({ page }) => {
    const categoryPage = new CategoriaPage(page);
    await categoryPage.navegarPorCategoria('Sale');
    await categoryPage.verificarTituloCategoria('Sale');
});
