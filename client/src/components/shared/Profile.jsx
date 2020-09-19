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
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

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
        on{' '}
        {`${weekday[date.getDay()]} ${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}
      </Typography>
    </React.Fragment>
  );
};

export default Profile;
