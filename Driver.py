import sys

import EncryptData
import PostUserData
import ProjectManager
import colorama


def addNewProject(project_manager):
    project_name = input("Enter the name of your new project: ")
    user_id = input("What is your name? ")

    project_manager.addProject(project_name, user_id)
    # print("Project Name is", project_name, "and user ID is", user_id)


def checkOutHardware(project_manager):
    num_of_units = input("\nEnter number of units: ")
    project_id = int(input("Enter Project ID: "))

    project_manager.checkOutHardware(project_id, num_of_units)


def checkInHardware(project_manager):
    num_of_units = input("\nEnter number of units: ")
    project_id = int(input("Enter Project ID: "))

    project_manager.checkInHardware(project_id, num_of_units)


def processRequests():
    active = True
    new_project_manager = ProjectManager.ProjectManager()

    print(
        colorama.Fore.LIGHTMAGENTA_EX + "\nHello, welcome to Project Manager!\n*********************************" + colorama.Style.RESET_ALL)

    while active:
        user_input = input(
            colorama.Fore.LIGHTMAGENTA_EX + "\nCOMMANDS:\nAdd a new project:\t'new'\nCheckOut "
                                            "Hardware:\t'checkout'\nCheckIn Hardware:\t'checkin'\nTo "
                                            "close:\t\t\t'exit'\n-------------\n" + colorama.Style.RESET_ALL + "Enter "
                                                                                                               "your "
                                                                                                               "command: ")

        if "new" in user_input:
            addNewProject(new_project_manager)
        elif "checkout" in user_input:
            checkOutHardware(new_project_manager)
        elif "checkin" in user_input:
            checkInHardware(new_project_manager)
        elif "exit" in user_input:
            active = False

    sys.exit()


def main():
    # Read User Data (Will come from Web Page)
    with open('users.txt', 'r') as userInput:
        # print("File open")
        for line in userInput:
            input_text = line.strip()
            input_array = input_text.split(' ')
            # print(input_array)

            new_user_id = input_array[0]
            new_user_passwd = EncryptData.encrypt(input_array[1])

            print(colorama.Fore.BLUE + "New User ID:", new_user_id, "\nPassword is:", new_user_passwd,
                  "\n" + colorama.Style.RESET_ALL)
            # print("New User is", new_user_id, DecryptData.decrypt(new_user_passwd))

            PostUserData.postData(input_array[0], input_array[1], new_user_id, new_user_passwd)

    processRequests()


main()
