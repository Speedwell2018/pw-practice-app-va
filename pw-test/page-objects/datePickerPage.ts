import {Page, expect} from '@playwright/test';
import { HelperBase } from './helperBase';

export class DatePickerPage extends HelperBase{


    constructor(page: Page){
        super(page);
    }

    async selectCommonDatePickerDateFromToday(numberOfDays: number){
        const calendarInputField=this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        const dateToAssert= await this.selectDateInTheCalendar(numberOfDays);    
        await expect(calendarInputField).toHaveValue(dateToAssert);
        
    }
    async selectCommonDatePickerRangeFromToday(numberOfDaysToStart: number, numberOfDaysToEnd: number){
        const calendarInputField=this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
        const dateToAssertStart= await this.selectDateInTheCalendar(numberOfDaysToStart);    
        const dateToAssertEnd= await this.selectDateInTheCalendar(numberOfDaysToEnd);    
        const dateToAssert=`${dateToAssertStart} - ${dateToAssertEnd}`;
        await expect(calendarInputField).toHaveValue(dateToAssert);
        
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        
        const expectedDay = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
        const expectedYear = date.getFullYear();
        const dateToAssert=`${expectedMonthShort} ${expectedDay}, ${expectedYear}`;
        let calendarMonthAndYear=await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear=` ${expectedMonthLong} ${expectedYear} `;
        while(!calendarMonthAndYear || !calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [ng-reflect-icon="chevron-right-outline"]').click();
            calendarMonthAndYear=await this.page.locator('nb-calendar-view-mode').textContent();
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDay,{exact:true}).click();
        return dateToAssert;
    }


}