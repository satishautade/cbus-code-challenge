import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class Sidebar{
  readonly MenuItemLinks : Record <string, string>;
  readonly page: Page;
  readonly sidebarLinkWithName : (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.MenuItemLinks = {
      Admin: 'viewAdminModule',
      PIM: 'viewPimModule',
    };
    this.sidebarLinkWithName = (name)=> page.locator(`//a[contains(@class,"oxd-main-menu-item")] [contains(@href,"${name}")]`);
  }

  async clickSidebarLinkWithName(name: string){
    await this.sidebarLinkWithName(this.MenuItemLinks[name]).click();
    expect(this.page.url()).toContain(name.toLowerCase());
  }
}