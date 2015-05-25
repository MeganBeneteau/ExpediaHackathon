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
      App.controller( 'home' , function ( page ) {
        this.transition = 'scale-in'
        var posts_url = "http://terminal2.expedia.com/x/activities/search?location=Montreal&apikey=JQRFMzp3A0UwRA24DxdRA9HVGI2BU3Fk";

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
              console.log('Exiting onSuccess');
            },
            error: genericErrorHandler
        });
      });

      App.controller('page2', function (page) {
        // put stuff here
        this.transition = 'scale-in';

        navigator.geolocation.getCurrentPosition( function( position ) {
            console.log( position.coords.latitude + ' ' + position.coords.longitude );
        });
      });

      App.controller('page3' , function (page) {
        this.transition = 'slide-up';
      });


      //// ------> UNCOMMENT THIS STUFF <------ ////
      function getPhoto(source){

            // navigator.camera.getPicture(onPhotoSuccess, function(message){ console.log(message) }, {
            //     quality:90,
            //     encodingType: Camera.EncodingType.JPEG,
            //     destinationType: navigator.camera.DestinationType.FILE_URI,
            //     sourceType: source 
            // });
    var opts = {
    encodingType: Camera.EncodingType.JPEG,
    sourceType: source,
    destinationType: Camera.DestinationType.NATIVE_URI
};
            navigator.camera.getPicture(
        function(imageURI) {
            console.log(window.resolveLocalFileSystemURL(imageURI,
                    function(entry) {
                      console.log(entry);
                        entry.file(function(file) {
                            EXIF.getData(file, function() {
                                var datetime = EXIF.getTag(this, "DateTimeOriginal");
                                alert(datetime);
                            });                                                

                            // do something useful....

                        }, genericErrorHandler);
                    },
                    function(e, m) {
                        alert('Unexpected error obtaining image file.');
                        console.log(e)
                        genericErrorHandler(e, m);
                    }));
        },
        function() {
            // nada - cancelled
        },
        opts);
            $('#fl-photo-picker').append($('input[type="file"]'));
        }

        var detail = {data:''}
        function onPhotoSuccess(imageURI){

            var ima = $('#my-image');
            ima.attr('src', 'data:image/jpeg;base64,'+imageURI);
            console.log('before cordova');
          

            // THIS DOESN't WORK....
            CordovaExif.readData( imageURI , function ( exifObject ) {
                console.log('hello');
                console.log(exifObject);
                console.log('goodbye');
            });
      

            console.log('after cordova');
        }

      try {
        App.restore();
      } catch (err) {
        App.load('home');
      }