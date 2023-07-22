import "./style.css";
function Train({ train }) {
  return (
    <div className="train-data">
      <div className="title">
        {train.trainNumber} - {train.trainName}
      </div>
      <div className="footer">
        <div>
          Departure: {train.departureTime.Hours}:{train.departureTime.Minutes}:
          {train.departureTime.Seconds},
        </div>
        <div>Delay : {train.delayedBy} M</div>
      </div>
      <div className="coach-container">
        <div className="coach">
          <div className="type">SL</div>
          <div className="availability">
            Available : <span>{train.seatsAvailable.sleeper}</span>
          </div>
          <div className="price">
            Price : <span>{train.price.sleeper}</span> ₹
          </div>
        </div>
        <div className="coach">
          <div className="type">AC</div>
          <div className="availability">
            Available : <span>{train.seatsAvailable.AC}</span>
          </div>
          <div className="price">
            Price : <span>{train.price.AC}</span> ₹
          </div>
        </div>
      </div>
    </div>
  );
}

export default Train;
