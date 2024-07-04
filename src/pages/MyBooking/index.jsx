/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../../components/AddressLink";
import BookingDates from "../../components/BookingDate";
import PlaceGallery from "../../components/PlaceGallery";

export const MyBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  const getBooking = async () => {
    const res = await axios.get(`/booking/${id}`);
    console.log(res);
    setBooking(res.data);
  };
  useEffect(() => {
    getBooking();
  }, []);
  if (!booking) {
    return "";
  }
  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl">{booking?.placeId.title}</h1>
        <AddressLink className="my-2 block">
          {booking?.placeId.address}
        </AddressLink>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-4">Your booking information:</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="bg-primary p-6 text-white rounded-2xl">
            <div>Total price</div>
            <div className="text-3xl">${booking?.price}</div>
          </div>
        </div>
        <PlaceGallery place={booking?.placeId} />
      </div>
    </div>
  );
};
