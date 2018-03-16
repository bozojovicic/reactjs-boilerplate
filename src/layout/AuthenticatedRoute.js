import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { setRedirectedFrom } from "../components/Login"
import Constants from '../Constants';


class AuthenticatedRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillUnmount() {
    if(!this.props.authData.username) {
      this.props.setRedirectedFrom(this.props.location.pathname + this.props.location.search);    
    }
  }

	render() {

    const C = this.props.component;

    return (
      <Route
        render={props =>
          this.props.authData.username
            ? <C {...props} match={this.props.computedMatch} />
            : <Redirect to={Constants.ROUTE_LOGIN} />}
      />
    )
  }

}

AuthenticatedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.element
}

const mapStateToProps = (state) => {
	return {
    authData: state.authR.authData
  };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		setRedirectedFrom : setRedirectedFrom
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
