import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import CircularIndeterminate from '../layout/Spinner';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentBank } from '../../actions/bank';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = ({ loading, getCurrentBank, bank: { bank } }) => {
  useEffect(() => {
    getCurrentBank();
  }, [getCurrentBank]);

  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <React.Fragment>
      <Title>Total Deposits : </Title>
      <Typography component='p' variant='h5'>
        {bank.totalDeposit}
        {' DH'}
      </Typography>
      <Title>Total Users :</Title>
      <Typography component='p' variant='h5'>
        {bank.totalUser}
      </Typography>
    </React.Fragment>
  );
};

Deposits.propTypes = {
  getCurrentBank: PropTypes.func.isRequired,
  bank: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bank: state.bank,
  loading: state.bank.loading,
});

export default connect(mapStateToProps, { getCurrentBank })(Deposits);
