from flask import Flask, request, json, Response
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
	

@app.route("/feelinglucky/<lat>/<longi>")
def feelingLucky(lat, longi):

	# this function will return JSON in the following form:
	breakfast = restaurants("breakfast", lat, longi)
	lunch = restaurants("lunch", lat, longi)
	dinner = restaurants("dinner", lat, longi)
	bars = restaurants("bar", lat, longi)
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

	pass




@app.route("/restaurants/<mealtype>/<lat>/<lng>")
def restuarants(mealtype, lat,lng):
	# make a call here to another file that 
	# print ("4")
	# hello1()
	return Response(json.dumps(restaurant(mealtype, lat, lng)),  mimetype='application/json')

if __name__ == "__main__":
	app.run(debug=True)
