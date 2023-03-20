import pymongo
clientString = "mongodb+srv://stephendov:1234December@cluster0.imzhodm.mongodb.net/?retryWrites=true&w=majority"

def query_for_document_by_ID():

    client = pymongo.MongoClient(clientString)

    client.close()

    return