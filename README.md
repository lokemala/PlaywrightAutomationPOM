# PlaywrightAutomationPOM

Playwright + TypeScript test automation for the [Conduit](https://conduit.bondaracademy.com/) app, using the Page Object Model, custom fixtures, saved login state, and data-driven article creation from JSON test data.

## Project structure

```
PlaywrightAsgn/
├── fixtures/
│   └── CustomFixture.ts         # Custom fixtures that provide page objects to tests
├── pages/
│   ├── Login.ts                 # Login page object
│   └── NewArticle.ts            # New Article page object (create / delete article)
├── testData/
│   └── articles.json            # Article data used by the data-driven tests
├── tests/
│   ├── authentication.setup.ts  # Logs in once and saves the login state
│   └── newArticle.spec.ts       # Creates one article per entry in articles.json
├── playwright.config.ts
└── tsconfig.json
```

## How it works

1. **Login setup:** the `setup` project logs in and saves the login state to `auth/admin.json`.
2. **Reusing the login:** the `chromium` project depends on `setup` and loads that saved state, so the tests start already logged in.
3. **Data-driven tests:** `newArticle.spec.ts` loops over `articles.json` with `forEach` and creates one test per article. Each test:
   - deletes the article from **My Posts** if it already exists, because Conduit requires unique titles
   - creates the article and checks that it was published

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
# Run all tests (setup runs first automatically)
npx playwright test

# Open the HTML report
npx playwright show-report
```

Run the commands from inside the `PlaywrightAsgn` folder, so that `auth/admin.json` is saved in the right place.

## Adding test data

To add an article, add an object to `newArticle` in `testData/articles.json`:

```json
{
    "title": "My new article",
    "description": "Short description",
    "body": "Article content",
    "tags": "Tag"
}
```

A new test is created for it automatically.

## CI

The GitHub Actions workflow in `.github/workflows` runs the tests on every push and pull request to `main`, and uploads the HTML report as an artifact.
