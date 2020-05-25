import { makeStyles } from '@material-ui/styles';

export const dashboardStyle = makeStyles((theme: any) => ({
    root: {
      padding: theme.spacing(4),
    },
    icon: {
      height: 32,
      width: 32,
      color: theme.palette.white,
    },
}));
