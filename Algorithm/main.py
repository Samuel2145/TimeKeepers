from CH import buildSchedule
from LocalSearch import localSearch
from collections import OrderedDict
from Employee import Employee
import Constraints
import numpy as np
import json
import sys

# need to receive:
# employee roster w/ availabilities for each employee
# parameters

data = json.load(sys.stdin)

print(data)

schedStart = 10
schedEnd = 35
shiftLengths = np.array([5, 16])

constraints = Constraints.Constraints(shiftLengths, schedStart, schedEnd, 1, ((schedEnd-schedStart)-1)*7 , 16)

roster = OrderedDict({entry['username'] : Employee(entry['username'] ,entry['avails'] ) for entry in data['employees']})

sched = buildSchedule(roster, constraints)
sched.displaySchedule()
print("")
sched = localSearch(sched)

sched.displaySchedule()