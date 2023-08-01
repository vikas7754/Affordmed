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
    const trainData = response.data;

    const currentTime = new Date();
    const next12Hours = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

    const filteredTrains = trainData.filter((train) => {
      const departureTime = new Date();
      departureTime.setHours(train.departureTime.Hours);
      departureTime.setMinutes(train.departureTime.Minutes);
      departureTime.setSeconds(train.departureTime.Seconds);
      return departureTime > currentTime && departureTime <= next12Hours;
    });

    const processedTrains = filteredTrains.map((train) => {
      const departureTime = new Date();
      departureTime.setHours(train.departureTime.Hours);
      departureTime.setMinutes(train.departureTime.Minutes);
      departureTime.setSeconds(train.departureTime.Seconds);
      const delayInMinutes = train.delayedBy || 0;
      departureTime.setMinutes(departureTime.getMinutes() + delayInMinutes);

      return train;
    });

    const sortedTrains = processedTrains.sort((a, b) => {
      if (a.price.sleeper !== b.price.sleeper) {
        return a.price.sleeper - b.price.sleeper;
      } else if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
        return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
      } else {
        // Sort by departure time in descending order
        const departureTimeA = a.departureTime.getTime();
        const departureTimeB = b.departureTime.getTime();
        return departureTimeB - departureTimeA;
      }
    });

    return res.status(200).json(sortedTrains);
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
