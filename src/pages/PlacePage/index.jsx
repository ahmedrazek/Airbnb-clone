import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookingWidget from "../../components/BookingWidget";
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const getPlace = async () => {
    const res = await axios.get(`/places/${id}`);
    console.log(res);
    setPlace(res.data);
  };
  useEffect(() => {
    getPlace();
    console.log(place);
  }, []);
  // if (showPhotos) {
  //   return (
  //     <div className=" absolute inset-0 text-white min-h-screen">
  //       <div className="bg-black p-8 grid gap-4">
  //         <div>
  //           <h2 className="text-2xl">Photos of {place.title}</h2>
  //           <button
  //             onClick={() => setShowPhotos(false)}
  //             className="right-12 top-8 fixed flex gap-1 py-2 px-4 bg-transparent"
  //           >
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               strokeWidth={1.5}
  //               stroke="currentColor"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
  //               />
  //             </svg>
  //             Close Photo
  //           </button>
  //         </div>
  //         {place?.photos?.length > 0 &&
  //           place.photos.map((photo) => (
  //             <div key={photo} className=" ">
  //               <img
  //                 src={`http://localhost:3000/uploads/${photo}`}
  //                 alt="place"
  //                 className=" rounded-xl w-full h-full object-cover"
  //               />
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="mt-6 bg-gray-50 -mx-8 px-8 py-8">
        <h1 className="text-3xl">{place?.title}</h1>
        <a
          className="my-2 font-semibold underline flex gap-1"
          target="_blank"
          href={`https://maps.google.com/?q=${place?.address}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          {place?.address}
        </a>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr]">
            <div>
              {place?.photos[0] && (
                <div>
                  <img
                    src={`http://localhost:3000/uploads/${place?.photos[0]}`}
                    className=" aspect-square object-cover"
                  />
                </div>
              )}
            </div>
            <div className="grid">
              {place?.photos[1] && (
                <img
                  src={`http://localhost:3000/uploads/${place?.photos[1]}`}
                  className="aspect-square object-cover"
                />
              )}
              <div className=" overflow-hidden">
                {place?.photos[2] && (
                  <img
                    src={`http://localhost:3000/uploads/${place?.photos[2]}`}
                    className="aspect-square object-cover relative top-2"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setShowPhotos(true);
            }}
            className="flex gap-2 items-center   text-sm absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl border border-black shadow-md shadow-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Show All Photos
          </button>
        </div>
        <div className="mt-8 gap-6 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="border-b border-gray-300 pb-10">
            <div className="my-4 border-b border-gray-300 pb-10">
              <h2 className="font-semibold text-2xl">Description</h2>
              <p>{place?.description}</p>
            </div>
            Check-in: {place?.checkIn} <br />
            Check-out: {place?.checkOut} <br />
            Max number of guests: {place?.maxGuests}
          </div>
          <BookingWidget place={place} />
          <div className="text-sm text-gray-700 leading-4 my-4 border-b border-gray-300 pb-10">
            <h2 className="font-semibold text-2xl mb-2">Extra info</h2>
            {place?.extraInfo}
          </div>
        </div>
      </div>
      {showPhotos && (
        <div className=" absolute inset-0 text-white min-h-screen">
          <div className="bg-black p-8 grid gap-4">
            <div>
              <h2 className="text-2xl">Photos of {place.title}</h2>
              <button
                onClick={() => setShowPhotos(false)}
                className="right-12 top-8 fixed flex gap-1 py-2 px-4 bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                Close Photo
              </button>
            </div>
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <div key={photo} className=" ">
                  <img
                    src={`http://localhost:3000/uploads/${photo}`}
                    alt="place"
                    className=" rounded-xl w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
