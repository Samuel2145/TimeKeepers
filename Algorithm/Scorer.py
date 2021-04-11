from Schedule import Schedule
from Shift import Shift
# Author: Will Pascuzzi
# This will contain functions to determine the current optimality score of a generated schedule
# as the schedule is built, the scorer will be run to check whether it is becoming more or less optimal
# and therefore decide whether to take a step or not.

def calculateScoreNew(schedule_):
    hardScore = _hardScoreCalcNew(schedule_.employeeShifts)
    medScore = _medScoreCalcNew(schedule_.schedule)                                                   
    softScore = _softScoreCalcNew(schedule_)         
            
    return hardScore, medScore, softScore 

def _hardScoreCalcNew(employeeShifts):
    """
    Looks through each list of shifts in the employeeShifts dict. 
    Checks for any intersections within a list, decreasing the score if found.
    """
    hardScore = 0
    for day in employeeShifts.keys():
        for shifts in employeeShifts[day].values():
            hardScore += _checkForInterSections(shifts)
    return hardScore

def _medScoreCalcNew(schedule):
    medScore = 0
    """ 
    receives a schedule OrderedDict with each entry holding a list of shifts
    For each shift without an employee, subtract from the medium score the 
    length of the empty shift
    """
    for item in schedule.values():
        for shift in item:
            if shift.employeeID == "EMPTY":
                medScore -= shift.shiftLength
    return medScore


def _softScoreCalcNew(schedule_):
    softScore = 0
    for day in schedule_.schedule.keys(): #this is a constant of 7 iterations, and therefore doesn't add to the big O complexity            
            for shift in schedule_.schedule[day]: #this is likely to be a constant from 2-3, so doesn't add much to complexity                
                if(shift.employeeID == "EMPTY"):
                    continue
                else:
                    availPenalty = shift.shiftEnd - shift.shiftStart # the penalty represents how much of a shift is outside of the corresponding employee's availability 
                    employee = schedule_.roster[shift.employeeID]
                    for availability in employee.avails[day]: # here we will check the corresponding employee's availability tuples for that day
                        availPenalty -= _shiftCompare(shift, availability)
                        if (availPenalty == 0):
                            break
                    softScore -= availPenalty
    return softScore

def _checkForInterSections(shifts):
    hardScore = 0
    #this will contain 2 pairs for each pair in employeeShifts, with the second element corresponding to the pair index
    positions = [] 

    # a dict of lists containing any intersections
    intersections = {i : [] for i in range(len(shifts))}

    # Store each pair with their positions 
    for i in range (len(shifts)):
        positions.append((shifts[i][0] + 0.1 , i)) 
        positions.append((shifts[i][1], i))
    

    # Sort the vector with respect to 
    # first element in the pair 
    positions.sort()
    
    #number of intersections
    num = 0

    # set data structure for keeping 
    # the second element of each pair 
    s = set() 

    for p in positions: 

        # check if all pairs are taken 
        if (num >= len(shifts)):
            break

        # check if current value is a second element 
        # if so, remove p from the set 
        if (p in s):
            s.remove(p) 

        else:

            # index of the current pair 
            i = p[1]

            # Computing the second element of current pair 
            j = shifts[i][1]

            # iterating in the set of second elements
            for k in s: 

                # Check if the set element 
                # has higher value than the current 
                # element's second element 
                if (k[0] > j):
                    break

                #if an intersection exists
                index = k[1]  
                intersections[i].append(index)   
                intersections[index].append(i)  
                num += 1 

                # Check if curr is equal to 
                # all available pairs or not 
                if (num >= len(shifts)):
                    break
            

            # Insert second element 
            # of current pair in the set 
            s.add((j, i)) 
            if (num > 0):
                raise Exception("wtf")
    return -num
        




# returns a score. This will check the entire schedule state each time.
# TODO: break into parts that allow it to only check elements related to a newly added or changed entity, increasing runspeed
def calculateScoreSimple(schedule_):
    # zero represents a perfect score
        hardScore = _hardScoreCalcSimple(schedule_.employeeShifts)
        medScore = _medScoreCalcSimple(schedule_.unfilled)                                                   
        softScore = _softScoreCalcSimple(schedule_)         
            
        return hardScore, medScore, softScore 

# Hardscore represents whether an employee has intersecting shifts with itself. 
# This must be 0 or a schedule isn't possible    
# referenced: https://www.geeksforgeeks.org/find-all-the-intersecting-pairs-from-a-given-array/
def _hardScoreCalcSimple(employeeShifts):
    hardScore = 0
    
    for shifts in employeeShifts.values():
        #this will contain 2 pairs for each pair in employeeShifts, with the second element corresponding to the pair index
        positions = [] 
    
        # a dict of lists containing any intersections
        intersections = {i : [] for i in range(len(shifts))}
    
        # Store each pair with their positions 
        for i in range (len(shifts)):
            positions.append((shifts[i][0], i)) 
            positions.append((shifts[i][1], i))
        
    
        # Sort the vector with respect to 
        # first element in the pair 
        positions.sort()
        
        #number of intersections
        num = 0
    
        # set data structure for keeping 
        # the second element of each pair 
        s = set() 
    
        for p in positions: 
    
            # check if all pairs are taken 
            if (num >= len(shifts)):
                break
    
            # check if current value is a second element 
            # if so, remove p from the set 
            if (p in s):
                s.remove(p) 
    
            else:
    
                # index of the current pair 
                i = p[1]
    
                # Computing the second element of current pair 
                j = shifts[i][1]
    
                # iterating in the set of second elements
                for k in s: 
    
                    # Check if the set element 
                    # has higher value than the current 
                    # element's second element 
                    if (k[0] > j):
                        break
    
                    #if an intersection exists
                    index = k[1]  
                    intersections[i].append(index)   
                    intersections[index].append(i)  
                    num += 1 
    
                    # Check if curr is equal to 
                    # all available pairs or not 
                    if (num >= len(shifts)):
                        break
                
    
                # Insert second element 
                # of current pair in the set 
                s.add((j, i)) 
                hardScore -= num
        
    return hardScore
     



# medscore represents how many spots have been filled. 0 means all times have been filled. 
# TODO: update to be multidimensional (multiple spots will need to be filled at times)
def _medScoreCalcSimple(unfilled):
    medScore = 0
    for day in unfilled:
        for hour in unfilled[day]:
            medScore -= abs(unfilled[day][hour])
    return medScore

# soft score represents soft constraints such as ensuring employee availabilities and other requests are met
def _softScoreCalcSimple(schedule_):
    softScore = 0
    for day in schedule_.schedule: #this is a constant of 7 iterations, and therefore doesn't add to the big O complexity            
            for shift in schedule_.schedule[day]: #this is likely to be a constant from 2-3, so doesn't add much to complexity                
                availPenalty = shift.shiftEnd - shift.shiftStart # the penalty represents how much of a shift is outside of the corresponding employee's availability 
                for availability in schedule_.roster[shift.employeeID].avails[day]: # here we will check the corresponding employee's availability tuples for that day
                    availPenalty -= _shiftCompare(shift, availability)
                    if (availPenalty == 0):
                        break
                softScore -= availPenalty
    return softScore


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
            
    