import { useEffect, useState } from "react";
import axios from "axios";
import PhotosUploader from "../../components/PhotosUploader";
import Perks from "../../components/Perks";
import { Navigate, useParams } from "react-router-dom";
export default function PlacesForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1);
  const [redirect, setRedirect] = useState("");

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };
  const inputParagraph = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };
  const preInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputParagraph(desc)}
      </>
    );
  };
  const savePlace = async (e) => {
    e.preventDefault();
    const newPlace = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put(`/places/${id}`, newPlace);
    } else {
      await axios.post("/places", newPlace);
    }

    setRedirect("/account/places");
  };
  useEffect(() => {
    if (id) {
      axios.get(`/places/${id}`).then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setAddress(res.data.address);
        setAddedPhotos(res.data.photos);
        setExtraInfo(res.data.extraInfo);
        setCheckIn(res.data.checkIn);
        setCheckOut(res.data.checkOut);
        setDescription(res.data.description);
        setPerks(res.data.perks);
        setMaxGuests(res.data.maxGuests);
        setPrice(res.data.price);
      });
    }
  }, [id]);
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className=" max-w-6xl mx-auto">
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place , make it short")}
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Address", "Your place Address")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {inputHeader("Photos")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        {preInput("Description", "Tell us about your place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "select all the perks")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra info", "house rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in&out times, max guests",
          "remember to get some time to clean the room"
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Check out time</h3>
            <input
              type="text"
              name=""
              id=""
              placeholder="12:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Max number of guests</h3>
            <input
              type="number"
              name=""
              id=""
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Price for night</h3>
            <input
              type="number"
              name=""
              id=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
