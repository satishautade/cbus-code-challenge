import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage{
  readonly page: Page;
  readonly demoCredential : Locator;
  readonly inputUsername : Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.demoCredential = page.locator('div[class*=orangehrm-demo-credentials]');
    // using CSS locator strategy because of Localization 
    // as user-facing attributes keep changing
    this.inputUsername = page.locator('css=input[name=username]');
    this.inputPassword = page.locator('css=input[name=password]');
    this.buttonLogin = page.locator('button[type=submit]');
    this.alertMessage = page.locator('div.oxd-alert-content.oxd-alert-content--error > p');
  }

  async goto() {
    // Navigate to Login page
    await super.goto('login');

    // Verify login page
    if(await super.isCurrentPage('login')){
      await expect(this.demoCredential).toBeVisible();
    } 
    else {
      throw new Error('Navigation to Login Page failed');
    }
  }

  async login( username : string , password : string){
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
  }

  async assertErrorOnPage(errorMessage: string){
    await expect(this.alertMessage).toBeVisible();
    await expect(this.alertMessage).toHaveText(errorMessage)
  }

}