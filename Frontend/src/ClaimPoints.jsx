import React from 'react';
import PropTypes from 'prop-types';
import './ClaimPoints.css';

const ClaimPoints = ({ onClaimPoints, selectedUser, loading }) => {
  return (
    <div className="claim-points-container">
      <button
        onClick={onClaimPoints}
        className={`claim-points-button ${selectedUser ? 'active' : ''}`}
        disabled={!selectedUser || loading}
        aria-live="polite"
        aria-disabled={!selectedUser || loading} // Indicate button state for accessibility
      >
        {loading ? (
          <span className="spinner" /> // Optionally add a spinner
        ) : null}
        {loading ? 'Claiming...' : 'Claim Points'}
      </button>
    </div>
  );
};

ClaimPoints.propTypes = {
  onClaimPoints: PropTypes.func.isRequired,
  selectedUser: PropTypes.object, // or PropTypes.shape({ /* shape of selectedUser */ }) if you have a specific structure
  loading: PropTypes.bool.isRequired,
};

export default ClaimPoints;
