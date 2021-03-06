import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GiPodium } from "react-icons/gi";
import { GoCalendar } from "react-icons/go";
import { IoIosHourglass } from "react-icons/io";
import { BsClock } from "react-icons/bs";
import useChartSize from "../../hooks/useChartSize";
import {
  selectCurrentUser,
  selectDifficulties,
} from "../../features/auth/authSlice";
import Line from "../../components/Chart";
import Circular from "../../components/Circular";
import { breakpoint } from "../../helpers/mediaQueries";

const MainContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media ${breakpoint.lg} {
    flex-direction: column-reverse;
  }
`;

const FilterList = styled(List)`
  flex-wrap: wrap;
  @media ${breakpoint.lg} {
    display: flex;
    justify-content: center;
  }
`;

const Item = styled.div`
  width: 300px;
  @media ${breakpoint.lg} {
    width: 150px;
  }
`;

const Chart = styled.div`
  width: 600px;
  @media ${breakpoint.lg} {
    width: 480px;
  }
  @media ${breakpoint.sm} {
    width: 300px;
  }
`;

const Account = () => {
  const currentUser = useSelector(selectCurrentUser);
  const difficulties = useSelector(selectDifficulties);
  const [stats, setStats] = useState(currentUser.stats);
  const [chart, setChart] = useState(true);
  const chartSize = useChartSize();
  const [percentage, setPercentage] = useState(0);
  const now = new Date(Date.now());
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();

  function getWeek(day, month, year) {
    const onejan = new Date(year, 0, 1);
    const date = new Date(year, month, day);
    return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  }
  const filterTo = (option) => {
    let arr = currentUser.stats.map((stat) => {
      return {
        score: stat.score,
        date: stat.date.split("."),
      };
    });
    setChart(true);
    switch (option) {
      case "day":
        const values = arr
          .filter((item) => {
            if (
              Number(item.date[0]) === day &&
              Number(item.date[1]) === month &&
              Number(item.date[2]) === year
            )
              return item;
            return null;
          })
          .map((item) => {
            return item.score;
          });
        let sum = 0;
        if (values.length > 0) {
          sum = values.reduce((prev, current) => (current += prev));
          setPercentage(sum / values.length);
        } else setPercentage(0);
        setChart(false);
        break;

      case "week":
        arr = arr.filter((item) => {
          if (
            getWeek(
              Number(item.date[0]),
              Number(item.date[1]),
              Number(item.date[2])
            ) === getWeek(day, month, year)
          )
            return item;
          return null;
        });
        break;

      case "month":
        arr = arr.filter((item) => {
          if (Number(item.date[1]) === month) return item;
          return null;
        });
        break;
      default:
        break;
    }

    setStats(
      arr.map((stat) => {
        return {
          score: stat.score,
          date: stat.date.join("."),
        };
      })
    );
  };

  const dateMenu = [
    { text: "today", icon: <BsClock />, onClick: () => filterTo("day") },
    { text: "week", icon: <IoIosHourglass />, onClick: () => filterTo("week") },
    { text: "month", icon: <GoCalendar />, onClick: () => filterTo("month") },
    {
      text: "generally",
      icon: <GiPodium />,
      onClick: () => filterTo("generally"),
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          height: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            alt=""
            style={{
              margin: "auto",
              display: "block",
              borderRadius: "100%",
              width: "50px",
            }}
            src={currentUser.img}
          />
          <div>{currentUser?.name}</div>
          <div>{difficulties[currentUser.level]}</div>
        </div>
        <MainContent>
          <FilterList component="nav" aria-label="datemenu">
            {dateMenu.map((item) => (
              <Item>
                {" "}
                <ListItem onClick={item.onClick} button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                <Divider />
              </Item>
            ))}
          </FilterList>
          <Chart>
            {chart && <Line width={"100%"} data={stats} />}
            {!chart && (
              <Circular
                strokeWidth="20"
                sqSize={chartSize}
                percentage={percentage}
              />
            )}
          </Chart>
        </MainContent>
      </div>
    </div>
  );
};
export default Account;
