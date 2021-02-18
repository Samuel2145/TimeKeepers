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
            schedule = selectStepSimple(possibleStates)
    hs, ms, ss = Scorer.calculateScoreSimple(schedule) 
    print("HardScore: ", hs)
    print("medScore: ", ms)
    print("softScore: ", ss)
    return schedule

#selects the most optimal step 
# selects the states with the highest hardScore, then of those highest medScore, then highest softScore
def selectStepSimple(schedules):
    hardScores = {}
    medScores = {}
    softScores = {}
    for state in schedules:
        # Every hardScore, medScore, and softScore is stored, even though a smaller number of the latter 2 will be utilized
        # This avoids having to recalculate the scores with the scorer method
        # May change this to only calculate the scores of the candidates when those scores are needed.
        scores = Scorer.calculateScoreSimple(state) 
        HS = scores[0]
        MS = scores[1]
        SS = scores[2]
        if HS not in hardScores.keys():
            hardScores[HS] = set() #create an empty set of states
        hardScores[HS].add(state)
        medScores[state] = MS 
        softScores[state] = SS 

    bestHS = max(hardScores)
    #gets the set of states with the maximum hardScore
    candidates_HS = hardScores[bestHS]

    #shrinks the dict of medScore states to only include those with the above highest hardScore
    candidates_MS = { state: [medScores.get(state)] for state in candidates_HS}   

    #prunes all states that don't have the highest medScore
    bestMS = max(candidates_MS.values())     
    candidates_MS2 = {key:val for key, val in candidates_MS.items() if val == bestMS}            

    #gets the states with the maximum medScore
    candidates_SS = {state: [softScores.get(state)] for state in candidates_MS2}

    #gets the state with the highest softscore
    bestState = max(candidates_SS, key = candidates_SS.get)         

    return bestState #returns the candidate that maximizes its hardscore, medscore, and softscore in that order.
    