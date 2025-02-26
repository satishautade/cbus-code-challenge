import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly userArea: Locator;
  readonly logoutMenu: Locator;

  constructor(page: Page){
    this.page = page;
    this.userArea = this.page.locator('header > div.oxd-topbar-header > div.oxd-topbar-header-userarea');
    this.logoutMenu = this.page.getByRole('menuitem')
    .filter({hasText: 'Logout'});
  
  }
 
  async goto(pageName :string){
    // Navigate to requested page if BASEURL is defined.
    if (process.env.BASEURL){
      switch(pageName.toLowerCase()){
        case 'login' : 
          await this.page.goto(process.env.BASEURL + '/auth/login');
          break;
        case 'dashboard': 
          await this.page.goto(process.env.BASEURL + '/dashboard/index');
          break;
        default: 
          throw new Error("UNDEFINED PAGE : " + pageName );
      }
    }
    else 
    {
      throw new Error("BASEURL is NOT DEFINED ?? Please add this property to .env file ");
    }
  }

  // Verify currently given page is displayed
  async isCurrentPage(pageName: string): Promise <boolean> {
    const currentUrl = await this.page.url()
    return currentUrl.includes(pageName);
  }

  // Logout from any page
  async logout(){
    await this.userArea.click();
    await this.logoutMenu.click();
  }
}