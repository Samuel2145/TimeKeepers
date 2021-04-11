import copy
from Shift import Shift
from Schedule import Schedule
import Constraints
from Employee import Employee
import Scorer

# Author: Will Pascuzzi
# This will contain methods responsible for generating moves. 
# These moves include attempting to place a shift in a possible location, and changing the schedule to better fit an new entity

# methods should return a list of schedule states found
# this set of states can be run through a scorer, which can return the most optimal state to choose


    

#this will fill a day with shifts according to the necessity of workers per hour
#Will be part of the construction heuristic that places shifts before they have employees traded in and out of them.
#this will find the first fit and return the day schedule corresponding to it.
def buildScheduleShape(schedule : Schedule, constraints, day, nextSpot):
    # move down the time of the day and generate permutations using schedule sizes.
    # The first shift must start at the beginning of the workday and the last shift must end at the end of the workday
    # If there is a gap in the generated schedule it is rejected
    # If no valid schedule exists, return this information. The user must be notified that their shift sizes and workdays are not compatible.
    success = False
    for size in constraints.shiftSizes:
        #if an invalid schedule would be created (shift goes past end)
        if nextSpot+size > constraints.schedEnd:
        #do not add a shift of this size
            continue 
        #NOTE: can probably just break, assuming the shift sizes are ordered

        newShift = (nextSpot, nextSpot+size)

        #add shift to actual schedule
        schedule.insertShift(Shift.createShift("EMPTY", newShift[0], size, day), day)   
        
        for i in range(newShift[0],newShift[1]):
            #decrement unfilled slots in schedule
            spots = schedule.unfilled[day]
            spots[i] -= 1
            #if a spot goes negative, reject this schedule
            if spots[i] < 0:
                return schedule, False

        building = False
        #got to the end of the day and remained valid, start over at beginning of day to look for empty spots    
        if nextSpot+size == constraints.schedEnd: 
            #iterate through list of unfilled spots in the schedule
            for i in range(constraints.schedStart,constraints.schedEnd):
                #first nonzero spot will be assigned as "nextSpot"
                if schedule.unfilled[day][i] > 0:
                    nextSpot = i
                    building = True
                    break  
        else:
            #should move nextSpot to the next nonzero unfilled spot
            for i in range(newShift[1],constraints.schedEnd):
                if schedule.unfilled[day][i] > 0:
                    nextSpot = i
                    building = True
                    break
            #start over at the beginning if no spot was found
            if building == False:
                for i in range(constraints.schedStart,constraints.schedEnd):
                    #first nonzero spot will be assigned as "nextSpot"
                    if schedule.unfilled[day][i] > 0:
                        nextSpot = i
                        building = True
                        break  

        #BASE CASE: if there are no more nonzero spots, the day is finished. return the schedule
        if building == False:
            return schedule, True

        #add additional shift. upon return upward, if we receive true stop trying different paths
        results = buildScheduleShape(copy.deepcopy(schedule), constraints, day, nextSpot)
        if results[1] == True:
            success = True
            schedule = results[0]
            break
    return schedule, success

"""
a neighbor is defined as a schedule where a single shift has a different employee
than a neighboring schedule. Therefore, to generate neighbors, we will iterate through
each shift and swap in a different employee
"""
def simpleHillClimb(currentState : Schedule, oldScores):
    for day in currentState.schedule.keys():
        for shift in currentState.schedule[day]:
            for employee in currentState.roster.values():
                #newState = copy.deepcopy(currentState)
                if (employee.currentHours + shift.shiftLength > employee.maxWeeklyHours 
                or employee.currentHoursDaily[day] + shift.shiftLength > employee.maxDailyHours
                or employee.ID == shift.employeeID):
                    continue
                #reResults = newState.reassignShift(shift, employee)
                reResults = currentState.reassignShift(shift, employee)
                if(reResults[0] == False):
                    raise Exception("Did not delete item from employeeshifts list")
                newScores = Scorer.calculateScoreNew(currentState)
                #if newScores[0] < 0:
               #     raise Exception("This shouldn't happen")

               #maximize hardscore, then mediumscore, then softscore. Never sacrifice harder score to boost softer score.
                if(newScores[0] > oldScores[0]):
                    return currentState, newScores, True

                if(newScores[0] >= oldScores[0] and 
                newScores[1] > oldScores[1]):
                    return currentState, newScores, True

                if(newScores[0] >= oldScores[0] and 
                newScores[1] >= oldScores[1] and
                newScores[2] > oldScores[2]):
                    return currentState, newScores, True
                #assigns shift back to the old employee if it didn't create a better neighbor
                currentState.reassignShift(shift, reResults[1])
    #none of the neighbors had a better score than the current. Found local maxima
    return currentState, oldScores, False


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

