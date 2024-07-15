const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('right_to_recall');
        const collection = database.collection('constituencies');

        // Read data from JSON file
        const data = JSON.parse(fs.readFileSync('constituencies.json', 'utf8'));

        // Insert data into MongoDB
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
