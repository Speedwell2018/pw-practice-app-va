import {test as setup, expect} from '@playwright/test';


setup('create new article', async ({request}) => {

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: {
          "article": {
            "tagList": [],
            "title": "Likes Test Article",
            "description": "This is a test article",
            "body": "This is the body of the test article"
          }
        }
      });
       expect(articleResponse.status()).toBe(201);
         const articleResponseBody = await articleResponse.json();
        const articleSlug = articleResponseBody.article.slug;   
        process.env['ARTICLE_SLUG'] = articleSlug;
});
