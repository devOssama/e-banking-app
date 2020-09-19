import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeTransaction } from '../../actions/transaction';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const Transfer = ({ makeTransaction }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    targetAccountNumber: '',
    amount: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { targetAccountNumber, amount } = formData;

  const onSubmitTransaction = async (e) => {
    e.preventDefault();
    makeTransaction(formData);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='target'
            label='Target account'
            name='targetAccountNumber'
            value={targetAccountNumber}
            autoComplete='target'
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='amount'
            value={amount}
            label='Amount'
            id='amount'
            autoComplete='amount'
            onChange={onChange}
          />
          <Grid item xs={12} sm={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={onSubmitTransaction}
            >
              Transfer
            </Button>
          </Grid>
        </form>
      </div>
      <Box mt={0}></Box>
    </Container>
  );
};

Transfer.propTypes = {
  makeTransaction: PropTypes.func.isRequired,
};

export default connect(null, { makeTransaction })(Transfer);
