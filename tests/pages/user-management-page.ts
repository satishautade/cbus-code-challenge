import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class UserManagementPage extends BasePage {
  readonly page: Page;
  readonly buttonAddUser: Locator;
  
  constructor(page: Page){
    super(page);
    this.page = page;
    this.buttonAddUser = page.getByRole('button', {name : ' Add '});
  }

  async goto() {
    // Navigate to Admin > User Management page
    await super.goto('user-management');
    
    // Verify User Management page
    if(await super.isCurrentPage('admin/viewSystemUsers')){
      await expect(this.buttonAddUser).toBeVisible();
    } 
    else {
      throw new Error('Navigation to User Management Page failed');
    }
  }

  async isCurrentPage(): Promise<boolean> {
    return await super.isCurrentPage('admin/viewSystemUsers')
  }

  async navigateToCreateUserForm(){
    await this.buttonAddUser.click();
  }
}