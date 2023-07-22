import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";
import Train from "./components/Train";

function Home() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api");
        setTrains(response.data);
        console.log(response);
        setLoading(false);
      } catch (e) {
        console.log(e?.response?.data?.message || e.message);
        setError(e?.response?.data?.message || e.message);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="container">
      <div className="btn">
        <a href="/train">Get Train By Number</a>
      </div>
      <div>
        <h1>Train List</h1>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {trains.length > 0 &&
        trains.map((train, i) => <Train key={i} train={train} />)}
    </div>
  );
}

export default Home;
