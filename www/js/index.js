    //  NEED TO MOVE THIS INTO A SEPARATE SCRIPT!

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
        var posts_url = "http://terminal2.expedia.com/x/activities/search?location="+myLocation+"&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk";
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

      
      var myLocation;

      navigator.geolocation.getCurrentPosition( function(position) { 
          $.ajax({
            type: "GET",
            url: "http://localhost:5000/location/"+position.coords.latitude+"/"+position.coords.longitude,
            success: function(data) {
              myLocation = data;
              $('#curr-loc').append(myLocation);
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

