import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';
import { argosScreenshot } from "@argos-ci/playwright";


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigate to form page', async ({ page }) => {
  const pm= new PageManager(page);
  
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastPage();
  await pm.navigateTo().tooltipPage();
});

test('parametrized methods', async ({ page }, testInfo) =>{
const pm = new PageManager(page);
const randomFullName = faker.person.fullName();
const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`;
await pm.navigateTo().formLayoutsPage();
await pm.onFormLayoutPage().submitUsingTheGridForm(process.env.USERNAME || '', process.env.PASSWORD || '', 'Option 1');
const buffer = await page.screenshot();
console.log(buffer.toString('base64'));
  if(testInfo.retry){
 
    await pm.onFormLayoutPage().submitInlineFormCorrect(randomFullName, randomEmail, true);

  }
  else {await pm.onFormLayoutPage().submitInlineForm(randomFullName, randomEmail, true);}
  await page.screenshot({path:`screenshots/${testInfo.title} - attempt ${testInfo.retry}.png`});
 await page.locator('nb-card',{hasText:'Inline form'}).screenshot({path:`screenshots/${testInfo.title} -Inline form.png`});
  await pm.navigateTo().datepickerPage();
  await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5);
  await pm.onDatePickerPage().selectCommonDatePickerRangeFromToday(5, 10);
});

test.only('test for Argo CI', async ({ page }) => {
  const pm= new PageManager(page);
  
  await pm.navigateTo().formLayoutsPage();
  await argosScreenshot(page, "form_page");
  await pm.navigateTo().datepickerPage();
  await argosScreenshot(page, "datepicker_page");

});




