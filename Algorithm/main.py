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
paramID = data['paramID']
shiftLengths = np.array([shiftSize])

constraints = Constraints.Constraints(shiftLengths, schedStart, schedEnd, 1, ((schedEnd-schedStart)-1)*7 , 16)

roster = OrderedDict({entry['username'] : Employee(entry['username'] ,entry['avails'] ) for entry in data['employees']})

sched = buildSchedule(roster, constraints)
#sched.displaySchedule()
#print("")
sched = localSearch(sched)

#sched.displaySchedule()

toJSON = ""

d = 15

for day in sched.schedule:
        for shift in sched.schedule[day]:
            start = "2021-03-%02d %02d:%02d:00" %( d, math.floor(shift.shiftStart/2), (shift.shiftStart%2)*30)
            end = "2021-03-%02d %02d:%02d:00" %(d, math.floor(shift.shiftEnd/2), (shift.shiftEnd%2)*30)
            #temp = '{ "username":"' + shift.employeeID + '", "start":"' + start + '", "end":"' + end + '"}?'
            temp = '("'+ shift.employeeID + '", "' + paramID + '", "' + start + '", "' + end +'"), '
            toJSON += temp

        d += 1

print(toJSON)
