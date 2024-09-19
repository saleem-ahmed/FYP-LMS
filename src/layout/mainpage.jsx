"use client";

import { Card } from "flowbite-react";
import React from "react";

const MainPage = () => {
  const cardData = [
    {
      bg: "#dc143c",
      caption: "Transport Application",
    },
    {
      bg: "#34a853",
      caption: "Print Admint Card",
    },
    {
      //   icon: <HomeOutlined />,
      caption: "Noticeboard",
      bg: "#dc143c",
    },
    {
      //   icon: <CalendarOutlined />,
      caption: "Academic calender",
      bg: "#fca508",
    },
    {
      //   icon: <BookOutlined />,
      caption: "Active Courses",
      bg: "#34a853",
    },
    {
      //   icon: <MacCommandOutlined />,
      caption: "Timetable",
      bg: "#093b94",
    },
    {
      //   icon: <ClockCircleOutlined />,
      caption: "Arrange classes",
      bg: "#673ab7",
    },
    {
      //   icon: <BoxPlotOutlined />,
      caption: "libarary Resourses",
      bg: "#87c344",
    },
    {
      //   icon: <UserOutlined />,
      caption: "Profile",
      bg: "#fca508",
    },
    {
      //   icon: <ContainerOutlined />,
      caption: "Logouts",
      bg: "#ea4335",
    },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-[20px]">
        {cardData.map((data) => (
          <Card
            href="#"
            className="max-w-[220px] w-full flex flex-col items-center justify-center h-[150px]"
            style={{ background: `${data.bg}` }}
          >
            <p className="font-normal text-white dark:text-white">
              {data.caption}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MainPage;
