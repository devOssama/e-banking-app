import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '../layout/LinearProgress';

const PrivateUserRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  role,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <LinearProgress />
        ) : isAuthenticated && role === 'user' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

PrivateUserRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  role: state.auth.user ? state.auth.user.role : null,
});

export default connect(mapStateToProps)(PrivateUserRoute);
