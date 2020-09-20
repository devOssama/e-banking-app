import React from 'react';
import Typography from '@material-ui/core/Typography';

const footerStyle = {
  marginTop: '1rem',
  padding: '1rem',
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
};

const Copyright = () => {
  return (
    <Typography
      variant='body2'
      color='textSecondary'
      align='center'
      style={footerStyle}
    >
      {'Copyright © Groupe Banque Populaire '} {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
