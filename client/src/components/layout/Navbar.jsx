import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    background: 'transparent',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const classes = useStyles();
  const guestLinks = (
    <Fragment>
      <Button
        href='#'
        color='primary'
        variant='outlined'
        className={classes.link}
        component={Link}
        to='/Register'
      >
        S'enregister
      </Button>
      <Button
        href='#'
        color='primary'
        variant='outlined'
        className={classes.link}
        component={Link}
        to='/Login'
      >
        Connexion
      </Button>
    </Fragment>
  );

  const authLinks = (
    <Button
      href='#'
      color='primary'
      variant='outlined'
      className={classes.link}
      onClick={logout}
      component={Link}
      to='/'
    >
      Déconnexion
    </Button>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position='sticky'
        color='default'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <AccountBalanceIcon />
          <Typography
            variant='h5'
            color='inherit'
            noWrap
            className={classes.toolbarTitle}
            component={Link}
            to='/'
          >
            Banque populaire
          </Typography>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
