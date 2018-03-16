
export default function reducer(state=
	{
		authData: {
			username : null,
			redirectedFrom : null,
			loadingData : false
		}
	}, action) {

	switch (action.type) {
		case "SET_USERNAME": {
			return {...state, 
				authData: {
					...state.authData,
					username: action.payload
				}
			}
		}

		case "SET_REDIRECTED_FROM": {
			return {...state, 
				authData: {
					...state.authData,
					redirectedFrom: action.payload
				}
			}
		}

		case "SET_LOADING": {
			return {...state, 
				authData: {
					...state.authData,
					loadingData: action.payload
				}
			}
		}

		default : {
			return {...state};
		}
	}

}