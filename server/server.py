from flask import Flask, jsonify
import pymongo
import mongodb_helper_functions
import hashlib
import json

app = Flask(__name__)
clientString = "mongodb+srv://stephendov:1234December@cluster0.imzhodm.mongodb.net/?retryWrites=true&w=majority"

@app.route('/')
def index():
    return 'Index Page'

#------ Users_db functions ------------------------------------------------------------------

#createUser(fields): Creates New user document in Users_db
#   Inputs: <fields> -> string in the form of 'Username+Password'
#   Outputs: String -> 'Success" or 'Fail'
@app.route('/Users_db/createUser/<fields>')
def createUser(fields):
    fieldsList = fields.split('+')
    client = pymongo.MongoClient(clientString)
    Users_db = client["Users_db"]
    Users_collection = Users_db.get_collection("Users_collection");

    Users_Document = Users_collection.find_one({"userID": str(fieldsList[0])})
    #user already exists
    if Users_Document != None:
        client.close()
        return jsonify('Fail')

    encryptedPassword = hashlib.sha256(fieldsList[1].encode())
    Users_collection.insert_one({
        "userID": fieldsList[0],
        "userPassword": encryptedPassword.hexdigest(),
    })

    client.close()
    return jsonify('Success')

#login(fields): Validate User login in Users_db
#   Inputs: <fields> -> string in the form of 'Username+Password'
#   Outputs: String -> 'Success' or 'Fail'
@app.route('/login/<fields>')
def login(fields):
    fieldsList = fields.split('+')
    client = pymongo.MongoClient(clientString)
    Users_db = client["Users_db"]
    Users_collection = Users_db.get_collection("Users_collection");
    Users_Document = Users_collection.find_one({"userID": str(fieldsList[0])})
    databasePassword = Users_Document.get("userPassword")
    encryptedPassword = hashlib.sha256(databasePassword.encode())

    client.close()
    if Users_Document == None:
        return jsonify('False')
    if fieldsList[0] == Users_Document.get("userID") and fieldsList[1] == encryptedPassword.hexdigest():
        return jsonify('True')
    else:
        return jsonify('False')

#------ Projects_db functions --------------------------------------------------------------------------------------------------------

#projects(): Gets Dictionary of all Projects in the database
#   Inputs: None
#   Outputs: Dictionary(Map) -> Key: Project ID, Value: [name, Description]
#TODO: adjust to generate ID as a number
@app.route('/projects')
def projects():
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection");
    Projects_iterator = Projects_collection.find()

    Projects_dict = {}
    for document in Projects_iterator:
        temp_Name = document.get('Name')
        temp_ID = document.get('ID')
        temp_Description = document.get('Description')
        Projects_dict[temp_ID] = [temp_Name, temp_Description]

    client.close()
    return Projects_dict

#createProject(fields): Creates New project docuemnt in Projects_db
#   Inputs: <fields> -> string in the form of 'Name+Description'
#   Outputs: String -> 'Success" or 'Fail'
#TODO: adjust to generate ID as a number
@app.route('/projects/createProject/<fields>')
def createProject(fields):
    fieldsList = fields.split('+')

    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection");


    client.close()
    return


#------ HW_db functions --------------------------------------------------------------------------------------------------------

#checkIn(): checks in HW back into its HWSet
#   Input: <fields> -> 'ID(HWSet)+ID(Project)+quantity'
#   Output:  String -> 'Success' or 'Fail'
@app.route('/HWSets/checkIn/<fields>')
def HWSets_checkIn():
    #TODO
    return

#checkOut(): checks out HW from a HWSet
#   Input: <fields> -> 'ID(HWSet)+ID(Project)+quantity'
#   Output:  String -> 'Success' or 'Fail'
@app.route('/HWSets/checkOut/<fields>')
def HWSets_checkOut():
    #TODO
    return

#HWSets_getOne()
#   Input: <fields> -> 'ID(HWSet)'
#   Output: Dictionary(Map) -> Key: Project ID, Value: [name, Description]
#           Note: the dictionary will be one entry long
@app.route('/HWSets/getOne/<fields>')
def HWSets_getOne():
    #TODO
    return


#Get information about all the HWSets
@app.route('/HWSets')
def HWSets():
    client = pymongo.MongoClient(clientString)

    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection");
    HW_iterator = HW_collection.find()

    HW_dict = {}
    for document in HW_iterator:
        temp_ID = document.get('ID')
        temp_Capacity = document.get('Capacity')
        temp_Availability = document.get('Availability')
        HW_dict[temp_ID] = [temp_Capacity, temp_Availability]

    client.close()
    return HW_dict

if __name__ == "__main__":
    app.run(debug=True)