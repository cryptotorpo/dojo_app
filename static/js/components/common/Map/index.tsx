import React, { FC, useState } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";

import MapStyles from "./mapStyles.json";
import "./styles.css";
import axios from "axios";
import { devServerUrl } from "../../../utils";
import { countries } from "./country-by-continent";
import { useAppDispatch, useAppSelector } from "../../../redux/configureStore";
import {
  setComputeData,
  setComputeDataContinent,
  setTotalCpuGpu,
} from "../../../redux/slices/computeSlice";

interface MapProps {
  showMarkers: boolean;
  locations?: {
    name: string;
    value: number;
    lat: number;
    lng: number;
  }[];
}

const Map: FC<MapProps> = ({ showMarkers, locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const dispatch = useAppDispatch();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
    // libraries: ["marker", "drawing"],
    mapIds: [process.env.REACT_APP_GOOGLE_MAP_ID!],
  });

  const handleMapClick = async (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setSelectedLocation({ lat, lng });

    // Fetch continent details
    await getContinentFromLatLng(lat, lng);
  };

  const getContinentFromLatLng = async (lat: number, lng: number) => {
    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const country = countries.find(
        (cont) => cont.name.toLowerCase() === data.address.country.toLowerCase()
      );
      if (country) {
        const { data: computeData } = await axios.get(
          `${devServerUrl}compute-type/get-compute-type/${country.region}`
        );

        console.log("computeData", computeData);
        dispatch(setComputeDataContinent(country.region));
        dispatch(setComputeData(computeData.payload));
        dispatch(setTotalCpuGpu(computeData.payload[0].totalPerDay));
      }

      //  if (data.address) {
      //    // Based on the country or region, determine the continent
      //    return getContinentFromCountry(data.address.country_code);
      //  }
    } catch (error) {
      console.error("Error fetching continent:", error);
      return null;
    }
  };

  const getPixelPositionOffset = (
    offsetWidth: number,
    offsetHeight: number,
    labelAnchor: { x: number; y: number }
  ) => {
    return {
      x: offsetWidth + labelAnchor.x,
      y: offsetHeight + labelAnchor.y,
    };
  };

  return isLoaded ? (
    <GoogleMap
      center={{ lat: 30.578485714285715, lng: 37.39117142857143 }}
      zoom={0}
      options={{
        scrollwheel: false,
        styles: MapStyles,
        zoomControl: false,
        // Disable the street view control
        streetViewControl: false,
        // Disable the map type control
        mapTypeControl: false,
        // Disable the fullscreen control

        fullscreenControl: false,
        // maxZoom: 5, // You can adjust this as needed
        // minZoom: 2, // Adjust to limit how far users can zoom out
        restriction: {
          latLngBounds: { north: 85, south: -85, west: -179, east: 180 },
          strictBounds: true,
        },
        disableDoubleClickZoom: true,
      }}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onClick={!showMarkers ? handleMapClick : () => {}}
    >
      {selectedLocation.lat && selectedLocation.lng && (
        <>
          <OverlayView
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(x, y) =>
              getPixelPositionOffset(x, y, { x: -30, y: -15 })
            }
          >
            <div className="home-marker"></div>
          </OverlayView>
        </>
      )}
    </GoogleMap>
  ) : (
    <div></div>
  );
};

export default Map;
