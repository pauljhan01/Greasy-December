from flask import Flask, jsonify
import pymongo
import mongodb_helper_functions
import hashlib
import json
import random

app = Flask(__name__)
clientString = "mongodb+srv://stephendov:1234December@cluster0.imzhodm.mongodb.net/?retryWrites=true&w=majority"

@app.route('/')
def index():
    return 'Index Page'

#------ Users_db functions ------------------------------------------------------------------

#createUser(userName, password): Creates New user document in Users_db
#   Inputs: <userName> -> string for user name
#           <password> -> string for user password
#   Outputs: String -> 'Success" or 'Fail'
@app.route('/Users_db/createUser/<userName>/<password>')
def createUser(userName, password):
    client = pymongo.MongoClient(clientString)
    Users_db = client["Users_db"]
    Users_collection = Users_db.get_collection("Users_collection");

    Users_Document = Users_collection.find_one({"userID": str(userName)})
    #user already exists
    if Users_Document != None:
        client.close()
        return jsonify('Fail')

    encryptedPassword = hashlib.sha256(password.encode())
    Users_collection.insert_one({
        "userID": userName,
        "userPassword": encryptedPassword.hexdigest(),
    })

    client.close()
    return jsonify('Success')

#login(fields): Validate User login in Users_db
#   Inputs: <userName> -> string for user name
#           <password> -> string for user password
#   Outputs: String -> 'Success' or 'Fail'
@app.route('/login/<userName>/<password>')
def login(userName, password):
    client = pymongo.MongoClient(clientString)
    Users_db = client["Users_db"]
    Users_collection = Users_db.get_collection("Users_collection");
    Users_Document = Users_collection.find_one({"userID": str(userName)})
    databasePassword = Users_Document.get("userPassword")

    encryptedInputPassword = hashlib.sha256(password.encode())

    client.close()
    if Users_Document == None:
        return jsonify('False')
    if userName == Users_Document.get("userID") and encryptedInputPassword.hexdigest() == databasePassword:
        return jsonify('True')
    else:
        return jsonify('False')


#------ Projects_db functions --------------------------------------------------------------------------------------------------------

#projects(): Gets Dictionary of all Projects in the database
#   Inputs: None
#   Outputs: Dictionary(Map) -> Key: Project ID, Value: [name, Description, ]
#TODO: adjust to generate ID as a number
@app.route('/projects')
def projects():
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_iterator = Projects_collection.find()

    Projects_dict = {}
    for document in Projects_iterator:
        temp_Name = document.get('Name')
        temp_ID = document.get('ID')
        temp_Description = document.get('Description')
        temp_checkedOut = document.get('CheckedOut')
        Projects_dict[temp_ID] = [temp_Name, temp_Description, temp_checkedOut]

    client.close()
    return Projects_dict

#createProject(fields): Creates New project docuemnt in Projects_db
#   Inputs: <projectName> -> String: name of project
#           <projectDescription> -> String: Description of project
#   Outputs: String -> 'Success" or 'Fail'
#TODO: adjust to generate ID as a number
@app.route('/projects/createProject/<projectName>/<projectDescription>')
def createProject(projectName, projectDescription):
    minID = 1000
    maxID = 9999
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    #check if out of ID's
    projectIterator = Projects_collection.find()
    projectCount = 0
    for docs in projectIterator:
        projectCount += 1

    if projectCount >= maxID - minID + 1:
        return 'full'

    #check if project already exists
    Project_Document = Projects_collection.find_one({"Name": str(projectName)})
    if Project_Document != None:
        return jsonify('Fail')

    Project_ID = random.randint(minID, maxID)
    while Projects_collection.find_one({"ID": int(Project_ID)}) != None:
        Project_ID = random.randint(minID, maxID)

    Projects_collection.insert_one({
        "Name": projectName,
        "ID": Project_ID,
        "Description": projectDescription,
        "CheckedOut": {}
    })


    client.close()
    return jsonify('Success')

@app.route('/projects/getByID/<projectID>')
def projects_getByID(projectID):
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": projectID})

    client.close()
    if Projects_Document == None:
        return jsonify('Fail')

    return jsonify('Success')


@app.route('/projects/getByName/<projectName>')
def projects_getByName(projectName):
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"Name": projectName})

    client.close()
    if Projects_Document == None:
        return jsonify('Fail')

    return jsonify('Success')

#------ HW_db functions --------------------------------------------------------------------------------------------------------

#checkIn(): checks in HW back into its HWSet
#   Input: <IDHWSet> -> String: ID of HWSet
#          <IDProject> -> String: ID of Project
#          <quantity> -> Int: HW to be checked out
#   Output:  String -> 'Success' or 'Fail'
@app.route('/HWSets/checkIn/<IDHWSet>/<IDProject>/<quantity>')
def HWSets_checkIn(IDHWSet, IDProject, quantity):
    #TODO
    quantity = int(quantity)
    client = pymongo.MongoClient(clientString)

    # get project
    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": int(IDProject)})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    # get checkedout map
    Projects_checkedOut = dict(Projects_Document.get("CheckedOut"))

    # if quantity <= IDHWSet/quantity
    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
    HW_Document = HW_collection.find_one({"ID": IDHWSet})

    if HW_Document == None:
        client.close()
        return jsonify('Fail')

    #if map(IDHWSet, qty) -> qty >= quantity
    HW_avail = HW_Document.get("Availability")
    qtyCheckedOut = Projects_checkedOut.get(IDHWSet)
    if qtyCheckedOut >= quantity:
        HW_collection.update_one({"ID": IDHWSet},
                                 {"$set": {"Availability": int(HW_avail) + quantity}})

        if Projects_checkedOut.get(IDHWSet) == None:
            Projects_checkedOut[IDHWSet] = quantity
        else:
            Projects_checkedOut[IDHWSet] -= quantity

        Projects_collection.update_one({"ID": int(IDProject)},
                                 {"$set": { "CheckedOut": Projects_checkedOut}})
        #then they can check in
        #update checkedout map for IDHWSet
    #else
    else:
        client.close()
        return jsonify("Fail")
        #do they check in up to how much they have checked out?
        #what gets returned


    client.close()
    return jsonify("checked in")

#checkOut(): checks out HW from a HWSet
#   Input: <IDHWSet> -> String: ID of HWSet
#          <IDProject> -> String: ID of Project
#          <quantity> -> Int: HW to be checked out
#   Output:  String -> 'Success' or 'Fail'
@app.route('/HWSets/checkOut/<IDHWSet>/<IDProject>/<quantity>')
def HWSets_checkOut(IDHWSet, IDProject, quantity):
    #TODO
    quantity = int(quantity)
    client = pymongo.MongoClient(clientString)

    # get project
    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": int(IDProject)})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    # get checkedout map
    Projects_checkedOut = dict(Projects_Document.get("CheckedOut"))

    # if quantity <= IDHWSet/quantity
    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
    HW_Document = HW_collection.find_one({"ID": IDHWSet})

    if HW_Document == None:
        client.close()
        return jsonify('Fail')

    HW_avail = HW_Document.get("Availability")
    if int(HW_avail) >= quantity:
        HW_collection.update_one({"ID": IDHWSet},
                                 {"$set": { "Availability": int(HW_avail) - quantity}})

        if Projects_checkedOut.get(IDHWSet) == None:
            Projects_checkedOut[IDHWSet] = quantity
        else:
            Projects_checkedOut[IDHWSet] += quantity

        Projects_collection.update_one({"ID": int(IDProject)},
                                 {"$set": { "CheckedOut": Projects_checkedOut}})

        # then they can check out
        # update checkedout map for IDHWSet
    # else
    else:
        client.close()
        return jsonify("Failed to check out")
    # do they check out up to max?
    # what gets returned
    client.close()
    return jsonify("checked out ")

#HWSets_getOne()
#   Input: <IDHWSet> -> String: ID of Hardware set
#   Output: Dictionary(Map) -> Key: Project ID, Value: [name, Description]
#           Note: the dictionary will be one entry long
@app.route('/HWSets/getOne/<IDHWSet>')
def HWSets_getOne(IDHWSet):
    #TODO
    client = pymongo.MongoClient(clientString)

    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
    HW_doc = HW_collection.find_one({"ID": IDHWSet})

    HW_dict = {}
    temp_ID = HW_doc.get('ID')
    temp_Capacity = HW_doc.get('Capacity')
    temp_Availability = HW_doc.get('Availability')
    HW_dict[temp_ID] = [temp_Capacity, temp_Availability]

    client.close()
    return HW_dict


#Get information about all the HWSets
@app.route('/HWSets')
def HWSets():
    client = pymongo.MongoClient(clientString)

    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
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