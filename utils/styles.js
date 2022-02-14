import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },

  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  grow: {
    flexGrow: 1,
  },

  main: {
    minHeight: '80vh',
  },

  footer: {
    marginTop: '10px',
    textAlign: 'center',
  },
  section: {
    marginTop: '10px',
    narginBottom: '10px',
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent'
  },
  section:{
    
  },
});
export default useStyles;
