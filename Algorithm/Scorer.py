import Schedule
# Author: Will Pascuzzi
# This will contain functions to determine the current optimality score of a generated schedule
# as the schedule is built, the scorer will be run to check whether it is becoming more or less optimal
# and therefore decide whether to take a step or not.

    # returns a score. This will check the entire schedule state each time.
    # In the future, will be broken into parts that allow it to check when an entity is added or swapped
    def calculateScoreSimple(schedule_):
            score = 0

            # overall complexity: 7 * s * n * a. s = shifts, n = employees, a = availabilities. All variables besides employees should be small, so should be O(n)
            for employee in placed: # this is where most of the complexity stems from, especially when employee numbers start entering triple digits
                    for day in schedule_.schedule: #this is a constant of 7 iterations, and therefore doesn't add to the big O complexity
                        for shift in schedule_.schedule[day]: #this is likely to be a constant from 2-3, so doesn't add much to complexity
                                for availabilities in employee.avails[day]: #here we will check each availability tuple for a given day

