import { makeStyles } from '@material-ui/styles';

export const userTableStyles = makeStyles((theme: any) => ({
    root: {
      overflowX: 'auto',
    },
    table: {
      minWidth: 1050,
    },
    dialogTitle: {
      backgroundColor: theme.palette.primary.main,
    },
    dialogTitleIcon: {
      position: 'relative',
      top: '5px',
      marginRight: '10px',
      color: theme.palette.white,
    },
    dialogTitleText: {
      color: theme.palette.white,
      display: 'inline-block',
    },
}));
