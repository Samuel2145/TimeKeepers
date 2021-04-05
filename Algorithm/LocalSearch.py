import math
from collections import OrderedDict
from Schedule import Schedule 
import Constraints
import Scorer
import MoveSelector

def localSearchNew(schedule):
    """
    local search using simple hill climbing: finds the first better neighbor and chooses that as the new state
    """

    searching = True
    scores = Scorer.calculateScoreNew(schedule)

    while searching:
        schedule, scores, searching = MoveSelector.simpleHillClimb(schedule, scores)

    return schedule

def localSearch(schedule):
    iterations = 0
    schedule, itr = slideShifts(schedule, 0)
    iterations += itr
    schedule, itr = slideShifts(schedule, 1)
    iterations += itr
    schedule, itr = slideShifts(schedule, 2)
    iterations += itr

    hs, ms, ss = Scorer.calculateScoreSimple(schedule)     
    #print("HardScore: ", hs)
    #print("medScore: ", ms)
    #print("softScore: ", ss)
    #print("iterations: ", iterations)

    return schedule

#second parameter is which scoreType this method should attempt maximize in the schedule
def selectState(states, scoreType, bestState):
    it = 0
    oldScores = Scorer.calculateScoreSimple(bestState)
    for state in states:    
        HS, MS, SS =  Scorer.calculateScoreSimple(state)
        #algorithm should never sacrifice a harder score tier's score to improve a higher score tier
        #FIXME: mediumscore maximization doesn't work currently because the unfilled dict is not updated
        if ((scoreType == 0 and HS > oldScores[0])
        or (scoreType == 1 and HS >= oldScores[0] and MS > oldScores[1])
        or (scoreType == 2 and HS >= oldScores[0] and MS >= oldScores[1] and SS > oldScores[2])): 
                bestState = state
                oldScores = HS,MS,SS
        it +=1
    return bestState, it


def slideShifts(currentState, scoreType):
    itr = 0
    bestState = currentState
    days = currentState.schedule.keys()
    #iterate thru each shift
    for day in days:
        shifts = len(bestState.schedule[day])        
        for shift in range(shifts):
            states = MoveSelector.slideShift(bestState, day, shift) #find the best spot to slide it to
            bestState, it = selectState(states, scoreType, bestState)
            itr += it
    return bestState, itr
