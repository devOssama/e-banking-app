import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//Redux
import { credit, debit } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

const CreditDebit = ({ credit, debit }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { accountNumber, amount } = formData;

  const onSubmitCredit = async (e) => {
    e.preventDefault();
    credit(formData);
  };
  const onSubmitDebit = async (e) => {
    e.preventDefault();
    debit({ accountNumber, amount });
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
            label='N° de compte du destinataire'
            name='accountNumber'
            value={accountNumber}
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
            label='Montant'
            id='amount'
            autoComplete='amount'
            onChange={onChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={onSubmitCredit}
              >
                Créditer
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={onSubmitDebit}
              >
                Débiter
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={0}></Box>
    </Container>
  );
};

CreditDebit.propTypes = {
  credit: PropTypes.func.isRequired,
  debit: PropTypes.func.isRequired,
};

export default connect(null, { credit, debit })(CreditDebit);
