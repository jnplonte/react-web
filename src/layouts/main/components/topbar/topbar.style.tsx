import { makeStyles } from '@material-ui/styles';

export const topbarStyle = makeStyles((theme: any) => ({
    root: {},
    flexGrow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    lang: {
      marginLeft: theme.spacing(0.25),
      color: theme.palette.white,
    },
}));
