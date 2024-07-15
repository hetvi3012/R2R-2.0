from selenium import webdriver
from bs4 import BeautifulSoup
import pymongo

# MongoDB setup
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["constituencies_db"]
collection = db["states_constituencies"]

# Set up the Selenium WebDriver for Safari
driver = webdriver.Safari()
driver.get("https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Lok_Sabha")

# Parse the page content
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Find the table with the specific class name
table = soup.find('table', {'class': 'wikitable'})
rows = table.find_all('tr')

data = []
for row in rows[1:]:  # Skip the header row
    cols = row.find_all('td')
    if len(cols) > 1:
        state = cols[0].text.strip()
        constituency = cols[1].text.strip()
        data.append({"state": state, "constituency": constituency})

# Insert data into MongoDB
if data:
    collection.insert_many(data)

# Close the Selenium driver
driver.quit()
