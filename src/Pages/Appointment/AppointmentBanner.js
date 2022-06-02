import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function AppointmentBanner({ selected, setSelected, mode }) {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={chair}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="banner"
          />
          <div>
            <DayPicker
              mode={mode}
              selected={selected}
              onSelect={setSelected}
            ></DayPicker>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBanner;
