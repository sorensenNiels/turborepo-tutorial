/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@nodesoft/ui';
import { useJsApiLoader } from '@react-google-maps/api';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

const apiKey = 'AIzaSyDWZzTgPFaWVRQCo4bRqYD4IF2Jkcv-ENw';

const containerStyle = {
  width: '50em',
  height: '50em'
};

const center = {
  lat: 38.685,
  lng: -115.234
};

const position = { lat: 33.772, lng: -117.214 };

const GoogleMapTracking = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = useState(null);
  const [location, setLocation] = useState<google.maps.LatLng>();

  // const onLoad = useCallback(function callback(map) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     setLocation({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     });
  //   });
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  const onUnmount = useCallback(function callback(map: unknown) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <h1>Google Heat Map</h1>
      <h2>
        <Link href="/">
          <a>
            <Button>Back to home</Button>
          </a>
        </Link>
      </h2>

      {/* <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onUnmount={onUnmount}
      >
        <Marker position={position}></Marker>
      </GoogleMap> */}
    </>
  ) : (
    <></>
  );
};

export default GoogleMapTracking;
