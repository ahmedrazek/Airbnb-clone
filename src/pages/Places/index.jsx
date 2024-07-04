import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Places() {
  const [places, setPlaces] = useState([]);
  const getPlaces = async () => {
    const res = await axios.get("/my-places");
    console.log(res);
    setPlaces(res.data);
  };
  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <div>
      <div className="text-center">
        <Link
          to={"new"}
          className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className=" flex gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className=" object-cover"
                    src={`http://localhost:3000/uploads/${place.photos[0]}`}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className=" text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
