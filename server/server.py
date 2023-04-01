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


@app.route('/login/<string:username>/<string:password>')
def login(username, password):
    return jsonify('success')


class Project:
    def __init__(self):
        self.id = '1'
        self.name = ''
        self.description = ''
        self.hardwareSet1CheckedOut = '0'
        self.hardwareSet2CheckedOut = '0'


projectList = []


class ProjectEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Project):
            return {
                'name': obj.name,
                'description': obj.description,
                # add any other fields you want to serialize here
            }
        return super().default(obj)


# Temporary Create Project
@app.route('/createProject/<string:name>/<string:description>')
def create_project(name, description):
    newProject = Project()
    newProject.id = '1'
    newProject.name = name
    newProject.description = description
    newProject.hardwareSet1CheckedOut = '0'
    newProject.hardwareSet2CheckedOut = '0'
    projectList.append(newProject)
    json_response = json.dumps(projectList, cls=ProjectEncoder)
    return json_response, 200, {'Content-Type': 'application/json'}


# Gets List of all Projects in the database
@app.route('/projects/<string:username>')
def projects(username):
    json_response = json.dumps(projectList, cls=ProjectEncoder)
    return json_response, 200, {'Content-Type': 'application/json'}


# Temporary join project
# @app.route('/joinProject/<int:id>*<string:username>')
@app.route('/joinProject/<string:id>/<string:username>')
# def join_project(id, username):
def join_project(id, username):
    return jsonify('success')


@app.route('/leaveProject/<string:id>/<string:username>')
def leave_project(id, username):
    projectList.clear()
    json_response = json.dumps(projectList, cls=ProjectEncoder)
    return json_response, 200, {'Content-Type': 'application/json'}

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
