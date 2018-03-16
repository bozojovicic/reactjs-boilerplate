import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";

class LoginC extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		}
	}
	
	onChange(e) {
		this.setState({ [e.target.name] : e.target.value });
	}
	
	onSubmit(e) {
		e.preventDefault();
		if(this.state.username) {
			this.props.saveUsername(this.state);
		}
	}

	componentWillUnmount() {
		if(this.props.authData.username && this.props.authData.redirectedFrom) {
			this.props.setRedirectedFrom(null);
		}
	}
	
	render() {

		if(this.props.authData.username) {
			if(this.props.authData.redirectedFrom) {
				return <Redirect to={this.props.authData.redirectedFrom} />;
			} else {
				return <Redirect to={'/'}/>;
			}
		}

		return (<div className="row">
			<div className="col-sm-4 col-md-4 offset-sm-4 offset-md-4">
				<form onSubmit={this.onSubmit.bind(this)}>
					<p>Please login!</p>
					<div className="form-group">
						<label htmlFor="username">Your name : </label>
						<input type="username" className="form-control" id="username" name="username" value={this.state.username} onChange={this.onChange.bind(this)} placeholder="Just enter some name" />
					</div>
					<button type="submit" className="btn btn-default">Login</button>
				</form>
			</div>
		</div>)
	}
}

const saveUsername = (st) => {
	return {type: 'SET_USERNAME', payload: st.username};
}

const setRedirectedFromAction = (redirectedFrom) => {
	return {type: 'SET_REDIRECTED_FROM', payload: redirectedFrom};
}

const mapStateToProps = (state) => {
	return {
		authData: state.authR.authData
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		saveUsername : saveUsername,
		setRedirectedFrom : setRedirectedFromAction,
	}, dispatch);
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginC);
export const setRedirectedFrom = setRedirectedFromAction;
