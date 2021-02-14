import Schedule
import Constraints
import Scorer
import Stepper
# Author: Will Pascuzzi
# The "construction heuristic" for the scheduling process is a greedy algorithm that
# seeks to place each element in its most optimal position as it iterates through them
# It will not go backwards and change elements that have been placed, and it does not try to guarantee 
# an optimal final score. This allows it to run quickly and place each element in a position
# to find a hopefully very good local optimum

    #this will round robin select employees for work. In the future this will be changed to be based off of hour many hours an employee can/is expected to work
def buildSchedule(employees, constraints):
    schedule = Schedule(employees, constraints)   
    while (schedule.hours < constraints.weeklyHours):
        for employee in employees:
            possibleStates = Stepper.tryToPlaceBasic(schedule, employee, constraints)
            schedule = selectStep(possibleStates)


def selectStep(schedules):
    scores = {}
    for state in schedules:
        scores[state] = Scorer.calculateScoreSimple(state)

    