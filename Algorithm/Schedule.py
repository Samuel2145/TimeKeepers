import itertools
from collections import OrderedDict
from prettytable import PrettyTable
# Author: Will Pascuzzi



# This represents a given schedule's state. 
class Schedule:
    def __init__(self, employees, constraints):
        # employeeID: employeeObject
        self.roster = employees #TODO: remove employees from the roster when their maximum hours are spent
        #A dict of employee numbers mapped to any shifts they currently have in the schedule. Currently needed to calc hardscore
        self.employeeShifts = {
            'MONDAY': {ID: [] for ID in employees},
            'TUESDAY': {ID: [] for ID in employees},
            'WEDNESDAY': {ID: [] for ID in employees},
            'THURSDAY': {ID: [] for ID in employees},
            'FRIDAY': {ID: [] for ID in employees},
            'SATURDAY': {ID: [] for ID in employees},
            'SUNDAY': {ID: [] for ID in employees},
            }

        self.hours = 0
        self.schedStart = constraints.schedStart
        self.schedEnd = constraints.schedEnd
        self.schedule = OrderedDict({            
            'MONDAY': [],
            'TUESDAY' : [],
            'WEDNESDAY' : [], 
            'THURSDAY' : [], 
            'FRIDAY' : [], 
            'SATURDAY' : [], 
            'SUNDAY' : [],
        }) # A dict containing lists of shifts

        # a set of empty times. This ranges from the start of the schedule to the end
        # each hour is mapped to how many employees must work at that time.
        # this may eventually be modified further to account for employees with different skillsets
        #TODO: change this to a numpy array to allow elementwise operations
        self.unfilled = {
            'MONDAY': OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
            'TUESDAY' : OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
            'WEDNESDAY' : OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
            'THURSDAY' : OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
            'FRIDAY' : OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
            'SATURDAY' : OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
            'SUNDAY' : OrderedDict((hour, constraints.numSimultaneous) for hour in range(self.schedStart, self.schedEnd)),
        }
        self.score = 0 #the schedule's current score. This will be set by running it through a scoring algorithm

    #this method will change who is assigned to a shift
    def reassignShift(self, shift, employee):
        success = False   
        oldEmployee = None   
          
        if shift.employeeID != "EMPTY":
            oldEmployee = self.roster[shift.employeeID]
            # removes the shift tuple from the old employee's list
            for shiftTuple in self.employeeShifts[shift.day][shift.employeeID]:
                if shiftTuple == (shift.shiftStart, shift.shiftEnd):
                    success = True
                    oldEmployee.currentHours -= shift.shiftLength
                    oldEmployee.currentHoursDaily[shift.day] -= shift.shiftLength
                    self.employeeShifts[shift.day][shift.employeeID].remove(shiftTuple)
                    break
        else:
            success = True
            self.hours += shift.shiftLength

        #adds the shift tuple to the new employee's list
        self.employeeShifts[shift.day][employee.ID].append((shift.shiftStart,shift.shiftEnd))
        shift.employeeID = employee.ID
        employee.currentHours += shift.shiftLength
        employee.currentHoursDaily[shift.day] += shift.shiftLength
        return success, oldEmployee

    def insertShift(self, shift, day):
        """places tuples of shift start time and shift end time into the employee shift dict
           and decrement elements from unfilled set within the new state"""
        
        self.schedule[day].append(shift)

        if shift.employeeID != "EMPTY":
            # places tuples of shift start time and shift end time into the employee shift dict
            self.employeeShifts[shift.employeeID].append((shift.shiftStart,shift.shiftEnd))
            
            self.hours += shift.shiftLength
            #remove unfilled spots from set within the new state

#FIXME: doesn't seem to work
    def removeShift(self, shiftIndex, day):

        shift = self.schedule[day][shiftIndex]
        #find this shift in employeeShifts and remove it.        
        for index, item in enumerate(self.employeeShifts[shift.employeeID]):
            if item[0] == shift.shiftStart and item[1] == shift.shiftEnd:
                del self.employeeShifts[shift.employeeID][index]
                break
        
        self.hours -= shift.shiftLength
        for i in range(shift.shiftStart, shift.shiftEnd):
                self.unfilled[day][i] += 1
                    
       

    def displaySchedule(self):  


        print("Schedule start: ", self.schedStart)     
        print("Schedule end: ", self.schedEnd)     
        days = self.schedule.keys()
        items = self.schedule.values()
        longest = max(len(shifts) for shifts in items)
        table =   {          
            'MONDAY': [],
            'TUESDAY' : [],
            'WEDNESDAY' : [], 
            'THURSDAY' : [], 
            'FRIDAY' : [], 
            'SATURDAY' : [], 
            'SUNDAY' : [],
        }
        for x in range(longest):
            for day in days:                
                if(len(self.schedule[day]) > x):
                    shift = self.schedule[day][x]                   
                    shiftText = ('**********' +
                    '\nID: ' + str(shift.employeeID) +
                    '\nstart: ' + str(shift.shiftStart) +
                    '\nend: ' + str(shift.shiftEnd) +
                    '\n**********\n')    
                    table[day].append(shiftText)                
                else:
                    table[day].append('**********\n\n\n\n**********')
        pretty = PrettyTable()
        for key,val in iter(table.items()):
            pretty.add_column(key, sorted(val))
        print(pretty)

        #more properies such as "isFilled" and "totalHours" may need to be added.

