import {Page} from '@playwright/test';
import { HelperBase } from './helperBase';

export class FormLayoutPage extends HelperBase{


    constructor(page: Page){
        super(page);
    }

    async submitUsingTheGridForm(email: string, password: string, optionText: string ){
        const  usingTheGridForm = this.page.locator('nb-card',{hasText:'Using the Grid'});
    
        await usingTheGridForm.getByRole('textbox',{name:'Email'}).fill(email);
        await usingTheGridForm.getByRole('textbox', {name:'Password'}).fill(password);
        await usingTheGridForm.getByRole('radio', {name:optionText}).check({force:true});
        await usingTheGridForm.getByRole('button', {name:'Sign in'}).click();
    }
/** 
    *@param name- should be the first and last name separated by space
    *@param email- email address to fill in the form
    *@param rememberMe - if true, the checkbox will be checked, otherwise it will be left unchecke
*/
    async submitInlineForm(name: string, email: string, rememberMe: boolean ){
        const  inlineForm = this.page.locator('nb-card',{hasText:'Inline form'});
    
        await inlineForm.getByRole('textbox',{name:'Jane Doe'}).fill(name);
        await inlineForm.getByRole('textbox', {name:'Email'}).fill(email);
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({force:true});
        }
        await inlineForm.getByRole('button', {name:'Submit'}).click();
    }
    async submitInlineFormCorrect(name: string, email: string, rememberMe: boolean ){
        const  inlineForm = this.page.locator('nb-card',{hasText:'Inline form'});
    
        await inlineForm.getByRole('textbox',{name:'Jane Doe'}).fill(name);
        await inlineForm.getByRole('textbox', {name:'Email'}).fill(email);
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({force:true});
        }
        await inlineForm.getByRole('button', {name:'Submit'}).click();
    }
}