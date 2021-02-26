#this will be the driver program used to test the algorithm. 
# Will need to:
# 1. Create test dataset of employees and constraints
# 2. Run the Construction Heuristic with this data
# 3. Fix errors
# 4. Display the results of the test
# 5. Fix bugs

from CH import buildSchedule
from LocalSearch import localSearch
from collections import OrderedDict
import Employee
import Constraints
import numpy as np

schedStart = 10
schedEnd = 35
shiftLengths = np.array([5, 10, 16])

constraints1 = Constraints.Constraints(shiftLengths, schedStart, schedEnd, 1, ((schedEnd-schedStart)-1)*7, 16)

e1 = Employee.Employee(89345)
e2 = Employee.Employee(48189)
e3 = Employee.Employee(90135)
e4 = Employee.Employee(98413)
e5 = Employee.Employee(78876)

e1.avails = OrderedDict({ 
            'MONDAY': np.array([(10, 15),( 30,35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([(14,32)]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(10,20)]), 
            'SUNDAY' : np.array([(25,35)]),
            }) 
e2.avails = OrderedDict({ 
            'MONDAY': np.array([(19, 35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(18,24),(30,34)]), 
            'THURSDAY' : np.array([(10,12),(18,30)]), 
            'FRIDAY' : np.array([(10,30)]), 
            'SATURDAY' : np.array([(10,15)]), 
            'SUNDAY' : np.array([(25,35)]),
            })
e3.avails = OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(15, 25),( 30,34)]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(19,22)]), 
            'SUNDAY' : np.array([(10,15)]),
            })
e4.avails = OrderedDict({ 
            'MONDAY': np.array([(10, 15),( 30,35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(10,20)]), 
            'SUNDAY' : np.array([(15,20),(28,35)]),
            })
e5.avails = OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(20,35)]),
            'WEDNESDAY' : np.array([(18,24)]), 
            'THURSDAY' : np.array([(15,35)]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([(10,35)]), 
            'SUNDAY' : np.array([(15,20),(28,35)]),
            })

roster1 = OrderedDict({89345: e1, 48189: e2, 90135: e3, 98413: e4, 78876: e5})

sched = buildSchedule(roster1, constraints1)
sched.displaySchedule()
print("")
sched = localSearch(sched)

sched.displaySchedule()