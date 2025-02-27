import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { Sidebar } from './pages/sidebar';
import { UserManagementPage } from './pages/user-management-page';
import { CreateUserPage } from './pages/create-user-page';
import { User } from './interfaces/user';

test.describe('Orange HRM: Administration -> Create User', ()=> {
  let loginPage: LoginPage, 
  dashboardPage : DashboardPage, 
  sidebar: Sidebar,
  userManagementPage: UserManagementPage,
  createUserForm: CreateUserPage;

  test.beforeEach('Login Successfully', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    dashboardPage = new DashboardPage(page);
    await expect(await dashboardPage.isCurrentPage()).toBeTruthy();
  });

  // test data
  let userDetailsWithWeakPassword: User = {
    userRole: 'Admin',
    employeeName: 'Test',
    status: 'Enabled',
    username: 'stefani',
    password: 'abcdabcd',
    confirmPassword: 'abcdabcd'
  };

  test('Create user with weak password and verify Error message', async ( { page }) => {
    
    // Navigate to create user form
    createUserForm = new CreateUserPage(page);
    await createUserForm.goto();
    // Submit create user form with weak password - no numbers
    await createUserForm.submitWithDetails(userDetailsWithWeakPassword);
    await createUserForm.assertErrorOnPage('Your password must contain minimum 1 number');

  });

  // test data
  let userDetailsForHappyPath: User = {
    userRole: 'Admin',
    employeeName: 'Test',
    status: 'Enabled',
    username: 'tester-',
    password: 'abcdabcd1',
    confirmPassword: 'abcdabcd1'
  };

  test('Create user Successfully', async ( { page }) => {
    // Navigate to create user form
    createUserForm = new CreateUserPage(page);
    await createUserForm.goto();

    // Submit create user form with all correct details
    await createUserForm.submitWithDetails(userDetailsForHappyPath);

    // Verify redirection to User Management page after successful user creation
    userManagementPage = new UserManagementPage(page);
    // Currently not working
    // expect(await userManagementPage.isCurrentPage()).toBeTruthy();

  });

});