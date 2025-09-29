import { test, expect } from '@playwright/test'

test.describe('Journal Tracker', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin')
    await page.fill('input[name="email"]', 'alex.runner@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.getByRole('button', { name: /Sign In/i }).click()
    await expect(page).toHaveURL('/dashboard')
  })

  test('should navigate to journal page', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByRole('button', { name: /Open Journal/i }).click()
    await expect(page).toHaveURL('/journal')
    await expect(page.locator('h1')).toContainText('Journal Tracker')
  })

  test('should show new entry form when clicking new entry', async ({ page }) => {
    await page.goto('/journal')
    await page.getByRole('button', { name: /New Entry/i }).click()

    // Check that form elements are visible
    await expect(page.getByText('New Journal Entry')).toBeVisible()
    await expect(page.getByLabel(/Date/i)).toBeVisible()
    await expect(page.getByLabel(/Sleep Hours/i)).toBeVisible()
    await expect(page.getByLabel(/RPE/i)).toBeVisible()
    await expect(page.getByLabel(/Mood/i)).toBeVisible()
    await expect(page.getByLabel(/Notes/i)).toBeVisible()
  })

  test('should display statistics cards', async ({ page }) => {
    await page.goto('/journal')

    // Check for stats cards
    await expect(page.getByText('This Week')).toBeVisible()
    await expect(page.getByText('Current Streak')).toBeVisible()
    await expect(page.getByText('Top Tags')).toBeVisible()

    // Check for mood trends chart
    await expect(page.getByText('Mood Trends')).toBeVisible()
  })
})