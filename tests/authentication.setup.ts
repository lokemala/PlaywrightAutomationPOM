import { test } from "../fixtures/CustomFixture";
import { ADMIN_STORAGE_STATE } from '../playwright.config'

test('Valid Login', async ({ page, goToLoginPage }) => {
    await goToLoginPage.launchURL();
    await goToLoginPage.userLogin(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await page.context().storageState({ path: ADMIN_STORAGE_STATE });
})