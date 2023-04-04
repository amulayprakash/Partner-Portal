import React, { useEffect,useState, useRef } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Circle, Marker } from "react-google-maps"


const loadGoogleMapScript = (callback) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      callback();
    } else {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC1Pvr48I2HbIYb_RdRLQ0gsCoY_xE6dLE`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", callback);
    }
}

const Gmap = ({loadMap,setLoadMap,markers}) => {
    
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    loadGoogleMapScript(() => {setLoadMap(true)})
  },[])

  const iconList = {
    icon1: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
    icon2: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon3: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
    icon4: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
  }

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds()
    if(markers?.length>0){
        markers?.map((x) => {
            const marker=createMarker({lat: x.latitude, lng: x.longitude, icon:iconList.icon1})
            bounds.extend(marker.position)
        })
    }
    googleMap.fitBounds(bounds)
  }, []);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: {lat: 22.5726, lng: 88.3639 },
      zoom: 8
    });
  }

  // create marker on google map
//   const createMarker = () => new window.google.maps.Marker({
//     position: {lat: 34.052235, lng: -118.243683 },
//     map: googleMap
//   });

  const createMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
        url: markerObj.icon,
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50)
      }
  });

  return <div
    ref={googleMapRef}
    style={{ width: 600, height: 500 }}
  />
}

export default Gmap;