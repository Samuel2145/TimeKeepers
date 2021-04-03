import copy
from Shift import Shift
from Schedule import Schedule
import Constraints
from Employee import Employee

# Author: Will Pascuzzi
# This will contain methods responsible for generating moves. 
# These moves include attempting to place a shift in a possible location, and changing the schedule to better fit an new entity

# methods should return a list of schedule states found
# this set of states can be run through a scorer, which can return the most optimal state to choose


#this will fill a day with shifts according to the necessity of workers per hour
#Will be part of the construction heuristic that places shifts before they have employees traded in and out of them.
#this will find the first fit and return the day schedule corresponding to it.
def buildScheduleShape(schedule, constraints, day, nextSpot):
    # move down the time of the day and generate permutations using schedule sizes.
    # The first shift must start at the beginning of the workday and the last shift must end at the end of the workday
    # If there is a gap in the generated schedule it is rejected
    # If no valid schedule exists, return this information. The user must be notified that their shift sizes and workdays are not compatible.

    for size in constraints.shiftSizes:
        #if an invalid schedule would be created (shift goes past end)
        if nextSpot+size > constraints.schedEnd:
        #do not add a shift of this size
            continue 
        #NOTE: can probably just break, assuming the shift sizes are ordered

        newShift = (nextSpot, nextSpot+size)
        for i in range(newShift):
            #decrement unfilled slots in schedule
            schedule.unfilled[day][i] -= 1
            #if a spot goes negative, reject this schedule
            if schedule.unfilled[day][i] < 0:
                return schedule, False

        building = False
        #got to the end of the day and remained valid, start over at beginning of day to look for empty spots    
        if nextSpot+size == constraints.schedEnd: 
            #iterate through list of unfilled spots in the schedule
            for key, value in schedule.unfilled[day]:
                #first nonzero spot will be assigned as "nextSpot"
                if value > 0:
                    nextSpot = key
                    building = True
                    break  
        else:
            #should move nextSpot to the next nonzero unfilled spot
            for i in range(newShift[1],constraints.schedEnd):
                if schedule.unfilled[day][i] > 0:
                    nextSpot = schedule.unfilled[day][i]
                    building = True
                    break
            #start over at the beginning if no spot was found
            if building == False:
                for key, value in schedule.unfilled[day]:
                    #first nonzero spot will be assigned as "nextSpot"
                    if value > 0:
                        nextSpot = key
                        building = True
                        break  

        #BASE CASE: if there are no more nonzero spots, the day is finished. return the schedule
            if building == False:
                return schedule, True

        #add additional shift. upon return upward, if we receive true stop trying different paths
        if buildScheduleShape(copy.deepcopy(schedule), constraints, day, nextSpot)[1] == True:
            break
    return schedule


# This attempts to place a given entity in a given schedule state without moving other entities.
# returns a list of possible states to be run through the scorer
def tryToPlaceBasic(currentState : Schedule, constraints):
    possibleStates = []
    for employee in currentState.roster.values(): #TODO: remove employees from the roster when their maximum hours are spent
        for day in currentState.schedule:
            for sLen in constraints.shiftSizes:
                for start in currentState.unfilled[day]: #start times will only involved those that are unfilled
                    if start + sLen > constraints.schedEnd:
                        break
                    newShift = Shift.createShift(employee.ID, start, sLen, day)
                    # create a copy of the currentstate and add the newly generated shift.
                    # note: this probably will end up using a lot of memory. 
                    # Hopefully can find a way to only copy certain parts of the schedule
                    newState = copy.deepcopy(currentState)
                    newState.insertShift(newShift, day)                 
                    possibleStates.append(newState) # add another potential state to the list
    return possibleStates

#This method will change the start and end time of a shift within a particular day, sliding the shift up or down
def slideShift(currentState : Schedule, day, shiftIndex):
    possibleStates = [currentState]
    for start in range(currentState.schedStart, currentState.schedEnd): 
        
        shift = currentState.schedule[day][shiftIndex]
        end = start + shift.shiftLength
        if start == shift.shiftStart: #don't create an identical state
            continue
        if end > currentState.schedEnd: #don't create a state past the end of the schedule
            break

        #copy the state
        newState = copy.deepcopy(currentState)

        #change unfilled dict
        #if shift is being moved earlier in the day
        if(shift.shiftStart > start):
            for hour in range(start, shift.shiftStart):
                newState.unfilled[day][hour] -= 1 
            for hour in range(end, shift.shiftEnd):
                newState.unfilled[day][hour] += 1 
        #if shift is being moved later in the day
        else:
            for hour in range(shift.shiftStart, start):
                newState.unfilled[day][hour] += 1 
            for hour in range(shift.shiftEnd, end): 
                newState.unfilled[day][hour] -= 1 

        #change the employeeShifts tuple
        for index, item in enumerate(newState.employeeShifts[shift.employeeID]):
            if item[0] == shift.shiftStart and item[1] == shift.shiftEnd:
                newState.employeeShifts[shift.employeeID][index] = (start,end)

        #move the shift                 
        newState.schedule[day][shiftIndex].shiftStart = start
        newState.schedule[day][shiftIndex].shiftEnd = end       

        #add this state to the list of possible states
        possibleStates.append(newState)
    return possibleStates

#this method will change who is assigned to a shift
def reassignShift(currentState : Schedule, constraints, shift):
    pass