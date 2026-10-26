import { expect, Page, Locator } from "@playwright/test";

export default class NewArticlePage {
    readonly page: Page;
    readonly newArticleLink: Locator;
    readonly articleTitle: Locator;
    readonly articleDescription: Locator;
    readonly articleBody: Locator;
    readonly articleTags: Locator;
    readonly publishBtn: Locator;
    readonly profileLink: Locator;
    readonly deleteArticleBtn: Locator;
    readonly noArticles: Locator

    constructor(page: Page) {
        this.page = page;
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.articleTitle = page.getByPlaceholder('Article Title');
        this.articleDescription = page.getByPlaceholder("What's this article about?");
        this.articleBody = page.getByPlaceholder('Write your article (in markdown)');
        this.articleTags = page.getByPlaceholder('Enter tags');
        this.publishBtn = page.getByRole('button', { name: 'Publish Article' });
        this.profileLink = page.locator('a.nav-link[href^="/profile/"]');
        this.deleteArticleBtn = page.getByRole('button', { name: 'Delete Article' }).first();
        this.noArticles = page.getByText('No articles are here... yet.');

    }

    async deleteArticleIfExists(title: string) {
        await this.profileLink.click();
        await this.page.waitForTimeout(3000);
        const articleHeading = this.page.getByRole('heading', { name: title, exact: true });
        if (await articleHeading.count() === 0) {
            return;
        }
        else {
            await articleHeading.click();
            await this.deleteArticleBtn.click();
            await expect(this.page).toHaveURL('https://conduit.bondaracademy.com/');
        }
    }

    async deleteArticle(title: string) {
        await this.profileLink.click();

        const articleHeading = this.page.getByRole('heading', { name: title, exact: true });
        await expect(articleHeading).toBeVisible();
        await articleHeading.click();
        await this.deleteArticleBtn.click();
        await expect(this.page).toHaveURL('https://conduit.bondaracademy.com/');

        await this.profileLink.click();
        const anyArticle = this.page.locator('app-article-preview h1').first();
        await expect(anyArticle.or(this.noArticles)).toBeVisible();
        await expect(articleHeading).toBeHidden();
    }

    async createNewArticle(title: string, description: string, body: string, tags: string) {
        await expect(this.newArticleLink).toBeVisible();
        await this.newArticleLink.click();
        await expect(this.articleTitle).toBeEditable();
        await this.articleTitle.fill(title);
        await this.articleDescription.fill(description);
        await this.articleBody.fill(body);
        await this.articleTags.fill(tags);
        await this.publishBtn.click();
        await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
    }
}
