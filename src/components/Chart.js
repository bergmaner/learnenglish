import React from 'react';
import Chart from "react-apexcharts";
import { selectCurrentUser } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Line = () =>
{

    const user = useSelector(selectCurrentUser);
    const stats =  user.stats.map( (stat) => {return(stat.score)});
    const dates =  user.stats.map( (stat) => {return(stat.date)});
    return (
        <div>
          {console.log(stats)}
        <Chart options = {{
        
        xaxis: {
          categories: dates
        }
      }}
      series = { [
        {
          name: "score",
          data: stats
        }
      ]
    }
    type="line"
              width="500"/>
        </div>
    )
}
export default Line;
