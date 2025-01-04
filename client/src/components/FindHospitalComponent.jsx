import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "leaflet-routing-machine"; // Import routing machine

// Reset default Leaflet icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom icon for the user's location
const userLocationIcon = L.divIcon({
  className: "custom-location-icon",
  html: `<div class="flex w-8 h-8 bg-emerald-500 rounded-full border-2 border-white shadow-md place-content-center items-center font-bold">You</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const FindHospitalComponent = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [map, setMap] = useState(null);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const [lat, lon] = location;
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:2000,${lat},${lon});out;`;

      axios
        .get(overpassUrl, { withCredentials: false })
        .then((response) => {
          const hospitalData = response.data.elements.map((element) => ({
            id: element.id,
            name: element.tags.name || "Unnamed Hospital",
            lat: element.lat,
            lon: element.lon,
          }));
          setHospitals(hospitalData);
        })
        .catch((error) => {
          console.error("Error fetching hospital data:", error);
        });
    }
  }, [location]);

  // Function to calculate and display route
  const calculateRoute = (hospitalLocation) => {
    if (map && location) {
      L.Routing.control({
        waypoints: [
          L.latLng(location[0], location[1]), // User's current location
          L.latLng(hospitalLocation[0], hospitalLocation[1]), // Selected hospital location
        ],
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1", // OSRM backend
        }),
      }).addTo(map);
    }
  };

  return (
    <div className="absolute bg-purple-200 ml-[200px] top-0 w-[calc(100vw-200px)] h-[calc(100vh-70px)] z-10">
      <div className="h-full w-full z-10">
        {location ? (
          <MapContainer
            center={location}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={setMap} // Store the map instance
          >
            {/* Map tiles from OpenStreetMap */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* User's current location marker with custom icon */}
            <Marker position={location} icon={userLocationIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Markers for nearby hospitals */}
            {hospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                position={[hospital.lat, hospital.lon]}
                eventHandlers={{
                  click: () => calculateRoute([hospital.lat, hospital.lon]), // Calculate route on click
                }}
              >
                <Popup>
                  <strong>{hospital.name}</strong>
                  <br />
                  <button
                    onClick={() => calculateRoute([hospital.lat, hospital.lon])}
                    className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Get Directions
                  </button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default FindHospitalComponent;