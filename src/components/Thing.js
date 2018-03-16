import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../Constants';
import { loadAllThings } from "./Things"

class Thing extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			thingsData : {
				things : [],
				thingForm : {
					id : null,
					name : '',
					surname : ''
				}
			}
		}
	}

	componentDidMount() {
		if(this.props.thingsData.things.length === 0) {
			this.props.loadAllThings(this.props.history);
		} else {
			this.prepareThingToEdit();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.prepareThingToEdit();
	}

	getThingIdParam() {
		if(this.props.match.params) {
			return parseInt(this.props.match.params.thingid, 10);
		} else {
			return null;
		}
	}

	prepareThingToEdit() {

		let thingToEdit = {
			id : null,
			name : '',
			surname : ''
		}

		const thingId = this.getThingIdParam();

		if(thingId) {
			const allThings = this.props.thingsData.things;
			const thingToEditIndex = allThings.findIndex(thing => thing.id === thingId);
			const tte = allThings[thingToEditIndex];
			if(tte) {
				thingToEdit = tte;
			}
		}

		this.setState({
			thingsData : {
				...this.props.thingsData,
				thingForm : thingToEdit
			}
		});
	}

	onChange(e) {
		this.setState({
			thingsData : {
				...this.state.thingsData,
				thingForm : {
					...this.state.thingsData.thingForm,
					[e.target.name] : e.target.value
				}
			}
		});
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.state.thingsData.thingForm.name.trim() && this.state.thingsData.thingForm.surname.trim()) {
			this.props.submitThing(this.state.thingsData.thingForm);
			this.redirectTo(Constants.ROUTE_THINGS_ALL);
		}
	}

	redirectTo(route) {
		this.props.history.push(route);
	}

	render() {

		if(this.props.match.path === Constants.ROUTE_THING_VIEW) {
			return (<div>
				<h1>View thing</h1>
				<div className="row">
					<div className="col-md-6">
						<table className="table table-hover">
							<tbody>
								<tr>
									<td><b>ID</b></td>
									<td>{this.state.thingsData.thingForm.id}</td>
								</tr>
								<tr>
									<td><b>Name</b></td>
									<td>{this.state.thingsData.thingForm.name}</td>
								</tr>
								<tr>
									<td><b>Surname</b></td>
									<td>{this.state.thingsData.thingForm.surname}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>)
		}

		return (<div>
			<h1>{this.props.match.path === Constants.ROUTE_THING_CREATE ? 'Create' : 'Edit'} thing</h1>
			<div className="row">
				<div className="col-md-6">
					<form onSubmit={this.onSubmit.bind(this)} >
						<div className="form-group">
							<label htmlFor="name">Name :</label>
							<input type="text" className="form-control" id="name" name="name" value={this.state.thingsData.thingForm.name} onChange={this.onChange.bind(this)} />
						</div>
						<div className="form-group">
							<label htmlFor="name">Surname :</label>
							<input type="text" className="form-control" id="surname" name="surname" value={this.state.thingsData.thingForm.surname} onChange={this.onChange.bind(this)} />
						</div>
						<button type="submit" className="btn btn-primary">Save</button>&nbsp;
					</form>
				</div>
			</div>
		</div>)
	}
};

const submitThing = (thing) => {
	return {type: 'CREATE_EDIT_THING', payload: thing};
};

const mapStateToProps = (state) => {
	return {
		authData: state.authR.authData,
		thingsData: state.thingsR.thingsData
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		submitThing: submitThing,
		loadAllThings: loadAllThings
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Thing);
