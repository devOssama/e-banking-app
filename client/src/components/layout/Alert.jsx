import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomAlert = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) =>
      alert.alertType === 'danger' ? (
        <div key={alert.id} className={classes.root}>
          <Alert severity='error'>{alert.msg}</Alert>
        </div>
      ) : (
        <div key={alert.id} className={classes.root}>
          <Alert severity='success'>{alert.msg}</Alert>
        </div>
      )
    )
  );
};

CustomAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(CustomAlert);
