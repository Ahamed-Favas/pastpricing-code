"use client";

import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

export const NivoChart = ({ priceHistory, lastUpdated }: any): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const raw_data = priceHistory;
  const currentDate = new Date();
  const oneDay = 86400000;
  if (currentDate.getTime() - lastUpdated.getTime() > oneDay) {
    const lastEntry = raw_data.pop();
    raw_data.push({ date: String(currentDate), price: lastEntry.price });  // Simulating fresh data for the first query of the day.
  }

  const data = [
    {
      id: "price-chart",
      color: "hsl(217, 70%, 50%)",
      data: raw_data.map((entry: any) => {
        const date = new Date(entry.date);
        const price = parseInt(entry.price);
        return { "x": date, "y": price };
      }),
    },
  ];

  const xTickFormatter = (value: Date) => {
    return value.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const rotation = windowWidth < 600 ? 25 : 0; // rotate x-axis ticks if window width is less than 600px

  let margin = { top: 40, right: 40, bottom: 50, left: 50 };
  const XtickHid = data[0].data.length > 15;
  if (XtickHid) {
    margin = { top: 10, right: 40, bottom: 0, left: 50 };
  } // if data is more than 15, hide x-axis ticks

  const minYValue = Math.min(...data[0].data.map((d: any) => d.y));
  const minY = minYValue - minYValue / 10; // yScale starts as 10% less than the minimum price

  const customTooltip = (point: any) => {
    return (
      <div
        style={{
          background: "white",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p className="text-gray-900">
          {new Intl.NumberFormat("US", {
            style: "currency",
            currency: "INR"
          }).format(point.point.data.y)}
        </p>
        {XtickHid && (
          <p className="text-sm">
            {new Date(point.point.data.x).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </p>
        )}
      </div>
    );
  };

  return (
    <ResponsiveLine
      data={data}
      // margin={{ top: 20, right: 40, bottom: 60, left: 60 }}
      margin = {margin}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: minY,
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      xFormat="time:%m/%d"
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: xTickFormatter,
        tickSize: 0,
        tickPadding: 15,
        tickRotation: rotation,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
        truncateTickAt: 0,
      }}
      enableGridX={false}
      enableGridY={true}
      colors={{ scheme: "accent" }}
      pointSize={3}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      areaOpacity={1}
      enableTouchCrosshair={true}
      crosshairType="cross"
      useMesh={true}
      legends={[]}
      tooltip={customTooltip}
    />
  );
};
  
// TODO consider chart data slicing.

