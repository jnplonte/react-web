import { makeStyles } from '@material-ui/styles';

export const chartStyle = makeStyles(() => ({
    root: {},
    chartContainer: {
      height: 400,
      position: 'relative',
    },
    actions: {
      justifyContent: 'flex-end',
    },
}));
