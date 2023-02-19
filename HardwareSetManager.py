
class HardwareSet:

    def __init__(self):
        # print(">>Hardware has been initialized.")
        self.__Capacity = 0
        self.__Availability = 0
        self.__TotalCheckedOut = 0
        self.__UnitsLost = 0

    # Initialize Capacity
    def initializeCapacity(self, qty):
        self.__Capacity = qty
        self.__Availability = self.__Capacity
        print("System: Capacity has been initialized to", self.__Capacity, ". There are", self.__Availability, "units "
                                                                                                               "available.")

    def updateCapacity(self, qty):
        if qty < self.__TotalCheckedOut:
            self.__UnitsLost = self.__TotalCheckedOut - qty
            self.__TotalCheckedOut -= self.__UnitsLost
        if qty < self.__Availability:
            self.__Availability = qty - self.__TotalCheckedOut
            self.__UnitsLost = self.__Capacity - qty
        else:
            self.__Availability += (qty - self.__Capacity)
            if self.__Availability < 0: self.__Availability = 0
            self.__UnitsLost = 0

        self.__Capacity = qty
        print("System: Capacity has been updated to", self.__Capacity, "where", self.__UnitsLost, "units where lost. "
                                                                                                  "There are",
              self.__Availability, "available units and",self.__TotalCheckedOut, "units are currently checked out")

    def getCapacity(self):
        return self.__Capacity

    def getAvailability(self):
        return self.__Availability

    def getCheckedoutQty(self):
        return self.__TotalCheckedOut

    def checkOut(self, qty):
        if qty > self.__Availability:
            print("System: There are not enough units available to check out", qty, "You have checked out",
                  self.__Availability)
            self.__TotalCheckedOut += self.__Availability
            print("System: Total units now checked out is", self.__TotalCheckedOut)
            self.__Availability = 0
            return -1
        else:
            self.__Availability -= qty
            self.__TotalCheckedOut += qty
            print("System: Total units now checked out is", self.__TotalCheckedOut, ". There are", self.__Availability,
                  "units available.")
            # print(">>", qty, "has been checked out.")
            return 0

    def checkIn(self, qty):
        # trying to check in more units than capacity
        if (self.__Availability + qty) > self.__Capacity:
            print("System: You are attempting to check in too many units. Units checked in:",
                  self.__Capacity - self.__Availability)
            self.__TotalCheckedOut = self.__Availability
            print("System: Remaining units checked out is", self.__TotalCheckedOut)
            self.__Availability = self.__Capacity
            return -1
        # Check-in qty units
        else:
            # print(">>Old availability is", self.__Availability)
            self.__Availability += qty
            self.__TotalCheckedOut -= qty
            print("System:", qty, "units checked in. Available units is now", self.__Availability,
                  "Remaining units checked out is", self.__TotalCheckedOut)
            return 0
