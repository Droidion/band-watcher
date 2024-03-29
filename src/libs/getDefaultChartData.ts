// Initialization data for Chart.js chart
const getDefaultChartData = (chartColor: string): Chart.ChartData => {
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
