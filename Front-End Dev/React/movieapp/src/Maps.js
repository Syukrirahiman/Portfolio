import React, { Component } from 'react'
import './Maps.css'

import axios from 'axios'

class Maps extends Component {


  constructor(props) {
    super(props)
    this.state = {
      destination_value: this.props.location.state.destination_value,
      destination: { lat: this.props.location.state.destination_value.lat, lng: this.props.location.state.destination_value.lon },
      apikey: 'YOUR_API_KEY_HERE',
      curr_loc: '',
    };
    this.showPosition = this.showPosition.bind(this);

}

  componentDidMount() {
    // this.getVenues()
    this.renderMap()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
  } 
  }

  mDisplay() {
    document.getElementById("map").style.marginRight = "400px";
    document.getElementById("right-panel").style.height = "100vh";
  }
  showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    console.log(lat)
    console.log(lng)

    var xhr = new XMLHttpRequest();


    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key="+this.state.apikey;
    xhr.addEventListener('load', () => {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp)
      var address = resp.results[0].address_components[0].long_name + " " + resp.results[0].address_components[1].long_name
      this.setState({
          curr_loc: address,
      });
  })

  xhr.open('GET', url);
  xhr.send();

}

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key="+this.state.apikey+"&callback=initMap")
    window.initMap = this.initMap
  }

 

  initMap = () => {
    var location = this.state.destination;
    // Create A Map
    var directionsRenderer = new window.google.maps.DirectionsRenderer({ draggable: true });
    var directionsService = new window.google.maps.DirectionsService;
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
      center: location
    })
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('right-panel'));

    var control = document.getElementById('floating-panel');
    control.style.display = 'block';
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(control);

    var marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: 'Cinema Here!'
    });

    // GET CARPARKS NEARBY (PLACES API)
    var loc_lat = location.lat;
    var loc_lng = location.lng;
    var places_loc = loc_lat + " " + loc_lng;
    var baseurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+places_loc+"&radius=1000&type=parking&key="+this.state.apikey;
    var request = new XMLHttpRequest();
    request.open('GET', baseurl, true)
    request.onload = function () {
      var data = JSON.parse(this.response)
      var cp_array = data.results;
      for (var cp of cp_array) {
        var lat = cp.geometry.location.lat;
        var lng = cp.geometry.location.lng;
        marker = new window.google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          icon: {
            url: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
          },
          title: `${cp.name}`
        });

        // PARTS BELOW WERE PREVIOUSLY USED TO ATTEMPT TO GET A MATCH FROM DIFFERENT APIS
        // lat = lat + " ";
        // lng = lng + " ";
        // lat = lat.slice(0,4);
        // lng = lng.slice(0,6);
        // var latlng = lat + " " + lng;
        // var address = cp.name;
        // var cp_position = lat + " " + lng;

        // DISPLAY CARPARKS IN DROPDOWN LIST
        // document.getElementById("cp_choices").innerHTML += `<option value="${latlng}">${address}</option>`

      }
    }

    request.send()

    var onChangeHandler =  () => {
      this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    // WHEN SUBMIT BUTTON IS CLICK, RENDERS DIRECTION SERVICE
    document.getElementById('submit').addEventListener('click', onChangeHandler);


  }

  calculateAndDisplayRoute (directionsService, directionsRenderer) {
    console.log("here")
    var start = document.getElementById('start').value;
    var mode = document.getElementById('mode').value;
  
  
    // INSERT CINEMA LOCATION HERE AGAIN
    var end = this.state.destination;
  
  
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: mode
    }, function (response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    
  }
 


  render() {
    return (
      <div style = {{height:"auto"}}>
        <div id="floating-panel">
          <strong>Start:</strong>
          <input type="text" name="start" id="start" defaultValue ={this.state.curr_loc}/>
          <br />
          <strong>Mode of Travel: </strong>
          <select id="mode">
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
          <button type="button" onClick={this.mDisplay} className="btn btn-light" id="submit">GO</button>

        </div>
        <div id="right-panel"></div>
        <div id="map"></div>

        <div id="availability"></div>

      </div>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}



export default Maps;