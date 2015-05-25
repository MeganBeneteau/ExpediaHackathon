import json, urllib.request, simplejson, pprint, unicodedata, rauth, itertools as IT, collections, string

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

def adventure_things_to_do(cate=["tour", "walk", "museum"],lat=45.5017, longi=-73.5673):
	cityName = hello1(lat, longi)
	url1 = "http://terminal2.expedia.com/x/activities/search?location="+cityName+"&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk"

	response1 = urllib.request.urlopen(url1)
	temp1 = response1.read().decode("utf-8")
	#print ("got here")
	result_list = []
	data1 = json.loads(temp1)
	data2 = data1['activities']
	for item in data2:
		actID = item['id']
		temp = details(cityName, actID, lat, longi)
		desc = temp['description']
		highlights = temp['highlights']

		if (cate[0] in desc) or (cate[0] in highlights) or (cate[1] in desc) or (cate[1] in highlights) or (cate[2] in desc) or (cate[2] in highlights):
			name = item['title']
			duration = item['duration']
			price = item['fromPrice']
			image_url = item['imageUrl']
			latlng = item['latLng'].split(',')
			lati = latlng[0]
			longi = latlng[1]
			toBeReturned = {'name':name, 'duration': duration, 'price': price, 'image_url': image_url, 'lat': lati, 'longi': longi}
			result_list.append(toBeReturned)
	#pprint.pprint(result_list)
	#pprint.pprint(data2)
	# pprint.pprint(type(cityName))
	# pprint.pprint(cityName)
	return result_list

def details(cityName="Montreal", actID=220707, lat=45.5017, longi=-73.5673 ):
	url1 = "http://terminal2.expedia.com/x/activities/details?activityId="+str(actID)+"&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk"

	response1 = urllib.request.urlopen(url1)
	temp1 = response1.read().decode("utf-8")
	#print ("got here")
	temp1 = ''.join(filter(lambda x: x in string.printable, temp1))
	result_list = []
	data1 = json.loads(temp1)

	try: 
		description = data1['description']
		highlights = data1['highlights']
	except KeyError:
		description=""
		highlights=""

	result = {'description':description, 'highlights': highlights}

	#pprint.pprint(result)
	return result


def poi_calculator(dist=2, lat=45.5017, longi=-73.5673):
	url1 = "http://terminal2.expedia.com/x/geo/features?within="+str(dist)+"km&lng="+str(longi)+"&lat="+str(lat)+"&type=point_of_interest&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk"

	response1 = urllib.request.urlopen(url1)
	temp1 = response1.read().decode("utf-8")
	#print ("got here")
	result_list = []
	data1 = json.loads(temp1)
	for item in data1:
		name = item['name']
		lati = item['position']['coordinates'][1]
		longii = item['position']['coordinates'][0]
		return_item = {'name' : name, 'lat' : lati, 'long' : longii}
		result_list.append(return_item)

	#final_results_list = simplejson.dumps(result_list)
	#pprint.pprint(data1)
	return result_list

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


def restaurant(mealType, lat=45.5017, longi=-73.5673):
	locations = [(lat,longi)]
	api_calls = []
	for lat,longi in locations:
		params = get_search_parameters(lat,longi,mealType)
		api_calls.append(get_results(params))
	# flattendAPICalls = flatten(api_calls, 10)
	# pprint.pprint(list(flattendAPICalls))
	# pprint.pprint(len(flattendAPICalls))
	#pprint.pprint(api_calls)
	# pprint.pprint("**************************************************")
	result_list = []
	for topLevel in api_calls:
		for k,v in topLevel.items():
			#v is a list
			#pprint.pprint(v)
			try:
				for v_sub in v:
					tobereturned = { 'name' : v_sub['name'], 'rating' : v_sub['rating'], 'snippet_image_url':v_sub['snippet_image_url'], 'address' : v_sub['location']['display_address']}
					result_list.append(tobereturned)
			except TypeError:		
					pass
	# pprint.pprint(resto_phone_numbers)
	# pprint.pprint(resto_names)
	# pprint.pprint(result_list)
	#final_results_list = simplejson.dumps(result_list)
	#pprint.pprint(final_results_list)
	#pprint.pprint(type(result_list))
	return result_list

#restaurant("bar")
#poi_calculator(5)
# adventure_things_to_do()
#details()
'''

 'snippet_image_url': 'http://s3-media4.fl.yelpcdn.com/photo/jATr1G4akQEa177uExT
eXA/ms.jpg',
'''


'''
make a filter using categories 

find a way to select options randomly from the list 
'''