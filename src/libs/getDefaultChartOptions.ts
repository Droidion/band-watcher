const getDefaultChartOptions = () => {
  return {
    scales: {
      xAxes: [{ display: false }],
      yAxes: [{ display: false }],
    },
    animation: {
      duration: 0,
    },
    layout: {
      padding: {
        top: 50,
        bottom: 50,
      },
    },
    legend: {
      display: false,
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
      },
    },
  };
};

export default getDefaultChartOptions;
