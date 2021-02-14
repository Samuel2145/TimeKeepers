import Roster
# Author: Will Pascuzzi

#shifts are the blocks that make up a schedule
class Shift:
    def __init__(self, employeeID, shiftStart, shiftEnd):
        self.employeeID = employeeID # this represents who the shift belongs to
        self.shiftStart = shiftStart
        self.shiftEnd = shiftEnd
        # may need to create a "day" property. May not if each day is discrete.      
         
        # creates a shift given a start time, length, and employeeID. May move this to Schedule.py
        def createShift(employeeID, length, start):
            if(start + length <= 48) #if this fits within a single day, return a single shift object
                return Shift(employeeID, start, start + length)
            else
                return (Shift(employeeID, start, 48), Shift(employeeID, 0, length - (48 - start)))  

# This represents a given schedule's state. 
class Schedule:
    def __init__(self, employees, constraints):
        self.roster = Roster(employees) # this is a map of employee numbers to employees which are intended to be placed into the schedule
        self.placed = {} #this is a set of employee numbers that have already been placed into the schedule
        self.schedule = {            
            'MONDAY': [],
            'TUESDAY' : [],
            'WEDNESDAY' : [], 
            'THURSDAY' : [], 
            'FRIDAY' : [], 
            'SATURDAY' : [], 
            'SUNDAY' : [],
        } # A dict containing lists of shifts
        self.unfilled = set(range(constraints.schedStart, constraints.schedEnd))# a set of empty times. This ranges from the start of the schedule to the end
        self.score = 0 #the schedule's current score. This will be set by running it through a scoring algorithm


    def insertShift(self, shift, day):
        self.schedule[day].append(shift)

        #more properies such as "isFilled" and "totalHours" may need to be added.