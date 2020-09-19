import React from 'react';
import { Redirect } from 'react-router-dom';

const redirectHome = (role) =>
  //redirect

  role === 'user' ? (
    <Redirect to='/AccountHome' />
  ) : (
    role === 'admin' && <Redirect to='/bankHome' />
  );
export default redirectHome;
