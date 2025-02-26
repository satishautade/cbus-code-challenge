import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

// Extend the test with a fixture to share the LoginPage instance
const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

test('Orange HRM: Successful Login test', async ({ loginPage, page }) => {
  await loginPage.login('Admin', 'admin123');
  const dashboardPage = new DashboardPage(page);
  await expect(await dashboardPage.isCurrentPage()).toBeTruthy();
});

test('Orange HRM: Failed Login test', async ({ loginPage, page }) => {
  await loginPage.login('wrongUser', 'wrongPassword');
  const dashboardPage = new DashboardPage(page);
  await expect(await dashboardPage.isCurrentPage()).toBeFalsy();
  await loginPage.assertErrorOnPage('Invalid credentials');
});
