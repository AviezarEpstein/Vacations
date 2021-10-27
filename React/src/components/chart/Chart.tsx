import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import "./chart.css";

function Chart() {
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    chart();
  }, []);

  const [chartData, setChartData] = useState({});

  const chart = async () => {
    await axios
      .get("http://localhost:3001/vacations/allFollowedVacations")
      .then((response) => {
        let vacationsArray = response.data;

        let vacationIdArray = new Array(vacationsArray.length);
        let numOfFollowsArray = new Array(vacationsArray.length);

        let vacationLabel = "vacation ID: ";

        for (let i = 0; i < vacationsArray.length; i++) {
          vacationIdArray[i] = vacationLabel + vacationsArray[i].id;
          numOfFollowsArray[i] = vacationsArray[i].numOfFollowers;
        }

        setChartData({
          labels: vacationIdArray,
          datasets: [
            {
              label: "Number of followers",
              data: numOfFollowsArray,
              backgroundColor: ["rgb(252,141,3)"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((e) => {
        console.error(e);
        alert(e);
      });
  };
  return (
    <>
      <div
        className="chartContainer"
        style={{ height: "600px" }}
      >
        <Bar
        
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                  top: 100,
                  left: 100,
                  right: 100,
                  bottom: 0
              }
          }
          }}
        />
      </div>
    </>
  );
}

export default Chart;
