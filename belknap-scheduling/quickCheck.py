
product = 1

for i in range(1, 21):

    total = (1 - (product * ((20 - i) / 20)))
    product = (product * ((20 - i) / 20)) 
    
    print('Round ', i, ': ', total)
