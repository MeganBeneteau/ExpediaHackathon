    //  NEED TO MOVE THIS INTO A SEPARATE SCRIPT!

      function genericErrorHandler ( data , textStatus , errorThrown ) {
        console.log(data)
        App.dialog({
          title        : data.status+' '+data.statusText,
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
      App.controller( 'home' , function ( page ) {
        this.transition = 'scale-in'
        var posts_url = "http://terminal2.expedia.com/x/activities/search?location=Montreal&startDate=2015-08-08&endDate=2015-08-18&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk";

        console.log('Reading posts');
        $.ajax({
            type: "GET",
            dataType: "json",
            url: posts_url,
            success: function(data) {
              var items = [];
              $.each(data.activities, function(key, val){
                items.push('<li class="fl-main-list" style="background:url(http:'+val.imageUrl+') center center no-repeat">'+
                    '<div class="fl-list-internal"><h1><a href="' + posts_url + val.id + '">'+val.title + '</a></h1></div></li>' +
                    '');
              });
              $('#main-posts').html(items.join(''));
              console.log('Exiting onSuccess');
            },
            error: genericErrorHandler
        });
      });

      App.controller('page2', function (page) {
        // put stuff here
        this.transition = 'scale-in';
      });

      App.controller('page3' , function (page) {
        this.transition = 'slide-up';
      });

      try {
        App.restore();
      } catch (err) {
        App.load('home');
      }