import itertools
from collections import OrderedDict
from prettytable import PrettyTable
# Author: Will Pascuzzi



# This represents a given schedule's state. 
class Schedule:
    def __init__(self, employees, constraints):
        # A dict of employee numbers mapped to employees who may be placed into the schedule
        self.roster = OrderedDict(employees) #TODO: remove employees from the roster when their maximum hours are spent
        #A dict of employee numbers mapped to any shifts they currently have in the schedule.
        self.employeeShifts = OrderedDict({ID : [] for ID in employees})
        self.hours = 0
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
        # each hour is mapped to how many employees must work at that time. Default is each hour requires 1 employee
        # this may eventually be modified further to account for employees with different skillsets
        self.unfilled = {
            'MONDAY': OrderedDict(hour : 1 for hour in range(constraints.schedStart, constraints.schedEnd)),
            'TUESDAY' : OrderedDict(rhour : 1 for hour in range(constraints.schedStart, constraints.schedEnd)),
            'WEDNESDAY' : OrderedDict(hour : 1 for hour in range(constraints.schedStart, constraints.schedEnd),
            'THURSDAY' : OrderedDict(hour : 1 for hour in range(constraints.schedStart, constraints.schedEnd),
            'FRIDAY' : OrderedDict(hour : 1 for hour in range(constraints.schedStart, constraints.schedEnd)),
            'SATURDAY' : OrderedDict(hour : 1 for hour in range(constraints.schedStart, constraints.schedEnd),
            'SUNDAY' : OrderedDict(hour : 1 for hour in range(constraints.schedStart, constraints.schedEnd),
        }
        self.score = 0 #the schedule's current score. This will be set by running it through a scoring algorithm


    def insertShift(self, shift, day):

        self.schedule[day].append(shift)
         # places tuples of shift start time and shift end time into the employee shift dict
        self.employeeShifts[shift.employeeID].append((shift.shiftStart,shift.shiftEnd))
        
        self.hours += shift.shiftLength
        #remove unfilled spots from set within the new state
        for i in range(shift.shiftStart, shift.shiftEnd):
            self.unfilled[day][i] -= 1
            if self.unfilled[day][i] == 0:
                del self.unfilled[day][i]
                    
       

    def displaySchedule(self):       
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

