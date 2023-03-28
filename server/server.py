from flask import Flask, jsonify
import pymongo
import mongodb_helper_functions
import hashlib
import json

app = Flask(__name__)


# clientString = "mongodb+srv://stephendov:1234December@cluster0.imzhodm.mongodb.net/?retryWrites=true&w=majority"

@app.route('/')
def index():
    return 'Index Page'


@app.route('/login/<fields>')
def login(fields):
    encrypted = hashlib.sha256(fields.encode())
    # return json.dumps("this is from the server")
    string = "welcome %s" % encrypted.hexdigest()
    print(string)
    # return string
    return jsonify(string)


# Temporary Create Project
@app.route('/createProject/<string:name>*<string:description>')
def create_project(name, description):
    return jsonify('success')


# Gets List of all Projects in the database
@app.route('/projects')
def projects():
    # TODO
    return {"projects": ["Project1", "Project2", "Project3"], "test": ["test1", "test2", "test3"]}  # for testing


# Temporary join project
@app.route('/joinProject/<int:id>')
def join_project(id):
    return jsonify('success')


# Get information about all the HWSets
# @app.route('/HWSets')
# def show_HWSet_Information():
# client = pymongo.MongoClient(clientString)
#
# HW_db = client["HW_db"]
# HW_collection = HW_db.get_collection("HW_collection");
# HW_iterator = HW_collection.find()
#
# HW_dict = {}
# for document in HW_iterator:
#     temp_ID = document.get('ID')
#     temp_Capacity = document.get('Capacity')
#     temp_Availability = document.get('Availability')
#     HW_dict[temp_ID] = [temp_Capacity, temp_Availability]
#
# client.close()
# return HW_dict

if __name__ == "__main__":
    app.run(debug=True)
