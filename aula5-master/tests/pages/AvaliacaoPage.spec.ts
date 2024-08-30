import { Page } from '@playwright/test';

export class AvaliacaoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selecionarEstrela() {
        const estrelasAva = await this.page.locator("//*[contains(@class, 'rating-2')]");
        await estrelasAva.click({ timeout: 90000 });
    }

    async preencherNome(nickname: string) {
        const nicknameField = await this.page.getByLabel('Nickname');
        await nicknameField.click();
        await nicknameField.fill(nickname);
    }

    async preencherResumo(summary: string) {
        const summaryField = await this.page.getByLabel('Summary');
        await summaryField.click();
        await summaryField.fill(summary);
    }

    async preencherAvaliacao(review: string) {
        const reviewField = await this.page.getByLabel('Review', { exact: true });
        await reviewField.click();
        await reviewField.fill(review);
    }

    async enviarAvaliacao() {
        const btnSubmit = await this.page.getByText('Submit Review');
        await btnSubmit.click();
    }
    async verificarEnvioAvaliacao() {
        const mensagemAvaliacaoEnviada = await this.page.textContent('.message-success');
        if (mensagemAvaliacaoEnviada !== null) {
        return mensagemAvaliacaoEnviada.includes("You submitted your review for moderation.");
        }
    }
}