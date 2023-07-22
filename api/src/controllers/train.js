const axios = require("axios");

const getToken = async () => {
  try {
    const data = {
      companyName: "Train Central",
      ownerName: "Vikas",
      rollNo: "2001920100321",
      ownerEmail: "vikask4590@gmail.com",
      clientID: "2c410227-5dae-46aa-bba4-257e8a50ff73",
      clientSecret: "GaZQntPiyJbzjrRN",
    };
    const response = await axios.post("http://20.244.56.144/train/auth", data);
    if (!response) throw new Error("No token found");
    return response.data.access_token;
  } catch (err) {
    throw err;
  }
};

const getAllTrains = async (req, res) => {
  try {
    const token = await getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "http://20.244.56.144/train/trains",
      config
    );
    if (!response) return res.status(404).json({ message: "No trains found" });
    const trains = response.data;
    const validTrains = trains.filter(
      (train) => train.departureTime.Hours > 12
    );
    if (validTrains.length === 0)
      return res.status(404).json({ message: "No trains found" });
    return res.status(200).json(validTrains);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
    const token = await getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://20.244.56.144/train/trains/${id}`,
      config
    );
    if (!response) return res.status(404).json({ message: "No train found" });
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTrains, getTrainById };
