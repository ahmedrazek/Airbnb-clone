/* eslint-disable react/prop-types */
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfDays = 0;
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    numberOfDays = differenceInCalendarDays(checkOutDate, checkInDate);
  }
  const bookPlace = async () => {
    try {
      const res = await axios.post("/booking", {
        checkIn,
        checkOut,
        numberOfGuests,
        price: numberOfDays * place?.price,
        name,
        phone,
        placeId: place?._id,
      });
      setRedirect(res.data._id);
    } catch (error) {
      console.log(error, error);
    }
  };
  if (redirect) {
    console.log("hello");
    return <Navigate to={`/account/bookings/${redirect}`} />;
  }
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl border">
        <div className="text-xl text-center">
          Price: ${place?.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex border-b">
            <div className=" py-4 px-4">
              <label htmlFor="">Check in :</label>
              <input
                type="date"
                name=""
                id=""
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className=" py-2 px-4 border-l ">
              <label htmlFor="">Check out :</label>
              <input
                type="date"
                name=""
                id=""
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className=" py-2 px-4 border-l ">
            <label htmlFor="">Number of guests :</label>
            <input
              type="number"
              name=""
              id=""
              max={place?.maxGuests}
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          <div className=" py-2 px-4 border-l ">
            <label htmlFor="">Name :</label>
            <input
              type="text"
              name=""
              id=""
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className=" py-2 px-4 border-l">
            <label htmlFor="">Phone :</label>
            <input
              type="tel"
              name=""
              id=""
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary mt-4" onClick={bookPlace}>
          Book this place for{" "}
          {numberOfDays > 0 && <span>{numberOfDays * place?.price}</span>}
        </button>
      </div>
    </div>
  );
}
