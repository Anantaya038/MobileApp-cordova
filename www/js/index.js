var ltd ;
var lgt ; 





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


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}
 
$("#location").click(function(){        
  
});   


 
var photoURL = null;
var db;
$(function(){

  var config = {
    apiKey: "AIzaSyDOCKa2SvxCmmjbuvpHzrtis6Q0SYlnXSY",
    authDomain: "psupin-f7b8a.firebaseapp.com",
    databaseURL: "https://psupin-f7b8a.firebaseio.com",
    projectId: "psupin-f7b8a",
    storageBucket: "psupin-f7b8a.appspot.com",
    messagingSenderId: "372045994243"
  };
  firebase.initializeApp(config);
}); 
  //---------------------------------------------------------------------
  
  



function cam() {

   
     
     var storage = firebase.storage();
     var storageRef = firebase.storage().ref();
    
    
     navigator.camera.getPicture(onSuccess, onFail, {
       quality: 50,
       destinationType: Camera.DestinationType.DATA_URL
     });
   
     function onSuccess(imageURI) {
       
       
    
    
var base64str = imageURI;
var binary = atob(base64str.replace(/\s/g, ''));
var len = binary.length;
var buffer = new ArrayBuffer(len);
var view = new Uint8Array(buffer);
for (var i = 0; i < len; i++) {
view[i] = binary.charCodeAt(i);  
}         
var blob = new Blob( [view], { type: "image/jpeg" });


var timestamp = Number(new Date());
var photoRef = storageRef.child("photos/"+ timestamp+ ".png");


      
      photoRef.put(blob).then(function (snapshot) {
      photoRef.getDownloadURL().then(function (url) {
      photoURL = url;
          alert("Take a photo complete! ");
          $("#preview").attr("src", url);
      })
  });
}
     function onFail(message) {
       alert('Failed because: ' + message);
       
     }
   
}

  
//-------------------------------------------CAMERA----------------------------------------------




function locate(){
  var onSuccess = function(position) {
    ltd=position.coords.latitude;
    lgt=position.coords.longitude;
    alert("Latitude : "+ltd+"\n"+"Longitude : "+lgt);
    alert('Add location complete');
    
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);


}

function add(){

  var description = document.getElementById('description').value;
  var timestamp = Number(new Date());
  
  console.log(description);
  var db = firebase.firestore();
  db.collection("pins").doc("'"+timestamp+"'").set({
    id: timestamp,
    photo: photoURL,
    description: description,
    lat: ltd,
    long: lgt
    
  })
alert("Photo URL : "+photoURL+"\n"+"Description : "+description+"\n"+"Latitude : "+ltd+"\n"+"Longitude : "+lgt);
alert('Upload Complete');
location.reload('index.html');
}

$(function(){

var db = firebase.firestore();   
var mus = $('#template').html();
var firestoreRef = db.collection("pins");
firestoreRef.orderBy("id", "desc").get().then(function(querySnapshot) {
  console.log(querySnapshot);
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        db.collection("pins").doc(doc.id).update({
          id: doc.id
        })
        var rendered = Mustache.render(mus, doc.data());
        $("#pins").append(rendered);
        
          

    });
})  
//-----------------------------------------Getlocation----------------------------------------------

navigator.geolocation.getCurrentPosition(onSuccess, onError);



});
function onSuccess(position) {
  ltd=position.coords.latitude;
  lgt=position.coords.longitude;
  alert("Latitude : "+ltd+"\n"+"Longitude : "+lgt);
 
  
};

// onError Callback receives a PositionError object
//
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


var like = function(num) {
  if (document.getElementById("button-post-like-"+num).classList.contains("like")) {
    document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart","like");
    document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart-outline");
  } else {
    document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart-outline");
    document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart","like");
    document.getElementById("post-like-"+num).style.opacity = 1;

    setTimeout(function(){
      document.getElementById("post-like-"+num).style.opacity = 0;
    }, 600);
  }
}


              function initMap() {
               
                var uluru = {lat: 7.892804, lng: 98.351697};
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 16,
                  center: uluru
                });
                var marker = new google.maps.Marker({
                  position: uluru,
                  map: map
                });
                $('#locate').click(function(){
                  var uluru = {lat: ltd, lng: lgt};
                  var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 16,
                    center: uluru
                  });
                  var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                  });
                                  });
              }

//-------------------------------------delete post---------------------------------------------
              function deletePost(id){
                console.log(id);
                var did = id;
                var db = firebase.firestore();
                
                db.collection("pins").doc(did).delete().then(function() {
                  console.log("Document successfully deleted!");
                  alert('Delete post complete!');
                  location.reload('index.html');

                }).catch(function(error) {
                  console.error("Error removing document: ", error);
                });
              
              }