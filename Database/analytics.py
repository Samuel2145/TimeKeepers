import mariadb
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from utils import getConnection


def analytics():
    connection = getConnection()

    cursor = connection.cursor()

    cursor.execute("SELECT * FROM grouping")
    numGroups = len(cursor.fetchall())
    cursor.execute("SELECT * FROM user")
    numUsers = len(cursor.fetchall())
    cursor.execute("SELECT * FROM availability")
    numAvailability = len(cursor.fetchall())
    cursor.execute("SELECT * FROM parameter")
    numParameter = len(cursor.fetchall())
    cursor.execute("SELECT * FROM shift")
    numShift = len(cursor.fetchall())

    xLabels = ["Grouping","User","Availability","Parameter","Shift"]
    graph = [numGroups, numUsers, numAvailability, numParameter, numShift]

    plt.bar(xLabels,graph)
    plt.xlabel("Database Table")
    plt.ylabel("Number of Entries")
    plt.title("Contents of Database")
    
    for index,value in enumerate(graph):
        plt.text(index,value,str(value))
    plt.gcf().tight_layout()
    plt.show()

    
analytics()

