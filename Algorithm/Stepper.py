import Schedule
import Constraints
from Employee import Employee

# Author: Will Pascuzzi
# This will contain methods responsible for performing search steps. 
# These steps include attempting to place an employee in a possible location, and changing the schedule to better fit an new entity

#methods should return a list of schedule states found
#this set of states can be run through a scorer, which can return the most optimal state to choose


#creates a shift given a start time, length, and employeeID. May move this to Schedule.py.
def createShift(employeeID, length, start):
    if(start + length <= 48) #if this fits within a single day, return a single shift object
        return Shift(employeeID, start, start + length)
    else
        return (Shift(employeeID, start, 48), Shift(employeeID, 0, length - (48 - start)))

# This attempts to place a given entity in a given schedule state without moving other entities.
# returns a list of possible states to be run through the scorer
def tryToPlaceBasic(currentState, entity, constraints):
    possibleStates = []
    for day in currentState.schedule:
        for sLen in constraints.shiftSizes:
            for start in range(constraints.schedStart, constraints.schedEnd-sLen):
                possibleStates.append(currentState.insertShift(createShift(entity.ID,sLen,start)))) # add another potential state to the list

             

