import mariadb
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

def getConnection():
    user = "n9qa33fb24h5ojln"
    password = 'w5ie9n0wkv2mlpvs'
    host = "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
    port = 3306
    database = 'zry2wsgus6t4stzn'

    connection = mariadb.connect(user=user, password=password, host=host, port=port, database=database)
    return connection

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

