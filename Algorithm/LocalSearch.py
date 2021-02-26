from collections import OrderedDict
from Schedule import Schedule 
import Constraints
import Scorer
import MoveSelector

def localSearch(schedule):
    iterations = 0
    schedule, itr = slideShifts(schedule, 0)
    iterations += itr
    schedule, itr = slideShifts(schedule, 1)
    iterations += itr
    schedule, itr = slideShifts(schedule, 2)
    iterations += itr

    hs, ms, ss = Scorer.calculateScoreSimple(schedule)     
    print("HardScore: ", hs)
    print("medScore: ", ms)
    print("softScore: ", ss)
    print("iterations: ", iterations)

    return schedule

#second parameter is which scoreType this method should attempt maximize in the schedule
def selectState(states, scoreType, oldScores):
    bestState = states[0]
    for state in states:
        HS, MS, SS =  Scorer.calculateScoreSimple(state)
        #algorithm should never sacrifice a harder score tier's score to improve a higher score tier
        if scoreType == 0:
            if HS > oldScores[0]:
                bestState = state
                oldScores = HS,MS,SS
        elif scoreType == 1:
            if HS >= oldScores[0] and MS > oldScores[1]:
                bestState = state
                oldScores = HS,MS,SS
        elif scoreType == 2:
            if HS >= oldScores[0] and MS >= oldScores[1] and SS > oldScores[2]:
                bestState = state
                oldScores = HS,MS,SS        
    return bestState


def slideShifts(currentState, scoreType):
    itr = 0
    bestState = currentState
    days = currentState.schedule.keys()
    #iterate thru each shift
    for day in days:
        shifts = len(bestState.schedule[day])        
        for shift in range(shifts):
            oldScores = Scorer.calculateScoreSimple(bestState)
            states = MoveSelector.slideShift(bestState, day, shift)
            bestState = selectState(states, scoreType, oldScores)
            itr += 1
    return bestState, itr
