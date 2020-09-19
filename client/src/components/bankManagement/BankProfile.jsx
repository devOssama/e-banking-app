import React, { useEffect } from 'react';
import Profile from '../shared/Profile';
import CircularIndeterminate from '../layout/Spinner';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentBank } from '../../actions/bank';

const BankProfile = ({ loading, getCurrentBank, bank }) => {
  useEffect(() => {
    getCurrentBank();
  }, [getCurrentBank]);

  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Profile
      genericProfile={{
        prop1: bank.totalDeposit,
        prop2: bank.totalUser,
      }}
      title1={'Total Deposits :'}
      title2={'Total Users :'}
    />
  );
};

BankProfile.propTypes = {
  getCurrentBank: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bank: state.bank.bank,
  loading: state.bank.loading,
});

export default connect(mapStateToProps, { getCurrentBank })(BankProfile);
