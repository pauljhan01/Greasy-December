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

    encryptedUserName = hashlib.sha256(userName.encode())
    encryptedPassword = hashlib.sha256(password.encode())
    Users_collection.insert_one({
        "userID": encryptedUserName.hexdigest(),
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
    encryptedInputUsername = hashlib.sha256(userName.encode())
    Users_Document = Users_collection.find_one({"userID": encryptedInputUsername.hexdigest()})

    if Users_Document == None:
        client.close()
        return jsonify('Fail')

    databasePassword = Users_Document.get("userPassword")


    encryptedInputPassword = hashlib.sha256(password.encode())

    client.close()
    if encryptedInputUsername.hexdigest() == Users_Document.get("userID") and encryptedInputPassword.hexdigest() == databasePassword:
        return jsonify('Success')
    else:
        return jsonify('Fail')


#------ Projects_db functions --------------------------------------------------------------------------------------------------------

#projects(): Gets Dictionary of all Projects in the database
#   Inputs: None
#   Outputs: Dictionary(Map) -> Key: Project ID, Value: [name, Description, CheckedOut]
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

# createProject(projectName, projectDescription): Creates New project document in Projects_db
#   Inputs: <projectName> -> String: name of project
#           <projectDescription> -> String: Description of project
#   Outputs: String -> 'Success" or 'Fail'
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
        return jsonify('Fail')

    #check if project already exists
    Project_Document = Projects_collection.find_one({"Name": str(projectName)})
    if Project_Document != None:
        return jsonify('Fail')

    Project_ID = random.randint(minID, maxID)
    while Projects_collection.find_one({"ID": Project_ID}) != None:
        Project_ID = random.randint(minID, maxID)

    Projects_collection.insert_one({
        "Name": projectName,
        "ID": str(Project_ID),
        "Description": projectDescription,
        "CheckedOut": {},
        "ApprovedUsers": []
    })


    client.close()
    return jsonify('Success')

# createProjectWithID(projectName, projectDescription, projectID): Creates New project document in Projects_db
#   Inputs: <projectName> -> String: name of project
#           <projectDescription> -> String: Description of project
#           <projectID> -> String: Project ID
#   Outputs: String -> 'Success" or 'Fail'
@app.route('/projects/createProject/<projectName>/<projectDescription>/<projectID>')
def createProjectWithID(projectName, projectDescription, projectID):
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    #check if out of ID's
    projectIterator = Projects_collection.find()
    projectCount = 0
    for docs in projectIterator:
        projectCount += 1

    #check if project already exists
    Project_Document = Projects_collection.find_one({"Name": str(projectName)})
    if Project_Document != None:
        return jsonify('Fail')

    Project_Document = Projects_collection.find_one({"ID": str(projectID)})
    if Project_Document != None:
        return jsonify('Fail')

    Projects_collection.insert_one({
        "Name": projectName,
        "ID": projectID,
        "Description": projectDescription,
        "CheckedOut": {},
        "ApprovedUsers": []
    })

    client.close()
    return jsonify('Success')

#projects_getByID(projectID): Get one project by ID
#   Inputs: <projectName> -> String: name of project
#   Output: Dictionary(Map) -> Key: HWSet ID, Value: [Capacity, Availability]
#               Note: the dictionary will be one entry long
#           String: "Fail" if no HWSet is found
@app.route('/projects/getByID/<projectID>')
def projects_getByID(projectID):
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": projectID})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    Project_dict = {}
    temp_ID = Projects_Document.get('ID')
    temp_Name = Projects_Document.get('Name')
    temp_Description = Projects_Document.get('Description')
    temp_CheckedOut = Projects_Document.get('CheckedOut')
    Project_dict[temp_ID] = [temp_Name, temp_Description, temp_CheckedOut]

    client.close()
    return Project_dict

#projects_getByIDV2(projectID): Get one project by ID
#   Inputs: <projectName> -> String: name of project
#   Output: String -> temp_ID + '+' + temp_Name
#           String: "Fail" if no HWSet is found
@app.route('/projects/getByIDV2/<projectID>')
def projects_getByIDV2(projectID):
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": projectID})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    Project_dict = {}
    temp_ID = Projects_Document.get('ID')
    temp_Name = Projects_Document.get('Name')
    temp_Description = Projects_Document.get('Description')
    temp_CheckedOut = Projects_Document.get('CheckedOut')
    Project_dict[temp_ID] = [temp_Name, temp_Description, temp_CheckedOut]

    client.close()
    return jsonify(temp_ID + '+' + temp_Name)

# HWSets_getOne(): Get information about one hardware set
#   Input: <IDHWSet> -> String: ID of Hardware set
#   Output: Dictionary(Map) -> Key: HWSet ID, Value: [Capacity, Availability]
#               Note: the dictionary will be one entry long
#           String: "Fail" if no HWSet is found
@app.route('/projects/getByName/<projectName>')
def projects_getByName(projectName):
    client = pymongo.MongoClient(clientString)

    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"Name": projectName})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    Project_dict = {}
    temp_ID = Projects_Document.get('ID')
    temp_Name = Projects_Document.get('Name')
    temp_Description = Projects_Document.get('Description')
    temp_CheckedOut = Projects_Document.get('CheckedOut')
    Project_dict[temp_ID] = [temp_Name, temp_Description, temp_CheckedOut]

    client.close()
    return Project_dict


#projects_joinByID(projectID, userName): Get one project by ID
#   Inputs: <projectName> -> String: name of project
#           <userName> -> String: name of user joining project
#   Output:  String: "Fail" if no project is found
#                    "Success" if project exists
@app.route('/projects/joinByID/<projectID>/<userName>')
def projects_joinByID(projectID, userName):
    client = pymongo.MongoClient(clientString)
    encryptedInputUsername = hashlib.sha256(userName.encode())
    encryptedInputUsername = encryptedInputUsername.hexdigest()
    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": projectID})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    Projects_Document_ApprovedList = list(Projects_Document.get("ApprovedUsers"))
    if Projects_Document_ApprovedList.count(encryptedInputUsername) == 0:
        Projects_Document_ApprovedList.append(encryptedInputUsername)
        Projects_collection.update_one({"ID": projectID},
                                 {"$set": { "ApprovedUsers": Projects_Document_ApprovedList}})


    client.close()
    return jsonify("Success")

#projects_leaveByID(projectID, userName): Get one project by ID
#   Inputs: <projectName> -> String: name of project
#           <userName> -> String: name of user leaving project
#   Output:  String: "Fail"
#                    "Success"
@app.route('/projects/leaveByID/<projectID>/<userName>')
def projects_leaveByID(projectID, userName):
    client = pymongo.MongoClient(clientString)
    encryptedInputUsername = hashlib.sha256(userName.encode())
    encryptedInputUsername = encryptedInputUsername.hexdigest()
    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": projectID})

    if Projects_Document == None:
        client.close()
        return jsonify('Fail')

    Projects_Document_ApprovedList = list(Projects_Document.get("ApprovedUsers"))
    if Projects_Document_ApprovedList.count(encryptedInputUsername) > 0:
        Projects_Document_ApprovedList.remove(encryptedInputUsername)
        Projects_collection.update_one({"ID": projectID},
                                 {"$set": {"ApprovedUsers": Projects_Document_ApprovedList}})


    client.close()
    return jsonify("Success")

#------ HW_db functions --------------------------------------------------------------------------------------------------------

# checkIn(): checks in HW back into its HWSet
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
    Projects_Document = Projects_collection.find_one({"ID": IDProject})

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

    if qtyCheckedOut == None:
        client.close()
        return jsonify("Fail")

    if qtyCheckedOut >= quantity:
        HW_collection.update_one({"ID": IDHWSet},
                                 {"$set": {"Availability": int(HW_avail) + quantity}})

        if Projects_checkedOut.get(IDHWSet) == None:
            Projects_checkedOut[IDHWSet] = quantity
        else:
            Projects_checkedOut[IDHWSet] -= quantity

        Projects_collection.update_one({"ID": IDProject},
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
    return jsonify("Success")

# checkOut(): checks out HW from a HWSet
#   Input: <IDHWSet> -> String: ID of HWSet
#          <IDProject> -> String: ID of Project
#          <quantity> -> Int: HW to be checked out
#   Output:  String -> 'Success' or 'Fail'
@app.route('/HWSets/checkOut/<IDHWSet>/<IDProject>/<quantity>')
def HWSets_checkOut(IDHWSet, IDProject, quantity):
    quantity = int(quantity)
    client = pymongo.MongoClient(clientString)

    # get project
    Projects_db = client["Projects_db"]
    Projects_collection = Projects_db.get_collection("Projects_collection")
    Projects_Document = Projects_collection.find_one({"ID": IDProject})

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

        Projects_collection.update_one({"ID": IDProject},
                                 {"$set": { "CheckedOut": Projects_checkedOut}})

        # then they can check out
        # update checkedout map for IDHWSet
    # else
    else:
        client.close()
        return jsonify("Fail")
    # do they check out up to max?
    # what gets returned
    client.close()
    return jsonify("Success")

# HWSets_getOne(): Get information about one hardware set
#   Input: <IDHWSet> -> String: ID of Hardware set
#   Output: Dictionary(Map) -> Key: HWSet ID, Value: [Capacity, Availability]
#               Note: the dictionary will be one entry long
#           String: "Fail" if no HWSet is found
@app.route('/HWSets/getOne/<IDHWSet>')
def HWSets_getOne(IDHWSet):
    #TODO
    client = pymongo.MongoClient(clientString)

    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
    HW_doc = HW_collection.find_one({"ID": IDHWSet})

    if HW_doc == None:
        client.close()
        return jsonify('Fail')

    HW_dict = {}
    temp_ID = HW_doc.get('ID')
    temp_Capacity = HW_doc.get('Capacity')
    temp_Availability = HW_doc.get('Availability')
    HW_dict[temp_ID] = [temp_Capacity, temp_Availability]

    client.close()
    return HW_dict


#HWSets(): Get information about all the HWSets
#   Input: none
#   Output: Dictionary(Map) -> Key: HWSet ID, Value: [Capacity, Availability]
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

#HWSets(): Get information about all the HWSets
#   Input: none
#   Output: Dictionary(Map) -> Key: hardware set count, Value: [HWSet IDCapacity, Availability]
@app.route('/HWSetsV2')
def HWSetsV2():
    client = pymongo.MongoClient(clientString)

    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
    HW_iterator = HW_collection.find()

    HW_dict = {}
    HWSetCounter = 1
    for document in HW_iterator:
        temp_ID = document.get('ID')
        temp_Capacity = document.get('Capacity')
        temp_Availability = document.get('Availability')
        HW_dict["set" + str(HWSetCounter)] = [temp_ID, temp_Capacity, temp_Availability]
        HWSetCounter += 1

    client.close()
    return HW_dict

#HWSetsV3(): Get information about all the HWSets
#   Input: none
#   Output: String -> str(temp_ID) + '+' + str(temp_Capacity) + '+' + str(temp_Availability) + '+' ... str(temp_ID) + '+' + str(temp_Capacity) + '+' + str(temp_Availability) + '+'
@app.route('/HWSetsV3')
def HWSetsV3():
    client = pymongo.MongoClient(clientString)

    HW_db = client["HW_db"]
    HW_collection = HW_db.get_collection("HW_collection")
    HW_iterator = HW_collection.find()

    HW_string = ''
    for document in HW_iterator:
        temp_ID = document.get('ID')
        temp_Capacity = document.get('Capacity')
        temp_Availability = document.get('Availability')
        HW_string += str(temp_ID) + '+' + str(temp_Capacity) + '+' + str(temp_Availability) + '+'

    client.close()
    return jsonify(HW_string)

if __name__ == "__main__":
    app.run(debug=True)
