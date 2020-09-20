import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../shared/Title';

//Redux

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Profile = ({ genericProfile, title1, title2 }) => {
  const classes = useStyles();

  let date = new Date();
  let weekday = new Array(7);
  weekday[0] = 'Dimanche';
  weekday[1] = 'Lundi';
  weekday[2] = 'Mardi';
  weekday[3] = 'Mercredi';
  weekday[4] = 'Jeudi';
  weekday[5] = 'Vendredi';
  weekday[6] = 'Samedi';

  return (
    <React.Fragment>
      <Title> {title1}</Title>
      <Typography component='p' variant='h3'>
        {genericProfile.prop1}
        {' DH'}
      </Typography>
      <Title>{title2}</Title>
      <Typography component='p' variant='h3'>
        {genericProfile.prop2}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        le{' '}
        {`${weekday[date.getDay()]} ${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}
      </Typography>
    </React.Fragment>
  );
};

export default Profile;
