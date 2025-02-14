// @ts-nocheck
export const PriceHistoryChart = (priceHistory: any) => {
  // Extract and format the data for the chart
  const data = {
    labels: priceHistory.map((entry: any) => {
      const date = new Date(entry.date);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString(undefined, options);
    }),
    datasets: [
      {
        label: "Price",
        data: priceHistory.map((entry: any) => parseInt(entry.price)),
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Price History",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 1)",
        callbacks: {
          title: function (tooltipItems: { dataIndex: number }[]) {
            const date = new Date(priceHistory[tooltipItems[0].dataIndex].date);
            const options: Intl.DateTimeFormatOptions = {
              year: "numeric",
              month: "short",
              day: "2-digit",
              weekday: "long",
            };
            return date.toLocaleDateString(undefined, options);
          },
          label: function (tooltipItem: { raw: number }) {
            const price = new Intl.NumberFormat("IN", {
              style: "currency",
              currency: "INR",
            }).format(tooltipItem.raw);
            return `Price: ${price}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Date",
        },
        ticks: {
          callback: function (value: string | number, index: number) {
            const totalLabels = this.getLabels().length;
            const maxLabels = 10;
            const stepSize = Math.ceil(totalLabels / maxLabels);
            return index % stepSize === 0 ? this.getLabelForValue(value) : "";
          },
          maxRotation: 90,
          autoSkip: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "Price in INR(₹)",
        },
      },
    },
  };

  return [data, options];
};
