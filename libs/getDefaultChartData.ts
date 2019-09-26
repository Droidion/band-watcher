const getDefaultChartData = (chartColor: string) => {
  return {
    labels: new Array(100),
    datasets: [
      {
        fill: false,
        borderColor: chartColor,
        borderWidth: 2,
        pointRadius: 0,
        data: [],
      },
    ],
  };
};

export default getDefaultChartData;
