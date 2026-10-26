import { test } from "../fixtures/CustomFixture";
import { newArticle } from "../testData/articles.json";

test.beforeEach("Launch Url as logged-in Admin", async ({ goToLoginPage }) => {
  await goToLoginPage.launchURL();
});

newArticle.forEach((article) => {
  test(
    `Create new Article: ${article.title}`, async ({ goToNewArticlePage }) => {
      await test.step("Step: 1:  Delete Article if already present", async () => {
        await goToNewArticlePage.deleteArticleIfExists(article.title);
      });
      await test.step("Step: 2:  Create new Article", async () => {
        await goToNewArticlePage.createNewArticle(
          article.title,
          article.description,
          article.body,
          article.tags,
        );
      });
    },
  );
});

test(`Delete 2nd Article: ${newArticle[1].title}`, async ({ goToNewArticlePage }) => {
  await test.step("Step: 1:  Delete the 2nd Article", async () => {
    await goToNewArticlePage.deleteArticle(newArticle[1].title);
  });
});
