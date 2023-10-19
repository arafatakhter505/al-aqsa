import { useEffect, useState } from "react";
import dev from "../../config";

const TrainerInfo = ({ id }) => {
  const [trainer, setTrainer] = useState({});

  useEffect(() => {
    fetch(`${dev.serverUrl}/api/batch/id/${id}`, {
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTrainer(data.batch.trainer));
  }, []);

  return (
    <div className="bg-white p-5 shadow rounded-md md:flex items-center justify-between">
      <h2 className="font-semibold text-xl mb-2 md:mb-0">
        Trainer Information
      </h2>
      <h3>Name: {trainer?.trainerName}</h3>
      <h3>
        Contact:{" "}
        <a href={`tel:0${trainer?.trainerContact}`}>
          0{trainer?.trainerContact}
        </a>
      </h3>
      <h3>Address: {trainer?.trainerAddress}</h3>
    </div>
  );
};

export default TrainerInfo;
