from flask import Flask 
from mealGetter import hello1

app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello world"

@app.route("/location/<lat>/<long>")
def location(lat, long):

	# i'm providing you with lat and long
	# use function to get the real city name
	# return to me a STRING with the city name

	pass

@app.route("/feelinglucky/<lat>/<long>")
def feelingLucky(lat, long):

	# this function will return JSON in the following form:
	"""
	# result : {
		breakfast: <name of place>, <exact location>, <rating>, <price range>, any other data
		morning activity: 
		lunch: same as above
		afternoon activity
		dinner: same as above
		night life
	}	

	"""

	pass



@app.route("/restaurants/<long>/<lat>")
def restuarants():
	# make a call here to another file that 
	print ("4")
	hello1()

if __name__ == "__main__":
	app.run()