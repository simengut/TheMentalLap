import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should create a new account', async ({ page }) => {
    await page.goto('/auth/signup')

    // Fill out signup form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`)
    await page.fill('input[name="password"]', 'testpassword123')

    // Submit form
    await page.getByRole('button', { name: /Sign Up/i }).click()

    // Should redirect to dashboard after signup
    await expect(page).toHaveURL('/dashboard')
  })

  test('should sign in with existing account', async ({ page }) => {
    await page.goto('/auth/signin')

    // Fill out signin form (using seeded data)
    await page.fill('input[name="email"]', 'alex.runner@example.com')
    await page.fill('input[name="password"]', 'password123')

    // Submit form
    await page.getByRole('button', { name: /Sign In/i }).click()

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText(/Welcome back/i)
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/auth/signin')

    await page.fill('input[name="email"]', 'invalid@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')

    await page.getByRole('button', { name: /Sign In/i }).click()

    // Should show error message
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible()
  })
})