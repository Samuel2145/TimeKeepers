import itertools
from collections import OrderedDict
from prettytable import PrettyTable
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
        if((start + length) <= 48): # if this fits within a single day, return a single shift object
            return Shift(employeeID, start, start + length)
        else:
            return (Shift(employeeID, start, 48), Shift(employeeID, 0, length - (48 - start)))  

# This represents a given schedule's state. 
class Schedule:
    def __init__(self, employees, constraints):
        # A dict of employee numbers mapped to employees who may be placed into the schedule
        self.roster = OrderedDict(employees)
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
        #TODO: make this multidimensional; Certain times may require multiple employees
        self.unfilled = OrderedDict({
            'MONDAY': set(range(constraints.schedStart, constraints.schedEnd)),
            'TUESDAY' : set(range(constraints.schedStart, constraints.schedEnd)),
            'WEDNESDAY' : set(range(constraints.schedStart, constraints.schedEnd)),
            'THURSDAY' : set(range(constraints.schedStart, constraints.schedEnd)),
            'FRIDAY' : set(range(constraints.schedStart, constraints.schedEnd)),
            'SATURDAY' : set(range(constraints.schedStart, constraints.schedEnd)),
            'SUNDAY' : set(range(constraints.schedStart, constraints.schedEnd)),
        })
        self.score = 0 #the schedule's current score. This will be set by running it through a scoring algorithm


    def insertShift(self, shift, day):

        self.schedule[day].append(shift)
         # places tuples of shift start time and shift end time into the employee shift dict
        self.employeeShifts[shift.employeeID].append((shift.shiftStart,shift.shiftEnd))
        
        self.hours += shift.shiftEnd - shift.shiftStart

        #remove unfilled spots from set within the new state
        for i in range(shift.shiftStart, shift.shiftEnd):
            self.unfilled[day].discard(i) 
                    
       

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

