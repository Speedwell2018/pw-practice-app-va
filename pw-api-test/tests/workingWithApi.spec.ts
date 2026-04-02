import { test, expect, request } from '@playwright/test';
import tags from './test-data/tags.json';
import {faker} from '@faker-js/faker';


test.beforeEach(async ({ page }) => {
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(tags)
    });
  });
  await page.goto('https://conduit.bondaracademy.com/');

});

test('has title', async ({ page }) => {
  await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = 'This is a mocked title';
    responseBody.articles[0].description = 'This is a mocked description';

    await route.fulfill({
      body: JSON.stringify(responseBody)
    });
  });
  await page.waitForTimeout(5000);
  await page.getByText('Global Feed').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a mocked title');
  await expect(page.locator('app-article-list p').first()).toContainText('This is a mocked description');

  
});

test ('delete article', async ({page, request }) => {
/*const response = await request.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
      data: {
        "user": {
          "email": "qavotest@gmail.com",
          "password": "Welcome1"
        }
      }
    }
  );
   expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  const token = responseBody.user.token;*/

  
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      "article": {
        "tagList": [],
        "title": "Test Article",
        "description": "This is a test article",
        "body": "This is a test article"
      },
      
    }
    //headers: {Authorization: `Token ${token}`}
  });
  expect(articleResponse.status()).toBe(201);

  await page.getByText('Global Feed').click();
  await page.locator('app-article-list h1').first().click();
  await page.getByRole('button', {name:'Delete Article'}).first().click();
  await expect(page.locator('app-article-list h1').first()).not.toContainText('Test Article');

});

test('create article', async ({page, request }) => {
      await page.getByText('New Article').click();
      await page.getByPlaceholder('Article Title').fill('Test Article');
      await page.getByPlaceholder("What's this article about?").fill('This is a test article');
      await page.getByPlaceholder('Write your article (in markdown)').fill('This is a test article');
      const createArticleResponsePromise = page.waitForResponse(response =>
        response.url() === 'https://conduit-api.bondaracademy.com/api/articles/' &&
        response.request().method() === 'POST'
      );
      await page.getByRole('button', {name:'Publish Article'}).click();
      const createArticleResponse = await createArticleResponsePromise;
      expect(createArticleResponse.status()).toBe(201);
      const createArticleResponseBody = await createArticleResponse.json();
      const slugID = createArticleResponseBody.article.slug;
      
      await page.getByText('Home').click();
      await page.getByText('Global Feed').click();
      await expect(page.locator('app-article-list h1').first()).toContainText('Test Article'); 

      const authToken=await page.evaluate(() => localStorage.getItem('jwtToken'));
      const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`); 
      
      expect(deleteArticleResponse.status()).toBe(204);
      await page.reload();
      await expect(page.locator('app-article-list h1').first()).not.toContainText('Test Article');

  })

