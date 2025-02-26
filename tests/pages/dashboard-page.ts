import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  readonly page: Page;

  constructor(page: Page){
    super(page);
    this.page = page;
  }

  async goto() {
    // Navigate to Dashboard page
    await super.goto('dashboard');
  }

  async isCurrentPage(): Promise<boolean> {
    return await super.isCurrentPage('dashboard')
  }
}