import {Locator, Page} from '@playwright/test';
import { HelperBase } from './helperBase';


export class NavigationPage extends HelperBase{
    readonly formLayoutsMenuItem: Locator;
    readonly datepickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor(page: Page){
        super(page);
        this.formLayoutsMenuItem = page.getByText('Form Layouts');
        this.datepickerMenuItem = page.getByText('Datepicker');
        this.smartTableMenuItem = page.getByText('Smart Table');
        this.toastMenuItem = page.getByText('Toastr');
        this.tooltipMenuItem = page.getByText('Tooltip');

    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms');
        await this.formLayoutsMenuItem.click();
    }

    async datepickerPage(){
        
        await this.selectGroupMenuItem('Forms');
        await this.page.waitForTimeout(1000);
        await this.datepickerMenuItem.click();
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenuItem.click();
    }   

    async toastPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastMenuItem.click();
    }   

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click();
    }   

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState=await groupMenuItem.getAttribute('aria-expanded');
        if(expandedState === 'false'){
            await groupMenuItem.click();
        }
    }
}