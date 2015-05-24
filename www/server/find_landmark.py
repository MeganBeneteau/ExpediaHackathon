import json, urllib.request, pprint, unicodedata, itertools as IT, collections
def find_loc(x, y):
	#long is x lat is y
	key="JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk"
	result="http://terminal2.expedia.com/x/geo/features?within=5km&lng="+str(x)+"&lat="+str(y)+"&type=point_of_interest&apikey="+key
	response1 = urllib.request.urlopen(result)
	temp1 = response1.read().decode("utf-8")
	data1 = json.loads(temp1)
	print(data1)
find_loc(3,0)