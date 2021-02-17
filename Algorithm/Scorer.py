import Schedule
# Author: Will Pascuzzi
# This will contain functions to determine the current optimality score of a generated schedule
# as the schedule is built, the scorer will be run to check whether it is becoming more or less optimal
# and therefore decide whether to take a step or not.

# returns a score. This will check the entire schedule state each time.
# In the future, will be broken into parts that allow it to check when an entity is added or swapped
def calculateScoreSimple(schedule_):
    # zero represents a perfect score
        hardScore = 0 # represents hard constraints such as ensuring the entire workday is filled with employees & no physical laws are broken.
        softScore = 0 # represents soft constraints such as ensuring employee availabilities are met
        
        #hardScore calculator
        for day in schedule_.unfilled:
            hardScore -= (len(schedule_.unfilled[day])) #hardscore represents how many spots have been filled. 0 means all times have been filled.

        #softScore calculator
        for day in schedule_.schedule: #this is a constant of 7 iterations, and therefore doesn't add to the big O complexity
            for shift in schedule_.schedule[day]: #this is likely to be a constant from 2-3, so doesn't add much to complexity
                availPenalty = shift.shiftEnd - shift.shiftStart # the penalty represents how much of a shift is outside of the corresponding employee's availability 
                for availability in schedule_.roster[shift.employeeID].avails[day]: # here we will check the corresponding employee's availability tuples for that day
                    availPenalty -= _shiftCompare(shift, availability)
                    if (availPenalty == 0):
                        break
                softScore -= availPenalty

        return hardScore, softScore 

# helper method to compare a shift with an availability tuple. returns a number representing how much of that shift is covered by the tuple.
def _shiftCompare(shift, avail):
    if (shift.shiftEnd < avail[0] or shift.shiftStart > avail[1]):
        return 0 # shift is completely outside of the availability tuple.
    if (shift.shiftEnd < avail[1]):
        if(shift.shiftStart < avail[0]):  #case 1, intersect at start of availability tuple. Return length of intersection
            return shift.shiftEnd - avail[0]
        else:                             #case 2, shift is completely encompassed by availability. Return full length of shift
            return shift.shiftEnd - shift.shiftStart
    else:
        if(shift.shiftStart > avail [0]): # case 3, shift intersects at end of availability. Return length of intersection
            return avail[1] - shift.shiftStart
        else:                             # case 4 availability block completely encompassed by shift. Return length of availability block
            return avail[1] - avail[0]
            
    