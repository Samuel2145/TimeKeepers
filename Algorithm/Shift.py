# Author: Will Pascuzzi
#shifts are the planning entities that make up a schedule
class Shift:
    def __init__(self, employeeID, shiftStart, shiftLength, day):
        self.employeeID = employeeID # this represents who the shift belongs to
        self.shiftStart = shiftStart
        self.shiftEnd = shiftStart + shiftLength
        self.shiftLength = shiftLength   
        self.day = day #redundant?
         
    # creates a shift given a start time, length, and employeeID.
    # TODO: implement a way to handle if a shift is created to where it ends pasts the end of a day.
    def createShift(employeeID, start, length, day):
            return Shift(employeeID, start, length, day)