import {Page} from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutPage } from '../page-objects/formLayoutPage';
import { DatePickerPage } from '../page-objects/datePickerPage';
import { HelperBase } from './helperBase';

export class PageManager extends HelperBase{ 
    readonly navigationPage: NavigationPage;
    readonly formLayoutPage: FormLayoutPage;
    readonly datePickerPage: DatePickerPage;
    
    constructor(page: Page){
        super(page);
        this.navigationPage = new NavigationPage(page);
        this.formLayoutPage = new FormLayoutPage(page);
        this.datePickerPage = new DatePickerPage(page);
    }   

    navigateTo(){
        return this.navigationPage;

    }

    onFormLayoutPage(){
        return this.formLayoutPage;
    }

    onDatePickerPage(){
        return this.datePickerPage;
    }   
}
