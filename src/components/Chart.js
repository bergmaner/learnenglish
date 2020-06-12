import React from "react";
import Chart from "react-apexcharts";

const Line = ({ data, width }) => {
  const stats = data.map((item) => {
    return item.score;
  });
  const dates = data.map((item) => {
    return item.date;
  });
  return (
    <div>
      {console.log(stats)}
      <Chart
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          yaxis: {
            min: 0,
            max: 100,
          },
          xaxis: {
            categories: dates,
          },
        }}
        series={[
          {
            name: "score",
            data: stats,
          },
        ]}
        type="line"
        width={width}
      />
    </div>
  );
};
export default Line;
