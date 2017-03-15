import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import AdForm from '../components/AdForm';

class AdFormPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ad-form-page" style={{padding: '10px'}}>
        <AdForm />
      </div>
    );
  }
}


AdFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdFormPage);
