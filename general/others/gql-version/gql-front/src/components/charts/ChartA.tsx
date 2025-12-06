import { BarChart } from "@mui/x-charts/BarChart";

import { useEffect, useState } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { UserRegister } from "../../interfaces/users";
import { gql, useQuery } from "@apollo/client";

const initialData = [
  3, 4, 1, 6, 5, 8, 4, 2, 4, 4, 5, 2, 3, 5, 3, 5, 4, 6, 5, 5, 2, 4, 3, 0, 6,
];

export default function StackBars() {
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("md", "lg")
  );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [data, setData] = useState(initialData);

  const USERS = gql`
    query GetAllUsers {
      getAllUsers {
        _id
      }
    }
  `;

  const { data: usersData } = useQuery(USERS);

  const getHourOfDay = (userDate: Date): number => {
    const date = new Date(userDate);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid Date object");
    }

    const hour = date.getHours();

    const hourOfDay = (hour + 1) % 24;

    return hourOfDay;
  };

  const extractTimeFromUsers = (users: UserRegister[]) => {
    const usersInHours: number[] = data;

    users.map((user) => {
      let userHourRegister = 0;
      if (user.signup_time) {
        userHourRegister = getHourOfDay(user.signup_time);
      }
      usersInHours[userHourRegister] += 1;
    });
    return usersInHours;
  };

  useEffect(() => {
    (() => {
      try {
        usersData && console.log(usersData.getAllUsers);
        const filterData = usersData
          ? extractTimeFromUsers(usersData.getAllUsers)
          : data;
        setData(filterData);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersData]);

  return (
    <BarChart
      series={[
        {
          data: data,
          stack: "A",
          label: "User registration/hour",
          type: "bar",
        },
        {
          data: data,
          type: "bar",
        },
      ]}
      width={
        isLargeScreen
          ? 500
          : isMediumScreen
          ? 400
          : isSmallScreen
          ? undefined
          : 300
      }
      height={350}
      axisHighlight={{x:"line", y:"line"}}
    />
  );
}
