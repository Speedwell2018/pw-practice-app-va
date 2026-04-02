import { request, expect } from "@playwright/test";
import fs from 'fs';
import user from '../.auth/user.json';



async function globalSetup() {
    const authFile='pw-api-test/.auth/user.json';
    const context=await request.newContext();
    const response = await context.post(
        'https://conduit-api.bondaracademy.com/api/users/login',
        {
          data: {
            "user": {
              "email": "qavotest@gmail.com",    
                "password": "Welcome1"}
            }
        });
    const responseBody = await response.json();
    const accessToken = responseBody.user.token;
    user.origins[0].localStorage[0].value = accessToken;
    fs .writeFileSync(authFile, JSON.stringify(user));
    process.env['ACCESS_TOKEN'] = accessToken;
    
    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: {
          "article": {
            "tagList": [],
            "title": "Likes Test Article",
            "description": "This is a test article",
            "body": "This is the body of the test article"
          }
        },
        headers: {Authorization: `Token ${accessToken}`}
      });
       expect(articleResponse.status()).toBe(201);
            const articleResponseBody = await articleResponse.json();
            const articleSlug = articleResponseBody.article.slug;   
            process.env['ARTICLE_SLUG'] = articleSlug;

}

export default globalSetup;
