import numpy as np
 # Author: Will Pascuzzi
 # This class serves as a template for employee objects which are the planning entity used for the scheduling algorithm.
 # Each employee object will be filled with data from the MariaDB database.
 
class Employee:

    def __init__(self, ID):
        self.ID = ID
        self.avails = { 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([]), 
            'SUNDAY' : np.array([]),
            } # a 3d array representing when the user is available
        #each of these will contain an array of pairs
       #each pair represents a block of time the employee is available for. time starts from 0 (12:00AM ) and ends at 48 (11:59PM), incrementing in 30 minute blocks
       self.currentHours = 0
    
    @property
    def ID(self):
        return self.__ID

    @ID.setter
    def ID(self, ID):
        self.__ID = ID

    @property
    def avails(self):
        return self.__avails

  #TODO: implement a way to ensure time blocks do not intersect. May need to go beyond pairs and make availability blocks into actual objects
    @avails.setter
    def avails(self, avails):
        self.__avails = avails.

    @property
    def currentHours(self):
        return self.__currentHours

    @currentHours.setter
    def ID(self, currentHours):
        self.__currentHours = currentHours
  