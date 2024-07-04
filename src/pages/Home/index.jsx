import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const getAllPlaces = async () => {
    const res = await axios.get("/places");
    setPlaces([...res.data]);
  };
  useEffect(() => {
    getAllPlaces();
  }, []);
  return (
    <div className="mt-8 gap-x-4 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <div className="rounded-2xl flex mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`http://localhost:3000/uploads/${place.photos[0]}`}
                />
              )}
            </div>
            <h3 className="font-bold ">{place.address}</h3>
            <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
            <div className="mt-1 ">
              <span className="font-bold">${place.price}</span> night
            </div>
          </Link>
        ))}
    </div>
  );
}
