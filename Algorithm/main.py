import datetime
import math
import time
#import mariadb
from datetime import date
from CH import buildSchedule
from LocalSearch import localSearch
from collections import OrderedDict
from Employee import Employee
import Constraints
import numpy as np
import json
import sys

#def getConnection():
#    user = "n9qa33fb24h5ojln"
#    password = 'w5ie9n0wkv2mlpvs'
#    host = "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
#    port = 3306
#    database = 'zry2wsgus6t4stzn'

#    connection = mariadb.connect(user=user, password=password, host=host, port=port, database=database)
#    return connection

# need to receive:
# employee roster w/ availabilities for each employee
# parameters


data = json.load(sys.stdin)

#print(data)

schedStart = 10
schedEnd = 35
shiftLengths = np.array([5, 16])

constraints = Constraints.Constraints(shiftLengths, schedStart, schedEnd, 1, ((schedEnd-schedStart)-1)*7 , 16)

roster = OrderedDict({entry['username'] : Employee(entry['username'] ,entry['avails'] ) for entry in data['employees']})

sched = buildSchedule(roster, constraints)
#sched.displaySchedule()
print("")
sched = localSearch(sched)

sched.displaySchedule()

#connection = getConnection()
#try:
    #this is temporary for the purposes of testing. 
    #TODO: give shift object a full datetime field.
    #today = datetime.today()
 #   d = 15
    
  #  cursor = connection.cursor()
  #  for day in sched.schedule:
  #      for shift in sched.schedule[day]:
  #          start = "2021-03-%02d %02d:%02d:00" %( d, math.floor(shift.shiftStart/2), (shift.shiftStart%2)*30)
  #          end = "2021-03-%02d %02d:%02d:00" %(d, math.floor(shift.shiftEnd/2), (shift.shiftEnd%2)*30)
            #print(start)
            #print(end)
  #          cursor.execute("INSERT INTO shift (username, start, end) VALUES (?, ?, ?)",
  #          (shift.employeeID, start, end))
  #      d += 1
#except mariadb.Error as e:
#    print(f"Error: {e}")

#connection.commit()
#connection.close()