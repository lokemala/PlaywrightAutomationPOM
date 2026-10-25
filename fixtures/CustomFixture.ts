import { test as helper } from "@playwright/test";
import LoginPage from "../pages/Login";
import NewArticlePage from "../pages/NewArticle";

type CustomFixture = {
  goToLoginPage: LoginPage;
  goToNewArticlePage: NewArticlePage;
};

export const test = helper.extend<CustomFixture>({
  goToLoginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  goToNewArticlePage: async ({ page }, use) => {
    await use(new NewArticlePage(page));
  }
});