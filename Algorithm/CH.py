from Schedule import Schedule 
import Constraints
import Scorer
import Stepper
# Author: Will Pascuzzi
# The "construction heuristic" for the scheduling process is a greedy algorithm that
# seeks to place each element in its most optimal position as it iterates through them
# It will not go backwards and change elements that have been placed, and it does not try to guarantee 
# an optimal final score. This allows it to run quickly and place each element in a position
# to find a hopefully very good local optimum

    #this will round robin select employees for work. In the future this will be changed to be based off of how many hours an employee can/is expected to work
def buildSchedule(employees, constraints):
    schedule = Schedule(employees, constraints)   
    while (schedule.hours < constraints.maxWeeklyHours):
        for employee in schedule.roster:
            possibleStates = Stepper.tryToPlaceBasic(schedule, schedule.roster[employee], constraints)
            schedule = selectStep(possibleStates)
    return schedule


def selectStep(schedules):
    hardScores = {}
    softScores = {}
    for state in schedules:
        scores = Scorer.calculateScoreSimple(state)
        hardScore = scores[0]
        if hardScore not in hardScores.keys():
            hardScores[hardScore] = [] #create an empty list of states
        hardScores[hardScore].append(state)
        softScores[state] = scores[1]
    bestHardScore = max(hardScores)
    candidates = hardScores[bestHardScore]
    finalCandidates = { state: [softScores.get(state)] for state in candidates}
    best = max(finalCandidates, key = finalCandidates.get) 
    return best #returns the candidate with the highest hardscore, and of those with matching hardscores, the highest softscore

    