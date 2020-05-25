import palette from '../../themes/palette';

const barData = {
  labels: ['Date 1', 'Date 2', 'Date 3', 'Date 4', 'Date 5', 'Date 6', 'Date 7'],
  datasets: [
    {
      label: 'this year',
      backgroundColor: palette.primary.main,
      data: [18, 5, 19, 27, 29, 19, 20],
    },
    {
      label: 'last year',
      backgroundColor: palette.primary.light,
      data: [11, 20, 12, 29, 30, 25, 13],
    },
  ],
};

const pieData = {
  datasets: [
    {
      data: [63, 15, 22],
      backgroundColor: [
        palette.primary.main,
        palette.error.main,
        palette.warning.main,
      ],
      borderWidth: 8,
      borderColor: palette.white,
      hoverBorderColor: palette.white,
    },
  ],
  labels: ['Data 1', 'Data 2', 'Data 3'],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export { barData, pieData, options };
