#this will be the driver program used to test the algorithm. 
# Will need to:
# 1. Create test dataset of employees and constraints
# 2. Run the Construction Heuristic with this data
# 3. Fix errors
# 4. Display the results of the test
# 5. Fix bugs

from CH import buildSchedule
import Employee
import Constraints
import numpy as np

constraints1 = Constraints.Constraints(np.array([5,16]), 10, 35, 1, 40, 16)

e1 = Employee.Employee(89345)
e2 = Employee.Employee(48189)
e3 = Employee.Employee(90135)
e4 = Employee.Employee(98413)
e5 = Employee.Employee(78876)

e1.avails = { 
            'MONDAY': np.array([(10, 15),( 30,35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([(14,32)]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(10,20)]), 
            'SUNDAY' : np.array([(25,35)]),
            } 
e2.avails = { 
            'MONDAY': np.array([(19, 35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(18,24),(30,34)]), 
            'THURSDAY' : np.array([(10,12),(18,30)]), 
            'FRIDAY' : np.array([(10,30)]), 
            'SATURDAY' : np.array([(10,15)]), 
            'SUNDAY' : np.array([(25,35)]),
            } 
e3.avails = { 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(15, 25),( 30,34)]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(19,22)]), 
            'SUNDAY' : np.array([(10,15)]),
            } 
e4.avails = { 
            'MONDAY': np.array([(10, 15),( 30,35)]),
            'TUESDAY' : np.array([]),
            'WEDNESDAY' : np.array([(12,20),(25,34)]), 
            'THURSDAY' : np.array([]), 
            'FRIDAY' : np.array([(16,30)]), 
            'SATURDAY' : np.array([(10,20)]), 
            'SUNDAY' : np.array([(15,20),(28,35)]),
            } 
e5.avails = { 
            'MONDAY': np.array([]),
            'TUESDAY' : np.array([(20,35)]),
            'WEDNESDAY' : np.array([(18,24)]), 
            'THURSDAY' : np.array([(15,35)]), 
            'FRIDAY' : np.array([]), 
            'SATURDAY' : np.array([(10,35)]), 
            'SUNDAY' : np.array([(15,20),(28,35)]),
            } 

roster1 = {89345: e1, 48189: e2, 90135: e3, 98413: e4, 78876: e5}

buildSchedule(roster1, constraints1)