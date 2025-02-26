import { test, expect, Page } from '@playwright/test';
import { LoginPage  } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

test.beforeEach(async ({ page }) => {
  const loginPage  = new LoginPage(page);
  await loginPage.goto();
});

test('Orange HRM: Successful Login test', async ({ page }) => {

  const loginPage  = new LoginPage(page);
  await loginPage.login('Admin', 'admin123');
  const dashboardPage = new DashboardPage(page);
  await expect(dashboardPage.isCurrentPage()).toBeTruthy();

});
