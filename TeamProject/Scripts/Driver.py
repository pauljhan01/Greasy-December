# Python library imports
import sys
import colorama

# Project import
import ProjectManager


# Driver mimics input from web page / front end
# Replace with front end implementation

def addNewProject():
    print("System: Adding a new project")
    # call to project manager with details

def updateProject(project_id):
    print("System: Updating project with project id", project_id)
    # call to project manager with details

def checkOutHardware():
    print("System: Checking out hardware")
    # call to project manager with details

def checkInHardware():
    print("System: Checking in hardware")
    # call to project manager with details

def addNewUser():
    userID = input("Please enter your user id: ")
    userPass = input("Please enter your password: ")
    # call to project manager with data to create new user
    print("System: Creating userID and encrypting userPass")

def userLogin():
    userID = input("Please enter your user id: ")
    userPass = input("Please enter your password: ")
    # call to project manager with data to verify user credentials
    print("System: Logging in user: ", userID)



# replace with input from front-end
def processRequests():

    active = True

    print(colorama.Fore.LIGHTMAGENTA_EX + "\nHello, welcome to Project Manager!\n*********************************" + colorama.Style.RESET_ALL)

    while active:
        userInput = input(colorama.Fore.LIGHTMAGENTA_EX + "\nCOMMANDS:\nAdd a new user:\t\t'newUser'\nLog in:\t\t\t\t'login'\nAdd a new project:\t'newProj'\nCheckOut Hardware:\t'checkout'\nCheckIn Hardware:\t'checkin'\nTo close:\t\t\t'exit'\n-------------\n" + colorama.Style.RESET_ALL + "Enter your command: ")

        if "newProj" in userInput:
            addNewProject()
        elif "newUser" in userInput:
            addNewUser()
        elif "login" in userInput:
            userLogin()
        elif "checkout" in userInput:
            checkOutHardware()
        elif "checkin" in userInput:
            checkInHardware()
        elif "exit" in userInput:
            active = False

    sys.exit()


processRequests()
