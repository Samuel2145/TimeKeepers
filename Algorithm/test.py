#this will be the driver program used to test the algorithm. 
# Will need to:
# 1. Create test dataset of employees and constraints
# 2. Run the Construction Heuristic with this data
# 3. Fix errors
# 4. Display the results of the test
# 5. Fix bugs

from CH import initializeSchedule
from LocalSearch import localSearchNew
from collections import OrderedDict
import Employee
import Constraints
import numpy as np
import Scorer

schedStart = 10
schedEnd = 35
shiftLengths = np.array([5, 16])

constraints = Constraints.Constraints(shiftLengths, schedStart, schedEnd, 1, 38, 16)

"""
e1 = Employee.Employee("John", OrderedDict({ 
            'MONDAY': np.array([(10, 15),( 30,35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([(14,32)]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(10,20)]), 
            'SUNDAY' : np.array([(25,35)]),
            }) )
e2 = Employee.Employee("Mary", OrderedDict({ 
            'MONDAY': np.array([(19, 35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(18,24),(30,34)]), 
            'THURSDAY' : np.array([(10,12),(18,30)]), 
            'FRIDAY' : np.array([(10,30)]), 
            'SATURDAY' : np.array([(10,15)]), 
            'SUNDAY' : np.array([(25,35)]),
            }))
e3 = Employee.Employee("Steve", OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(15, 25),( 30,34)]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(19,22)]), 
            'SUNDAY' : np.array([(10,15)]),
            }))
e4 = Employee.Employee("Bingo", OrderedDict({ 
            'MONDAY': np.array([(10, 15),( 30,35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(10,20)]), 
            'SUNDAY' : np.array([(15,20),(28,35)]),
            }))
e5 = Employee.Employee("Paul", OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(20,35)]),
            'WEDNESDAY' : np.array([(18,24)]), 
            'THURSDAY' : np.array([(15,35)]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([(10,35)]), 
            'SUNDAY' : np.array([(15,20),(28,35)]),
            }))

"""
e1 = Employee.Employee("Jon", OrderedDict({ 
            'MONDAY': np.array([(10, 35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([]), 
            'SUNDAY' : np.array([]),
            }), constraints )
e2 = Employee.Employee("Yucko", OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(10, 35)]),
            'WEDNESDAY' : np.array([]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([]), 
            'SUNDAY' : np.array([]),
            }), constraints)
e3 = Employee.Employee("Jorge", OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(10,35)]), 
            'THURSDAY' : np.array([(10,35)]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([]), 
            'SUNDAY' : np.array([]),
            }),constraints)
e4 = Employee.Employee("Bingo", OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(10,35)]), 
            'SATURDAY' : np.array([(10,35)]), 
            'SUNDAY' : np.array([]),
            }), constraints)
e5 = Employee.Employee("Pall", OrderedDict({ 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([]), 
            'SUNDAY' : np.array([(10, 35)]),
            }), constraints)



roster = OrderedDict({e1.ID: e1, e2.ID: e2, e3.ID: e3, e4.ID: e4, e5.ID: e5})

sched = initializeSchedule(roster, constraints)
sched.displaySchedule()
print(Scorer.calculateScoreNew(sched))
print("")
sched = localSearchNew(sched)
sched.displaySchedule()
print(Scorer.calculateScoreNew(sched))