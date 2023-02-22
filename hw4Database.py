import pymongo
import certifi

ca = certifi.where()

# Replace the placeholder values with your MongoDB connection string and database name
connection_string = "mongodb+srv://alanajen:SXrNsseKCYbLqVp9@cluster0.lcuqtdo.mongodb.net/Projects?retryWrites=true&w=majority" #connects to alana's database
database_name = "Projects"

# Connect to MongoDB
client = pymongo.MongoClient(connection_string, tlsCAFile=ca)

# Access the database
db = client[database_name]

# Access the collection where you want to insert the document
collection = db["Project1"]

# Create a new document to insert
new_document = {"Name": "P1", "ID": "as1234", "Description": "This is the first project"}

# Insert the document into the collection
result = collection.insert_one(new_document)

# Print the ID of the inserted document
print("Inserted document ID:", result.inserted_id)
