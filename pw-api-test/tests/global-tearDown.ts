import { he } from '@faker-js/faker/.';
import {request, expect} from '@playwright/test';

export async function globalTearDown() {    
    const context = await request.newContext()
    const deleteArticleResponse = await context.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env['ARTICLE_SLUG']}`,
        {
            headers: {
                Authorization: `Token ${process.env['ACCESS_TOKEN']}`
            }
});
    expect(deleteArticleResponse.status()).toBe(204);
}
export default globalTearDown;