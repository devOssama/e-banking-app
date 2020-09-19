import React, { useEffect } from 'react';
import Transactions from '../shared/Transactions';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTransactions } from '../../actions/transaction';

const ALLTransactions = ({ loading, getAllTransactions, transaction }) => {
  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  return <Transactions loading={loading} transaction={transaction} />;
};

ALLTransactions.propTypes = {
  getAllTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  loading: state.transaction.loading,
});

export default connect(mapStateToProps, { getAllTransactions })(
  ALLTransactions
);
