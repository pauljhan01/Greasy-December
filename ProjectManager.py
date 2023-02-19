import colorama
import Project


class ProjectManager:

    def __init__(self):
        self.__projects = {}
        self.__nextAvailProjID = 0
        colorama.init()

    def addProject(self, name, user_id):
        project_id = self.__nextAvailProjID
        new_project = Project.Project(project_id, name, user_id)

        # Add project to dictionary
        self.__projects[project_id] = new_project
        print(self.__projects)

        # Set new available project ID
        self.__nextAvailProjID += 1

        print(colorama.Fore.BLUE + "\nSystem Success: Added", new_project.getName(), ". You Project ID is ",
              new_project.getProjectID(), colorama.Style.RESET_ALL)

    def checkOutHardware(self, project_id, num_of_units):
        if project_id in self.__projects:
            project = self.__projects.get(project_id)
            print(colorama.Fore.BLUE + "System Success: You are checking out", num_of_units, "units for",
                  project.getName(), colorama.Style.RESET_ALL)
        else:
            print(colorama.Fore.RED + "System Error: There is no project with Project ID", project_id,
                  colorama.Style.RESET_ALL)

    def checkInHardware(self, project_id, num_of_units):
        if project_id in self.__projects:
            project = self.__projects.get(project_id)
            print(colorama.Fore.BLUE + "System Success: You are checking in", num_of_units, "units for",
                  project.getName(), colorama.Style.RESET_ALL)
        else:
            print(colorama.Fore.RED + "System Error: There is no project with Project ID", project_id,
                  colorama.Style.RESET_ALL)

    def getAvailability(self):
        print(colorama.Fore.BLUE + "System Success: There are probably units available" + colorama.Style.RESET_ALL)
