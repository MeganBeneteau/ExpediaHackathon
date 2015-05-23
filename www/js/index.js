/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

var app = {
    posts_url: "http://terminal2.expedia.com/x/activities/search?location=London&startDate=2015-08-08&endDate=2015-08-18&apikey=<API KEY>",

    onDeviceReady: function() {
        console.log('Device is ready');
        app.readPosts();
    },

    readPosts: function() {
        console.log('Reading posts');
        $.ajax({
            type: "GET",
            dataType: "json",
            url: app.posts_url,
            success: app.onSuccess,
            error: app.onError
        });

        console.log('Reading posts asynchrounously');
    },

    onSuccess: function(data) {
        var items = [];
        $.each(data.activities, function(key, val){
            items.push('<a href="' + app.posts_url + val.id + '">' + val.id + ' - ' +val.title + ' <img src="'+val.imageUrl+'" /></a>');
        });
        $('#posts').html(items.join('<br/>'));
        console.log('Exiting onSuccess');
    },

    onError: function(data, textStatus, errorThrown) {
        console.log('Data: ' + data);
        console.log('Status: ' + textStatus);
        console.log('Error: ' + errorThrown);
        $("#posts").html('Error while loading posts');
        console.log('Exiting onError');
    }
};

$(document).ready(function() { 
    // jQuery is properly loaded at this point
    // so proceed to bind the Cordova's deviceready event
    //app.readPosts();
    $(document).bind('deviceready', app.onDeviceReady); 
});