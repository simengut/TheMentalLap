import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display main elements', async ({ page }) => {
    await page.goto('/')

    // Check main heading
    await expect(page.locator('h1')).toContainText('Train your mind. Sharpen your edge.')

    // Check CTA buttons
    await expect(page.getByRole('button', { name: /Start Journal/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Book a Session/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Join a Workshop/i })).toBeVisible()

    // Check coaches section
    await expect(page.getByText('Skyla Wilson')).toBeVisible()
    await expect(page.getByText('Birgen Nelson')).toBeVisible()

    // Check navigation
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Journal/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Sessions/i })).toBeVisible()
  })

  test('should navigate to sign up page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Sign Up/i }).click()
    await expect(page).toHaveURL('/auth/signup')
    await expect(page.locator('h1,h2,h3').first()).toContainText(/Create Account/i)
  })
})