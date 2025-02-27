import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { User } from "../interfaces/user";

export class CreateUserPage extends BasePage {
  readonly page: Page;
  readonly buttonSave: Locator;
  readonly buttonCancel: Locator;
  readonly dropdownUserRole: Locator;
  readonly dropdownStatus : Locator;
  readonly optionWithName: (name: string) => Locator;
  readonly inputEmployeeName: Locator;
  readonly firstOption : Locator;
  readonly inputUsername: Locator;
  readonly inputPassword : Locator;
  readonly inputConfirmPassword: Locator;
  readonly errorMessagePassword: Locator;
  readonly autocompleteDropdown: Locator;
  
  constructor(page: Page){
    super(page);
    this.page = page;
    this.buttonSave = page.getByRole('button', {name : ' Save '});
    this.buttonCancel = page.getByRole('button', {name : ' Cancel '});
    this.dropdownUserRole = page.locator('.oxd-select-text').first();
    // this.dropdownStatus = page.getByText('-- Select --').nth(1);
    this.dropdownStatus = page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
    this.optionWithName = (option) => page.getByRole('option', { name: option });
    this.inputEmployeeName = page.getByRole('textbox', { name: 'Type for hints...' });
    this.firstOption = page.getByRole('option').first();
    this.inputUsername = page.getByRole('textbox').nth(2);
    this.inputPassword = page.getByRole('textbox').nth(3);
    this.inputConfirmPassword = page.getByRole('textbox').nth(4);
    this.errorMessagePassword = page.locator('div.user-password-cell > div > span');
    // this.autocompleteDropdown = page.locator('css=div.oxd-autocomplete-dropdown');
    this.autocompleteDropdown = page.getByRole('listbox');

  }

  async goto() {
    // Navigate to Create User page directly through URL
    await super.goto('create-user');
    
    // Verify Create User Page 
    if(await super.isCurrentPage('admin/saveSystemUser')){
      await expect(this.buttonSave).toBeVisible();
    } 
    else {
      throw new Error('Navigation to Add User Page failed');
    }
  }

  async isCurrentPage(): Promise<boolean> {
    return await super.isCurrentPage('admin/viewSystemUsers')
  }
  

  async submitWithDetails(userDetails: User){
    // User Role
    await this.dropdownUserRole.click();
    await this.optionWithName(userDetails.userRole).click();
    // Employee Name
    await this.inputEmployeeName.fill(userDetails.employeeName);
    expect(this.autocompleteDropdown).toBeVisible();
    await this.firstOption.click();
    // Status
    await this.dropdownStatus.click();

    await this.optionWithName(userDetails.status).click();
    // Username with a random 4 digit to make it unique
    await this.inputUsername.fill(this.appendRandomNumber(userDetails.username));
    // Password
    await this.inputPassword.fill(userDetails.password);
    await this.inputConfirmPassword.fill(userDetails.password);
    // Save
    await this.buttonSave.click();
  }

 private appendRandomNumber(value: string): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return `${value}${randomNum}`;
  }
  
  async assertErrorOnPage(errorMessage: string){
    await expect(this.errorMessagePassword).toBeVisible();
    await expect(this.errorMessagePassword).toHaveText(errorMessage)
  }
}