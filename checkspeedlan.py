import psutil
test=psutil.net_if_stats()
test=str(test[('Ethernet')][2])+'Mbps'
print(test)
