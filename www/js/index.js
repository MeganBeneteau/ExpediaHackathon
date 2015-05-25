    //  NEED TO MOVE THIS INTO A SEPARATE SCRIPT!
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

      function genericErrorHandler ( data , textStatus , errorThrown ) {
        console.log(data)
        App.dialog({
          title        : data.status+' '+data.statusText || 'error occured',
          text         : data.responseText || data.response || 'unknown error',
          okButton     : 'Try Again',
          cancelButton : 'Cancel'
        }, function (tryAgain) {
          if (tryAgain) {
          // try again
          console.log('not implemented yet');
        }
        });

      }
      var populate;
      App.controller( 'home' , function ( page ) {
        
        if(populate){
          $('#main-posts').html(populate.join(''));
        }

        this.transition = 'slide-up'
        var posts_url = "http://terminal2.expedia.com/x/activities/search?location="+myLocation.real+"&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk";
        console.log('Reading posts');
        $.ajax({
            type: "GET",
            dataType: "json",
            url: posts_url,
            success: function(data) {
              var items = [];
              $.each(data.activities, function(key, val){

                items.push('<li class="fl-main-list" style="background:url(http:'+val.imageUrl+') center center no-repeat">'+
                    '<div class="fl-list-internal">'+
                    '<h3><a href="' + posts_url + val.id + '">'+val.title + '</a>' +
                    '<small><i class="fui-time"></i> ' + val.duration + ' </small> ' +
                    '</h3>' + 
                    '</div>' + 
                    '</li>' +
                    '');
              });
              $('#main-posts').html(items.join(''));

              populate = items;
              console.log('Exiting onSuccess');
            },
            error: genericErrorHandler
        });
      });

      params = { selectedcat:'what' }
      App.controller('feeling-lucky-page', function (page) {
        // put stuff here
        this.transition = 'slide-up';

      });

      App.controller('feeling-lucky-cate', function (page) {
        this.transition = 'slide-left';
        
        setTimeout(function(){
          $('#feeling-lucky-title').html(params.selectedcat);


          function initialize() {
            //this is totally custimizable
            directionsDisplay = new google.maps.DirectionsRenderer();
            var chicago = new google.maps.LatLng(myLocation.lat, myLocation.lng);
            var mapOptions = {
              zoom:7,
              center: chicago
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            directionsDisplay.setMap(map);


            $.ajax({
              type: "GET",
              dataType: "json",
              url : 'http://localhost:5000/feelinglucky/'+params.selectedcat+'/'+myLocation.lat+'/'+myLocation.lng,
              success: function(data) {

                var items = [];

                var destinations = []
                $.each(data, function(key, value) {
                  items.push('<h3>'+key+'</h3><ul class="app-list">');
                    items.push('<li class=""><div class="fl-list-internal>'+
                      '<h3><a href="#"">'+value.name+'</a></h3>'+
                      '</div></li>');
                    if(value.longi){
                      destinations.push({'lg':value.longi, 'lt': value.lat});
                    }
                    items.push('</ul>')
                });
                  $('#cap').html(items.join(''));

                  console.log('done~~~');
                  calcRoute(destinations);
                  console.log(destinations);

              }, error: genericErrorHandler
            });
            //41.850033, -87.6500523
            // $('[name="gm-master"').
          }

          


          initialize();

        }, 100)        
        // $.ajax({
        //     type: "GET",
        //     url: "http://localhost:5000/feelinglucky/"+params.selectedcat+"/"+position.coords.latitude+"/"+position.coords.longitude,
        //     success: function(data) {
        //       myLocation = data;

        //     },
        //     error: genericErrorHandler
        // });


      });


      App.controller('page3' , function (page) {
        this.transition = 'slide-up';

        genericErrorHandler({status:'1', responseText:'This feature is not implemented yet'});
      });

      
      var myLocation = {};

      navigator.geolocation.getCurrentPosition( function(position) { 
          $.ajax({
            type: "GET",
            url: "http://localhost:5000/location/"+position.coords.latitude+"/"+position.coords.longitude,
            success: function(data) {

              myLocation.real = data;

              myLocation.lat = position.coords.latitude;
              myLocation.lng = position.coords.longitude;

              $('#curr-loc').append(myLocation.real);
              $('#loading-page').remove();
              try {
                App.restore();
              } catch (err) {
                App.load('home');
              }
            },
            error: genericErrorHandler
        });
        console.log(position.coords);
        
      }, genericErrorHandler);

      function setParam(param){
        params.selectedcat = param;
        console.log('set param to '+param);
        App.load('feeling-lucky-cate');
        console.log(params)
      }


      // //// CALC ROUTE
      function calcRoute(points) {
            //var start = document.getElementById('start').value;
            //var end = document.getElementById('end').value;
            console.log(points[0]);
            var orig= new google.maps.LatLng(points[0].lt, points[0].lg);
            var len=points.length;
            var dest = new google.maps.LatLng(points[len-1].lt, points[len-1].lg);
            var i;
            var midPoints=[];
            for(i=1;i<len-1;i++){
              var mid = new google.maps.LatLng(points[i].lt, points[i].lg);
              midPoints.push(mid);
            }
            var request = {
                //origin:points[0],
                //destination:points[len-1],
                origin:orig,
                destination:dest,
                waypoints:midPoints,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              }
            });
          }
