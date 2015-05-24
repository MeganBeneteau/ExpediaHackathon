from flask import Flask, request, json, Response
import random
from mealGetter import *
# from exifExtract import exif_extract


app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello world"

@app.route("/location/<lat>/<longi>")
def location(lat, longi):

	# i'm providing you with lat and long
	# use function to get the real city name
	# return to me a STRING with the city name
	return hello1(lat, longi)
	pass


@app.route("/poi/<dist>/<lat>/<lng>")
def poime(dist,lat,lng):
	
	return Response(json.dumps(poi_calculator(dist, lat, lng)),  mimetype='application/json')
	

@app.route("/feelinglucky/<cate>/<lat>/<longi>")
def feelingLucky(cate, lat, longi):

	# this function will return JSON in the following form:
	breakfast = restaurant("breakfast", lat, longi)
	lunch = restaurant("lunch", lat, longi)
	dinner = restaurant("dinner", lat, longi)
	bars = restaurant("bar", lat, longi)

	cate_list = []
	if cate=="artsy":
		cate_list = ["museum", "concert", "gallery"]
	if cate=="romantic":
		cate_list = ["cafe", "date", "park"]
	if cate=="outdoorsy":
		cate_list = ["hike", "mountains", "park"]
	if cate=="foody":
		cate_list = ["restaurant", "gourmet", "cafe"]
	if cate=="sciency":
		cate_list = ["museum", "science", "university"]
	elif cate == "adventurous":
		cate_list = ["park", "water", "high"]


	afternoon = adventure_things_to_do(cate_list, lat, longi)
	morning = adventure_things_to_do(cate_list, lat, longi)

	breakfastOne = random.choice(breakfast)
	lunchOne = random.choice(lunch)
	dinnerOne = random.choice(dinner)
	barOne = random.choice(bars)
	afternoonOne = random.choice(afternoon)
	morningOne = random.choice(morning)

	toBeReturned = {'breakfast': breakfastOne, 'lunch': lunchOne, 'dinner': dinnerOne, 'bar' : barOne, 'morning': morningOne, 'afternoon': afternoonOne}

	# make a filter using category
	# select randomly from the eating places and for the things to do 

	"""
	# result : {
		breakfast: <name of place>, <exact location>, <rating>, <price range>, any other data (image_url)
		morning activity: 
		lunch: same as above
		afternoon activity
		dinner: same as above
		night life
	}	

	"""

	
	return Response(json.dumps(toBeReturned),  mimetype='application/json')

@app.route("/adventureThingsToDo/<lat>/<lng>")
def adv ( lat, lng ):

	return Response(json.dumps(adventure_things_to_do(lat, lng)),  mimetype='application/json')

@app.route("/restaurants/<mealtype>/<lat>/<lng>")
def restuarants(mealtype, lat,lng):
	# make a call here to another file that 
	# print ("4")
	# hello1()
	return Response(json.dumps(restaurant(mealtype, lat, lng)),  mimetype='application/json')

if __name__ == "__main__":
	app.run(debug=True)
