
class Project:

    def __init__(self, project_id, name, user_id):
        self._name = name
        self._associatedUser = user_id
        self._projectID = project_id
        self._numOfUnits = 0

    def getName(self):
        return self._name

    def getAssociatedUser(self):
        return self._associatedUser

    def getProjectID(self):
        return self._projectID

    def getNumOfUnits(self):
        return self._numOfUnits



