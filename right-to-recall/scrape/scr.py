import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import os
from bson.objectid import ObjectId

# Function to scrape data
def scrape_data():
    url = "https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Lok_Sabha"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for request errors
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    data = []

    # Locate all h2 tags with state names
    headers = soup.find_all('h2')
    
    for header in headers:
        span = header.find('span', {'class': 'mw-headline'})
        if span and 'id' in span.attrs:
            state = span.text.strip()
            # Find the table following the header
            table = header.find_next_sibling('table', {'class': 'wikitable'})
            if table:
                rows = table.find_all('tr')[1:]  # Skip the header row
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) > 1:
                        constituency = cols[1].text.strip()
                        # Generate ObjectId for each entry
                        _id = ObjectId()
                        data.append({'_id': _id, 'state': state, 'constituency': constituency})

    return data

# Function to insert data into MongoDB
def insert_data_to_mongo(data):
    try:
        client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))  # Connect to MongoDB
        db = client['india']
        collection = db['constituencies']
        collection.insert_many(data)
        print("Data inserted successfully!")
    except Exception as e:
        print(f"Error inserting data into MongoDB: {e}")

if __name__ == "__main__":
    data = scrape_data()
    if data:
        insert_data_to_mongo(data)

