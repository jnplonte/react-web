import { makeStyles } from '@material-ui/styles';

export const userToolbarStyles = makeStyles((theme: any) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  modal: {},
}));
