import { test, expect } from '@playwright/test'

test.describe('Session Booking', () => {
  test('should display coach profiles', async ({ page }) => {
    await page.goto('/sessions')

    // Check page title
    await expect(page.locator('h1')).toContainText('1:1 Coaching Sessions')

    // Check coach profiles are visible
    await expect(page.getByText('Skyla Wilson')).toBeVisible()
    await expect(page.getByText('Hurdles & Sprint Specialist')).toBeVisible()
    await expect(page.getByText('Birgen Nelson')).toBeVisible()
    await expect(page.getByText('Mental Performance Coach')).toBeVisible()

    // Check session types
    await expect(page.getByText('Mental Performance')).toBeVisible()
    await expect(page.getByText('Track Hurdles Form Review')).toBeVisible()
    await expect(page.getByText('Recruiting Consultation')).toBeVisible()
  })

  test('should show book buttons for each coach', async ({ page }) => {
    await page.goto('/sessions')

    // Check for booking buttons
    const skylaBookButton = page.getByRole('button', { name: /Book with Skyla/i })
    const birgenBookButton = page.getByRole('button', { name: /Book with Birgen/i })

    await expect(skylaBookButton).toBeVisible()
    await expect(birgenBookButton).toBeVisible()
  })

  test('should display how it works section', async ({ page }) => {
    await page.goto('/sessions')

    // Check for How It Works section
    await expect(page.getByText('How It Works')).toBeVisible()
    await expect(page.getByText('Choose Your Coach')).toBeVisible()
    await expect(page.getByText('Book Your Session')).toBeVisible()
    await expect(page.getByText('Prepare Your Questions')).toBeVisible()
    await expect(page.getByText('Meet & Learn')).toBeVisible()
  })
})