import Constants from './Constants';

export function interceptAjaxCalls(axios, history){
	return function(){
		
		axios.interceptors.request.use(function (config) {
			console.log("sending request ... " + JSON.stringify(config));
			return config;
		}, function (error) {
			console.log("error sending request.");
			return Promise.reject(error);
		});

		axios.interceptors.response.use(function (response) {
			console.log("receiving response ... " + JSON.stringify(response));
			
			if(history && response.status === 401) {
				history.push(Constants.ROUTE_LOGIN);
			}

			return response;
		}, function (error) {
			console.log("error receiving response ... " + JSON.stringify(error));
			
			return Promise.reject(error);
		});
	}
}

