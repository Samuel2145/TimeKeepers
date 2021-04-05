from collections import OrderedDict
from Schedule import Schedule 
import Constraints
import Scorer
import MoveSelector
import random

# Author: Will Pascuzzi
# The "construction heuristic" for the scheduling process is a greedy algorithm that
# seeks to place each element in its most optimal position as it iterates through them
# It will not go backwards and change elements that have been placed, and it does not try to guarantee 
# an optimal final score. This allows it to run quickly and place each element in a position
# to find a hopefully very good local optimum

def initializeSchedule(employees, constraints):
    """
    Creates a shedule shape, filled with empty shifts. Then fills with random employees. Will switch to heuristic method soon
    """
    schedule = buildScheduleNew(employees, constraints)
    fillScheduleNew(employees,schedule)
    return schedule

#build a schedule filled with empty shifts
def buildScheduleNew(employees, constraints):
    schedule = Schedule(employees, constraints)
    for day in schedule.schedule.keys():
        schedule.schedule[day] = MoveSelector.buildScheduleShape(schedule, constraints, day, constraints.schedStart)
    return schedule

def fillScheduleNew(employees, schedule):
    for day in schedule.schedule.keys():
        for shift in schedule.schedule[day]:
            #currently fills each with random employee. Will switch to heuristic based approach
            schedule.reassignShift(shift, random.choice(list(schedule.roster.values())))

    #this will round robin select employees for work. In the future this will be changed to be based off of how many hours an employee can/is expected to work
def buildSchedule(employees, constraints):
    iterations = 0
    schedule = Schedule(employees, constraints)   
  #  hs, ms, ss = Scorer.calculateScoreSimple(schedule) 
    while (schedule.hours < constraints.maxWeeklyHours):
        possibleStates = MoveSelector.tryToPlaceBasic(schedule, constraints)
        schedule = selectStepFull(possibleStates)
        # hs, ms, ss = Scorer.calculateScoreSimple(schedule) 
        # print("HardScore: ", hs)
        # print("medScore: ", ms)
        # print("softScore: ", ss, "\n")
        iterations += 1
        #schedule.displaySchedule()

    hs, ms, ss = Scorer.calculateScoreSimple(schedule)     
    #print("HardScore: ", hs)
    #print("medScore: ", ms)
    #print("softScore: ", ss)
    #print("iterations ", iterations)
    return schedule

#selects the step with the highes score from an ordered dict of states mapped to their scores. Each state is mapped to one score only
def selectStepSimple(schedules):
    pass

#selects the most optimal step 
# selects the states with the highest hardScore, then of those highest medScore, then highest softScore
def selectStepFull(schedules):
    hardScores = OrderedDict()
    medScores = OrderedDict()
    softScores = OrderedDict()
    for state in schedules:
        # Every hardScore, medScore, and softScore is stored, even though a smaller number of the latter 2 will be utilized
        # This avoids having to recalculate the scores with the scorer method
        # May change this to only calculate the scores of the candidates when those scores are needed.
        scores = Scorer.calculateScoreSimple(state) 
        HS = scores[0]
        MS = scores[1]
        SS = scores[2]
        if HS not in hardScores.keys():
            hardScores[HS] = [] #create an empty list of states
        hardScores[HS].append(state)
        medScores[state] = MS 
        softScores[state] = SS 

    bestHS = max(hardScores)
    #gets the list of states with the maximum hardScore
    candidates_HS = hardScores[bestHS]

    #shrinks the dict of medScore states to only include those with the above highest hardScore
    candidates_MS = OrderedDict()
    for state in candidates_HS:
        candidates_MS[state] = medScores.get(state)

    #prunes all states that don't have the highest medScore
    bestMS = max(candidates_MS.values())     
    candidates_MS2 = OrderedDict()
    for key, val in candidates_MS.items():
        if val == bestMS:
            candidates_MS2[key] = val           

    #gets the states with the maximum medScore
    candidates_SS = OrderedDict()
    for state in candidates_MS2:
        candidates_SS[state] = softScores.get(state)

    #gets the state with the highest softscore
    bestState = max(candidates_SS, key = candidates_SS.get)         

    return bestState #returns the candidate that maximizes its hardscore, medscore, and softscore in that order.
    