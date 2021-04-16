from CH import initializeSchedule
from LocalSearch import localSearchNew
import datetime
import math
import time
from datetime import date
from CH import buildSchedule
from LocalSearch import localSearch
from collections import OrderedDict
from Employee import Employee
import Constraints
import numpy as np
import json
import sys


data = json.load(sys.stdin)

#print(data)

shiftSize = data['shiftSize']
schedStart = data['scheduleStart']
schedEnd = data['scheduleEnd']
numSimult = data['numSimult']
maxWeekly = data['maxWeekly']
maxDaily = data['maxDaily']
paramID = data['paramID']
year = data['year']
month = data['month']
startDate = data['start']
shiftLengths = np.array([shiftSize])

constraints = Constraints.Constraints(shiftLengths, schedStart, schedEnd, numSimult, maxWeekly , maxDaily)

roster = OrderedDict({entry['username'] : Employee(entry['username'] ,entry['avails'], constraints) for entry in data['employees']})


#sched = buildSchedule(roster, constraints)
sched = initializeSchedule(roster, constraints)
sched = localSearchNew(sched)


toJSON = ""

currDate = datetime.datetime(year, month, startDate)

for day in sched.schedule:
        for shift in sched.schedule[day]:
            if shift.employeeID == "EMPTY":
                continue
            y = currDate.year
            m = currDate.month
            d = currDate.day
            start = "%04d-%02d-%02d %02d:%02d:00" %(y,m,d, math.floor(shift.shiftStart/2), (shift.shiftStart%2)*30)
            end = "%04d-%02d-%02d %02d:%02d:00" %(y,m,d, math.floor(shift.shiftEnd/2), (shift.shiftEnd%2)*30)
            #temp = '{ "username":"' + shift.employeeID + '", "start":"' + start + '", "end":"' + end + '"}?'
            temp = '("'+ shift.employeeID + '", "' + paramID + '", "' + start + '", "' + end +'"), '
            toJSON += temp

        currDate = currDate + datetime.timedelta(days=1)

print(toJSON)
