import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from "axios";
import { Link } from 'react-router-dom';

import Constants from '../Constants';
import { interceptAjaxCalls } from "../Interceptor"

class ThingsC extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		if(this.props.thingsData.things.length === 0) {
			this.props.loadAllThings(this.props.history);
		}
	}

	render() {

		const thingsTable = this.props.thingsData.things.map(thing => <tr key={thing.id}>
				<td>{thing.id}</td>
				<td>{thing.name} {thing.surname}</td>
				<td className="right-float">
					<Link to={`/thing/view/${thing.id}`}><span className="glyphicon glyphicon-list" title="View thing" ></span></Link> &nbsp;
					<Link to={`/thing/edit/${thing.id}`}><span className="glyphicon glyphicon-edit" title="Edit thing" ></span></Link> &nbsp;
				</td>
			</tr>);

		return (<div>
			<h1>All things</h1>
			<div className="row">
				<div className="col-md-6">
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{thingsTable}
						</tbody>
					</table>
				</div>
			</div>
		</div>)
	}
};

const loadAllThingsAction = (hist) => {
	return function(dispatch) {
		dispatch(interceptAjaxCalls(axios, hist));
		dispatch({type: "SET_LOADING", payload: true});
		axios.get(Constants.API_URL + '/things.json', {

		}).then((response) => {
			dispatch({type: "ADD_THINGS", payload: response.data.things});
			dispatch({type: "SET_LOADING", payload: false});
		})
		.catch((err) => {
			console.log(err);
			dispatch({type: "SET_LOADING", payload: false});
		})
	}
}

const mapStateToProps = (state) => {
	return {
		authData: state.authR.authData,
		thingsData: state.thingsR.thingsData
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadAllThings : loadAllThingsAction
	}, dispatch);
};

export const Things = connect(mapStateToProps, mapDispatchToProps)(ThingsC);
export const loadAllThings = loadAllThingsAction;
