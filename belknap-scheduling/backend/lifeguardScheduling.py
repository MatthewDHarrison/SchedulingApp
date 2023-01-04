import csv
from collections import defaultdict
import random
import copy
import math, time
import sqlite3

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('schedule.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn


class Guard:
    def __init__(self, name, isCertified, DO, div):
        self.name = name
        self.isCertified = isCertified
        self.numCoverages = 0
        self.div = div
        if DO == 'LIT':
            self.off = ['H1P', 'F1P', 'H2P', 'F2P', 'F1A', 'F2A']
        elif (DO == '1L' or DO == '2L' or DO == '3L'):
            self.off = ['T1P', 'W1P', 'T2P', 'W2P', 'W1A', 'W2A']
        elif DO == 'ADH':
            self.off = ['M1P', 'T1P', 'M2P', 'T2P', 'T1A', 'T2A']
        elif DO == 'DH':
            self.off = ['W1P', 'H1P', 'W2P', 'H2P', 'H1A', 'H2A']
        else:
            self.off = []

    def print(self):
        print('Guard name: ', self.name)
        print('is certified' if self.isCertified else 'is not certified')
        print('Day off: ', self.off)
        print('Div: ', self.div)

    def incrementNumCoverages(self):
        self.numCoverages += 1

    def decrementNumCoverages(self):
        self.numCoverages -= 1

def getGuardNumCoverages(guard):
    return guard.numCoverages

class Schedule:
    def __init__(self, keys):
        self.keys = keys
        self.sched = defaultdict(list)
        self.guards = []
        self.numGuards = 0

    def print(self):
        for key in self.keys:
            print('Time Slot: ', key)
            print('Guards: ')
            for guard in self.sched[key]:
                print('--  ', guard.name, ' -- isCertified: -- ', guard.isCertified, ' -- Div: -- ', guard.div)
        for key in self.keys:
            numC = 0
            numUnC = 0
            for guard in self.sched[key]:
                if guard.isCertified:
                    numC += 1
                else:
                    numUnC += 1
            print('Time Slot: ', key, ' has ', numC, ' certified and ', numUnC, ' uncertified guards.')
    def addGuard(self, guard, key):
        guard.incrementNumCoverages()
        self.sched[key].append(guard)
        if guard not in self.guards:
            self.guards.append(guard)
        self.guards.sort(key=getGuardNumCoverages)
        self.numGuards += 1


    def getNumGuardsCovering(self, key):
        return len(self.sched[key])

    def sortGuards(self):
        self.guards.sort(key=getGuardNumCoverages)

    def printGuards(self):
        for g in self.guards:
            print(g.name, g.div, g.numCoverages)

def countNumCertified(l):
    count = 0
    for e in l:
        if e.isCertified:
            count += 1
    return count

def costOfSchedule(schedule):
    sum = 0
    for key in schedule.keys:
        if len(schedule.sched[key]) < 7:
            sum += 7 - len(schedule.sched[key])
        if len(schedule.sched[key]) > 8:
            sum += len(schedule.sched[key]) - 8

    for g in schedule.guards:
        if g.numCoverages < 6:
            sum += (6 - g.numCoverages)
        if g.numCoverages > 7:
            sum += (g.numCoverages - 7)
    return sum

def costOfScheduleUncertified(schedule):
    sum = 0
    for key in schedule.keys:
        if len(schedule.sched[key]) < 13:
            sum += 13 - len(schedule.sched[key])
        if len(schedule.sched[key]) > 14:
            sum += len(schedule.sched[key]) - 14
    for g in schedule.guards:
        if g.numCoverages < 5:
            sum += (5 - g.numCoverages)
        if g.numCoverages > 7:
            sum += (g.numCoverages - 7)
    return sum

def createRandSchedule(keys, guards):
    schedule = Schedule(keys)
    guardsCopy = copy.deepcopy(guards)
    gs = []
    for guard in guardsCopy:
        for i in range(0, 9):
            gs.append(guard)
    for key in keys:
        for i in range(0, 7):
            done = False
            time_start = time.time()
            while(not done):
                if (time.time() >= time_start + 3):
                    break
                r = random.randint(0, len(gs) - 1)
                guard = gs[r]
                if (guard not in schedule.sched[key] and (not key in guard.off)):
                    schedule.addGuard(guard, key)
                    gs.remove(gs[r])
                    done = True

    return schedule

def findNeighborSchedule(schedule):
    copySchedule = copy.deepcopy(schedule)
    for i in range(0, 4):
        j = random.randint(0, len(copySchedule.keys) - 1)
        m = random.randint(0, len(copySchedule.keys) - 1)

        keyJ = copySchedule.keys[j]
        keyM = copySchedule.keys[m]

        if (len(copySchedule.sched[keyJ]) > 0):
            k = random.randint(0, len(copySchedule.sched[keyJ]) - 1)
            if (copySchedule.sched[keyJ][k] not in copySchedule.sched[keyM] and keyM not in copySchedule.sched[keyJ][k].off):
                copySchedule.sched[keyM].append(copySchedule.sched[keyJ][k])
                copySchedule.sched[keyJ].remove(copySchedule.sched[keyJ][k])

    for i in range(0,4):
        foundValidRand = False
        while(not foundValidRand):
            j = random.randint(0, len(copySchedule.keys) - 1)
            keyJ = copySchedule.keys[j]
            if (len(copySchedule.sched[keyJ]) > 0):
                k = random.randint(0, len(copySchedule.sched[keyJ]) - 1)
                copySchedule.sched[keyJ][k].decrementNumCoverages()
                copySchedule.sched[keyJ].remove(copySchedule.sched[keyJ][k])
                foundValidRand = True
        foundValidRand = False
        while(not foundValidRand):
            g = copySchedule.guards[random.randint(0, len(copySchedule.guards) - 1)]
            m = random.randint(0, len(copySchedule.keys) - 1)
            keyM = copySchedule.keys[m]
            if (keyM not in g.off and g not in copySchedule.sched[keyM]):
                copySchedule.sched[keyM].append(g)
                g.incrementNumCoverages()
                foundValidRand = True
    return copySchedule

def findNeighborScheduleUncertified(schedule):
    copySchedule = copy.deepcopy(schedule)
    for i in range(0, 4):
        time_start = time.time()
        j = random.randint(0, len(copySchedule.keys) - 1)
        m = random.randint(0, len(copySchedule.keys) - 1)
        keyJ = copySchedule.keys[j]
        keyM = copySchedule.keys[m]

        if (len(copySchedule.sched[keyJ]) > 0):
            foundValidRand = False
            if (time.time() >= time_start + 1):
                break
            while(not foundValidRand):
                if (time.time() >= time_start + 2):
                    break
                k = random.randint(0, len(copySchedule.sched[keyJ]) - 1)
                if (not copySchedule.sched[keyJ][k].isCertified):
                    foundValidRand = True
            if (copySchedule.sched[keyJ][k] not in copySchedule.sched[keyM] and keyM not in copySchedule.sched[keyJ][k].off):
                copySchedule.sched[keyM].append(copySchedule.sched[keyJ][k])
                copySchedule.sched[keyJ].remove(copySchedule.sched[keyJ][k])

    for i in range(0,4):
        time_start = time.time()
        foundValidRand = False
        while(not foundValidRand):
            if (time.time() >= time_start + 2):
                break
            j = random.randint(0, len(copySchedule.keys) - 1)
            keyJ = copySchedule.keys[j]
            if (len(copySchedule.sched[keyJ]) > 0):
                foundValidRand2 = False
                while(not foundValidRand2):
                    if (time.time() >= time_start + 2):
                        break
                    k = random.randint(0, len(copySchedule.sched[keyJ]) - 1)
                    if (not copySchedule.sched[keyJ][k].isCertified and copySchedule.sched[keyJ][k].numCoverages > 6):
                        foundValidRand2 = True
                copySchedule.sched[keyJ][k].decrementNumCoverages()
                copySchedule.sched[keyJ].remove(copySchedule.sched[keyJ][k])
                foundValidRand = True

        foundValidRand = False
        while(not foundValidRand):
            if (time.time() >= time_start + 1):
                break
            g = copySchedule.guards[random.randint(0, len(copySchedule.guards) - 1)]
            if (not g.isCertified and g.numCoverages < 10):
                m = random.randint(0, len(copySchedule.keys) - 1)
                keyM = copySchedule.keys[m]
                if (keyM not in g.off and g not in copySchedule.sched[keyM]):
                    copySchedule.sched[keyM].append(g)
                    g.incrementNumCoverages()
                    foundValidRand = True
    return copySchedule

def simulatedAnnealing(schedule, costFunc, neighborFunc):
    T = 1
    Tmin = 0.0001
    alpha = .9
    nIter = 100
    while (T > Tmin):
        for i in range(0, nIter):
            if (costFunc(schedule) == 0):
                return schedule, 0
            neighbor = neighborFunc(schedule)
            try:
                ap = math.exp((costFunc(schedule) - costFunc(neighbor)) /T)
            except OverflowError:
                ap = 0
            if (costFunc(neighbor) < costFunc(schedule) or (random.uniform(0,1) <= ap)):
                schedule = neighbor
        T *= alpha
    return schedule, costFunc(schedule)

def addUncertified(schedule, uncertified, keys):
    guardsCopy = copy.deepcopy(uncertified)
    gs = []
    for guard in guardsCopy:
        for i in range(0, 9):
            gs.append(guard)
    for key in keys:
        for i in range(0, 7):
            done = False
            time_start = time.time()
            while(not done):
                if (time.time() >= time_start + 3):
                    break
                r = random.randint(0, len(gs) - 1)
                guard = gs[r]
                if (guard not in schedule.sched[key] and (not key in guard.off)):
                    schedule.addGuard(guard, key)
                    gs.remove(gs[r])
                    done = True

    return schedule

def getLowestCoveragePeriod(schedule):
    min = 1000
    minKey = ''
    for key in schedule.keys:
        if len(schedule.sched[key]) < min:
            minKey = key
            min = len(schedule.sched[key])
    return minKey

def getHighestCovPeriodIncGuard(schedule, guard):
    max = 0
    maxKey = ''
    for key in schedule.keys:
        if (len(schedule.sched[key]) > max and guard in schedule.sched[key]):
            maxKey = key
            max = len(schedule.sched[key])
    return maxKey

def tidySchedule(schedule):
    for guard in schedule.guards:
        scheduleCopy = copy.deepcopy(schedule)
        if guard.numCoverages < 5:
            for i in range(0, (5 - guard.numCoverages)):
                valid = False
                while (not valid):
                    k = getLowestCoveragePeriod(scheduleCopy)
                    if k == '':
                        break
                    if ((guard not in scheduleCopy.sched[k]) and (k not in guard.off)):
                        schedule.addGuard(guard, k)
                        valid = True
                    else:
                        scheduleCopy.keys.remove(k)
                        scheduleCopy.sched.pop(k)
        if guard.numCoverages > 7:
            for i in range(0, guard.numCoverages - 7):
                k = getHighestCovPeriodIncGuard(schedule, guard)
                schedule.sched[k].remove(guard)
                guard.decrementNumCoverages()
    return schedule


def getSimAnnealedSchedule():
    timestart = time.time()
    keys = ['T1A', 'W1A', 'H1A', 'F1A', 'S1A', 'T2A', 'W2A', 'H2A', 'F2A']
    keys += ['M1P', 'T1P', 'W1P', 'H1P', 'F1P', 'S1P', 'T2P', 'W2P', 'H2P', 'F2P', 'U2P']

    conn = db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT fname, lname, lifeguard, position, div from users")

    rows = cursor.fetchall()
    guards = []
    for row in rows:
        if (row[0] != None and row[1] != None and row[2] != None and row[3] != None and row[4] != None):
            guards.append(Guard(row[0] + ' ' + row[1], bool(row[2]), row[3], row[4]))




    certified = []
    uncertified = []
    numGuardsInDivs = [0, 0, 0, 0, 0]
    for g in guards:
        if g.div == 'C':
            numGuardsInDivs[0] += 1
        elif g.div == 'J':
            numGuardsInDivs[1] += 1
        elif g.div == 'M':
            numGuardsInDivs[2] += 1
        elif g.div == 'B':
            numGuardsInDivs[3] += 1
        elif g.div == 'S':
            numGuardsInDivs[4] += 1

        if g.isCertified:
            certified.append(g)
        else:
            uncertified.append(g)

    minCost = 1000

    for i in range(0, 3):
        s, c = simulatedAnnealing(createRandSchedule(keys, certified), costOfSchedule, findNeighborSchedule)
        if c < minCost:
            minCost = c
            sAnnealed = s
    # sAnnealed.print()
    # sAnnealed.printGuards()
    # print(minCost)
    sAllGuards = addUncertified(sAnnealed, uncertified, keys)
    # sAllGuards.print()

    minCost = 1000
    sAllGuardsAnnealed = sAnnealed
    for i in range(0, 3):
        s, c = simulatedAnnealing(sAnnealed, costOfScheduleUncertified, findNeighborScheduleUncertified)
        if c < minCost:
            minCost = c
            sAllGuardsAnnealed = s

    # sAllGuardsAnnealed.print()
    # sAllGuardsAnnealed.printGuards()
    # print('min cost: ', minCost)

    sAllGuardsAnnealedTidied = tidySchedule(sAllGuardsAnnealed)
    # sAllGuardsAnnealedTidied.print()
    # sAllGuardsAnnealedTidied.printGuards()
    print("min cost", costOfScheduleUncertified(sAllGuardsAnnealedTidied))
    print("Finished in ", time.time() - timestart)
    # with open('lifeguard_schedule.csv', 'w') as csvfile:
    #     filewriter = csv.writer(csvfile, delimiter=',',
    #                             quotechar='|', quoting=csv.QUOTE_MINIMAL)
    #     filewriter.writerow(['Day'])
    #     div = 0
    #     for i in range(0, len(keys)):
    #         row = [keys[i], 'Certified']
    #         for g in sAllGuardsAnnealed.sched[keys[i]]:
    #             if (g.isCertified):
    #                 row.append(g.name)
    #         filewriter.writerow(row)
    #         row = [keys[i], 'UnCertified']
    #         for g in sAllGuardsAnnealed.sched[keys[i]]:
    #             if (not g.isCertified):
    #                 row.append(g.name)
    #         filewriter.writerow(row)

    for key in sAllGuardsAnnealedTidied.keys:
        certs = ""
        uncerts = ""
        for guard in sAllGuardsAnnealedTidied.sched[key]:
            if guard.isCertified:
                certs += (guard.name + ',')
            else:
                uncerts += (guard.name + ',')
        sql_query = """ INSERT INTO lg_sched (timeslot, certified, uncertified)
                            VALUES (?, ?, ?)"""
        
        cursor = cursor.execute(sql_query, (key, certs, uncerts))

        conn.commit()
