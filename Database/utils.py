import mariadb

def getConnection():
    user = "n9qa33fb24h5ojln"
    password = 'w5ie9n0wkv2mlpvs'
    host = "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
    port = 3306
    database = 'zry2wsgus6t4stzn'

    connection = mariadb.connect(user=user, password=password, host=host, port=port, database=database)
    return connection