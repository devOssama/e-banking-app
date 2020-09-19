import React, { useEffect } from 'react';
import Transactions from '../shared/Transactions';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPersonalTransactions } from '../../actions/transaction';

const UserTransactions = ({
  loading,
  getAllPersonalTransactions,
  transaction,
}) => {
  useEffect(() => {
    getAllPersonalTransactions();
  }, [getAllPersonalTransactions]);

  return <Transactions loading={loading} transaction={transaction} />;
};

UserTransactions.propTypes = {
  getAllPersonalTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  loading: state.transaction.loading,
});

export default connect(mapStateToProps, { getAllPersonalTransactions })(
  UserTransactions
);
