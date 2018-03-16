
export default function reducer(state=
	{
		thingsData : {
			things : []
		}
	}, action) {

	switch (action.type) {

		case "CREATE_EDIT_THING": {
			const randomId = Math.floor((Math.random() * 100000) + 1);
			const newThings = [...state.thingsData.things];
			if(action.payload.id == null){
				action.payload.id = randomId;
				newThings.push(action.payload);
			} else {
				const thingToUpdate = newThings.findIndex(thing => thing.id === action.payload.id)
				newThings[thingToUpdate] = action.payload;
			}
	  
			return {...state, 
				thingsData: {
					...state.thingsData,
					things: newThings
				}
			}
		}			

		case "ADD_THINGS": {
			return {...state, 
				thingsData: {
					...state.thingsData,
					things: action.payload
				}
			}
		}

		default : {
			return {...state};
		}
	}
}