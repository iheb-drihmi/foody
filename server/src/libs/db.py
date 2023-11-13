import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load config from .env file
load_dotenv()

# Get MongoDB URI from environment variables
DB_URI = os.getenv("DB_URI")

# Create a MongoDB client and a 'foody' database connection
client = MongoClient(DB_URI)

# Reference to 'foody' database
db = client.foody
