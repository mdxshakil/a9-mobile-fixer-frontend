import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../../assets/marker.png";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Fade } from "react-awesome-reveal";

const OurLocationSection = () => {
  const markers = [
    {
      id: 1,
      geocode: [23.7512, 90.3906],
      popup: "Bashundhara shopping mall",
    },
    {
      id: 2,
      geocode: [23.778, 90.3145],
      popup: "SKS Shopping mall",
    },
    {
      id: 3,
      geocode: [23.8135, 90.42],
      popup: "Jamuna future park",
    },
  ];
  const customIcon = new Icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 38],
  });
  return (
    <Fade>
      <div className="container my-12 mx-auto px-3 md:px-6">
      <section className="mb-32 text-center">
        <h2 className="mb-12 text-3xl font-bold">Visit our branches</h2>
        <div className="grid grid-cols-1">
          <MapContainer center={[23.8041, 90.4152]} zoom={12}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.geocode as [number, number]}
                  icon={customIcon}
                >
                  <Popup>{marker.popup}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </section>
    </div>
    </Fade>
  );
};

export default OurLocationSection;
