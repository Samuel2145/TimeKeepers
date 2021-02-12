# Author: Will Pascuzzi

#shifts are the blocks that make up a schedule
class Shift:
    def __init__(self, employeeID, shiftStart, shiftEnd):
        self.employeeID = employeeID #this represents who the shift belongs to
        self.shiftStart = shiftStart
        self.shiftEnd = shiftEnd
        #may need to create a "day" property. May not if each day is discrete.        

# This represents a given schedule's state. 
class Schedule:
    def __init__(self):
        self.schedule = {
            'MONDAY': [],
            'TUESDAY' : [],
            'WEDNESDAY' : [], 
            'THURSDAY' : [], 
            'FRIDAY' : [], 
            'SATURDAY' : [], 
            'SUNDAY' : [],
        } # A dict containing lists of shifts

    def insertShift(self, shift, day):
        self.schedule[day].append(shift)

        #TODO: a dict containing a list of EMPTY times. This will be helpful for determining whether a schedule has had all its time slots filled
        #more properies such as "isFilled" and "totalHours" may need to be added.