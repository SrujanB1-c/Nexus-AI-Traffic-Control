import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_TOKEN;

export default function TrafficMap() {

  const mapContainer = useRef();

  useEffect(() => {

    const map = new mapboxgl.Map({

      container: mapContainer.current,

      style:
        "mapbox://styles/mapbox/dark-v11",

      center: [73.8567, 18.5204],

      zoom: 12
    });

    return () => map.remove();

  }, []);

  return (
    <div
      ref={mapContainer}
      className="h-full w-full"
    />
  );
}