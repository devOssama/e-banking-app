import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../shared/Title';
import CircularIndeterminate from '../layout/Spinner';

//Redux
import PropTypes from 'prop-types';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Transactions = ({ loading, transaction: { transactions } }) => {
  const classes = useStyles();

  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <React.Fragment>
      <Title>All Transactions</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Target Account</TableCell>
            <TableCell align='right'>Amount (DH)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.madeAt}</TableCell>
              <TableCell>{row.user.firstName}</TableCell>
              <TableCell>{row.user.lastName}</TableCell>
              <TableCell>{row.accountNumber}</TableCell>
              <TableCell>{row.targetAccount}</TableCell>
              <TableCell align='right'>{row.Amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color='primary' href='#' onClick={preventDefault}>
          *only the last 10 transactions
        </Link>
      </div>
    </React.Fragment>
  );
};

Transactions.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default Transactions;
