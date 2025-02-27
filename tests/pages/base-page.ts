import { expect, type Locator, type Page } from '@playwright/test';
import { Sidebar } from './sidebar';

export class BasePage {
  readonly page: Page;
  readonly userArea: Locator;
  readonly logoutMenu: Locator;
  public sidebar: Sidebar;
  readonly userDropDownMenuNamed: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    // Use composition to include sidebar and Top Nav in the base page
    // This design will ensure it is available for all page classes to use
    this.sidebar = new Sidebar(page);
    this.userArea = this.page.locator('header > div.oxd-topbar-header > div.oxd-topbar-header-userarea');
    this.logoutMenu = this.page.getByRole('menuitem').filter({ hasText: 'Logout' });
    this.userDropDownMenuNamed = (name) => page.locator(`//a[@role="menuitem"] [contains(@href,"${name}")]`);
  }

  async goto(pageName: string) {
    const prefix = '/web/index.php'
    // Navigate to requested page
    switch (pageName.toLowerCase()) {
      case 'login':
        await this.page.goto(prefix + '/auth/login');
        break;
      case 'dashboard':
        await this.page.goto(prefix + '/dashboard/index');
        break;
      case 'user-management':
        await this.page.goto(prefix + '/admin/viewSystemUsers');
        break;
      case 'create-user':
        await this.page.goto(prefix + '/admin/saveSystemUser');
        break;
      default:
        throw new Error("UNDEFINED PAGE : " + pageName);
    }
  }

  // Verify currently given page is displayed
  async isCurrentPage(pageName: string): Promise<boolean> {
    const currentUrl = await this.page.url()
    console.log ("CURRENT URL => " + currentUrl);
    console.log ("EXPECTING PAGE => " + pageName);
    return currentUrl.includes(pageName);

  }

  // Logout from any page
  async logout() {
    await this.userArea.click();
    // await this.logoutMenu.click(); # Click using the display name 
    // Click using the href of the dropdown menu links to workaround translation
    await this.userDropDownMenuNamed('logout').click();
  }
}