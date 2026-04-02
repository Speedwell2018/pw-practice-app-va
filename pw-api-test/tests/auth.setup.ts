import { expect, test as setup } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import user from '../.auth/user.json';


const authFile ='pw-api-test/.auth/user.json';

setup('authentication', async ({request }) => {

    //await page.goto('https://conduit.bondaracademy.com/');
    //await page.getByRole('link', { name: 'Sign in' }).click();    
    //await page.getByPlaceholder('Email').fill('qavotest@gmail.com');
    //await page.getByPlaceholder('Password').fill('Welcome1');
    //await page.getByRole('button', { name: 'Sign in' }).click();
    //await page.waitForResponse('**/api/tags');

    //await page.context().storageState({ path: authFile });

  const response = await request.post(
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
  const accessToken = responseBody.user.token;
  user.origins[0].localStorage[0].value = accessToken;

fs.writeFileSync(authFile, JSON.stringify(user));
  
  process.env['ACCESS_TOKEN'] = accessToken;
  console.log(`Access token ${accessToken} saved to .auth/user.json and environment variable`);
  

});
