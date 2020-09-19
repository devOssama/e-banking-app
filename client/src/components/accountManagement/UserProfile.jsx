import React, { useEffect } from 'react';
import Profile from '../shared/Profile';
import CircularIndeterminate from '../layout/Spinner';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';

const UserProfile = ({ getCurrentProfile, loading, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Profile
      loading={loading}
      genericProfile={{
        prop1: profile.Balance,
        prop2: profile.accountNumber,
      }}
      title1={'Balance :'}
      title2={'Account Number :'}
    />
  );
};

UserProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getCurrentProfile })(UserProfile);
