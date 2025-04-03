import asyncio
from playwright.async_api import async_playwright
import pandas as pd

async def scrape_nypl():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto("https://www.nypl.org/locations", timeout=60000)
        await page.wait_for_timeout(10000)  # wait for content to fully load

        # Scroll to load more content
        for _ in range(15):
            await page.keyboard.press("PageDown")
            await asyncio.sleep(0.5)

        # Select elements by visible patterns
        cards = await page.query_selector_all(".nypl-location")  # updated selector guess

        data = []
        for card in cards:
            try:
                name_el = await card.query_selector("h3")
                name = await name_el.inner_text() if name_el else "Unknown"

                addr_el = await card.query_selector(".address, .location-address")
                address = await addr_el.inner_text() if addr_el else "Unknown"

                phone_el = await card.query_selector(".phone, .location-phone")
                phone = await phone_el.inner_text() if phone_el else "Unknown"

                data.append({
                    "name": name.strip(),
                    "address": address.strip().replace("\n", " "),
                    "phone": phone.strip()
                })
            except Exception as e:
                print("❌ Error scraping card:", e)

        await browser.close()

        df = pd.DataFrame(data)
        df.to_csv("nypl_branches.csv", index=False)
        print(f"✅ Scraped {len(df)} branches and saved to nypl_branches.csv")

asyncio.run(scrape_nypl())
