import numpy as np
# Author: Will Pascuzzi
#this object will define the constraints set by the employer. These constraints are what the scheduler will seek to satisfy.
class Constraints:
    def __init__(self, ID, shiftSizes, numSimultaneous, maxHours, schedStart):
        # Hardest Constraint level. These are built into the stepper.
        self.shiftSizes = shiftSizes # an integer array of shift sizes, in hours. 
        self.schedStart = schedStart # when the workday begins
        self.schedEnd = schedEnd # when the workday ends. startTime to endTime must be filled completely with employees to generate a good schedule.

        self.numSimultaneous = numSimultaneous # how many employees must be working simultaneously at any given time. May expand to be shift or day based
        self.maxWeeklyHours = maxWeeklyHours # maximum hours any employee may work per week. This may be moved into the employee object
        self.maxDailyHours = maxDailyHours # maximum hours any employee may work per day. May be moved into employee object
        


    