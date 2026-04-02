import {test as setup, expect} from '@playwright/test';

setup('delete article', async ({request}) => {
    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env['ARTICLE_SLUG']}`);
    expect(deleteArticleResponse.status()).toBe(204);
});
