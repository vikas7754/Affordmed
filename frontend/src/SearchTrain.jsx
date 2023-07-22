import { useState } from "react";
import "./App.css";
import axios from "axios";

function SearchTrain() {
  const [number, setNumber] = useState();
  const [train, setTrain] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const getTrain = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/train/${number}`
      );
      setTrain(response.data);
      setLoading(false);
      setError("");
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="search">
      <div className="btn">
        <a href="/">Home</a>
      </div>
      <h1 style={{ margin: "20px 0" }}>Search Train</h1>
      <form action="" onSubmit={getTrain}>
        <input
          type="number"
          placeholder="Train number"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="train-details">
        {loading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        {train && (
          <div className="train-details">
            <div className="title">
              {train.trainName} - {train.trainNumber}
            </div>
            <div>
              Departure Time : {train.departureTime.Hours}:
              {train.departureTime.Minutes}:{train.departureTime.Seconds}
            </div>
            <div>Sleeper Availability : {train.seatsAvailable.sleeper}</div>
            <div>AC Availability : {train.seatsAvailable.AC}</div>
            <div className="price-data">
              Price :<div>AC: {train.price.AC} ₹</div>
              <div>Sleeper : {train.price.sleeper} ₹</div>
            </div>
            <div>Delay : {train.delayedBy} minutes</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchTrain;
