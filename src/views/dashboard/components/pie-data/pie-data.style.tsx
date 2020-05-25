import { makeStyles } from '@material-ui/styles';

export const pieStyle = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    position: 'relative',
    height: 400,
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));
