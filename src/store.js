import { createStore } from 'redux';

import { cityList } from './defaults'

function reducer(state, action) {
	switch (action.type) {
		case 'location/active':
			return {
				...state,
				location: { ...state.list[action.index] }
			}
		case 'location/coords':
			const { latitude, longitude } = action.location
			return {
				...state,
				list: state.list.map(el => {
					const obj = {...el}
					if (obj.name === 'Local') {
						obj.latitude = latitude
						obj.longitude = longitude
					}
					return obj
				})
			}
		case 'state/ready':
			return {
				...state,
				isReady: action.state
			}
	}
	return state
}

const store = createStore(reducer, {
	list: cityList,
	location: cityList[0],
	isReady: false
});

export default store