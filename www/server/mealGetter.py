import json, urllib.request, simplejson, pprint, unicodedata, rauth, itertools as IT, collections

def hello1(x=45.5017,y=-73.5673):

	url1 = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+str(x)+","+str(y)

	response1 = urllib.request.urlopen(url1)
	temp1 = response1.read().decode("utf-8")
	#print ("got here")

	data1 = json.loads(temp1)
	#print (data1)
	resultdict = data1['results'][0]['address_components']
	for item in resultdict:
		if item['types'][0] == "locality":
			#print (item['long_name'] +  " hell0")
			cityName = item['long_name']
			finalCityName = (unicodedata.normalize('NFD', cityName).encode('ascii', 'ignore')).decode("utf-8")
	#pprint.pprint(resultdict)
	#pprint.pprint(data1)
	#pprint.pprint("city " + result)
	#pprint.pprint(finalCityName)
	return finalCityName
	#url format for the expedia api
	# url = "http://terminal2.expedia.com/x/activities/search?location="+finalCityName+"&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk"
	# #print ("0")
	#url format for the yelp api
	#url = "http://api.yelp.com/v2/search?term=food&ll="+str(x)+","+str(y)


	# url="http://api.yelp.com/v2/search?term=cream+puffs&location=San+Francisco"
	# response = urllib.request.urlopen(url)
	# #print ("1")
	# temp = response.read().decode("utf-8")
	# data = json.loads(temp)
	# #print ("2")
	# print(len(data))
	# pprint.pprint(data)
	
	# for item in data['activities']:
	# 	for key, value in item.items():
	# 		try:
	# 			if key==""
	# 		except UnicodeEncodeError:
	# 			pass



def get_results(params):

	#Obtain these from Yelp's manage access page
	consumer_key = "GJJwvDU_YJqcaUYQcTm4_g"
	consumer_secret = "1abyCtMwHTop_-_dCFWdEPcrCE4"
	token = "IrMrVtQCispIK8dEb0fMuF3Q3km1okWy"
	token_secret = "4BYOTFeGfQ_1AOTOAtYlcYgfpu4"

	session = rauth.OAuth1Session(
		consumer_key = consumer_key
		,consumer_secret = consumer_secret
		,access_token = token
		,access_token_secret = token_secret)

	request = session.get("http://api.yelp.com/v2/search",params=params)

	#Transforms the JSON API response into a Python dictionary
	data = request.json()
	session.close()

	return data

def get_search_parameters(lat,longi, mealType):
	#See the Yelp API for more details
	params = {}
	params["term"] = mealType
	params["ll"] = "{},{}".format(str(lat),str(longi))
	params["radius_filter"] = "2000"
	params["limit"] = "10"

	return params


def flatten(iterable, ltypes=collections.Iterable):
	remainder = iter(iterable)
	while True:
		first = next(remainder)
		if isinstance(first, ltypes) and not isinstance(first, basestring):
			remainder = IT.chain(first, remainder)
		else:
			yield first


def restaurant(mealType):
	locations = [(39.98,-82.98),(42.24,-83.61),(41.33,-89.13)]
	api_calls = []
	for lat,longi in locations:
		params = get_search_parameters(lat,longi,mealType)
		api_calls.append(get_results(params))
	# flattendAPICalls = flatten(api_calls, 10)
	# pprint.pprint(list(flattendAPICalls))
	# pprint.pprint(len(flattendAPICalls))
	pprint.pprint(api_calls)
	pprint.pprint("**************************************************")
	for topLevel in api_calls:
		for k,v in topLevel:
			#v is a list
			for v_sub in v:
				pprint.pprint(v_sub)


restaurant("breakfast")