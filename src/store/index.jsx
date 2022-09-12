import { createStore } from "redux";
import producer from "immer";

const initialState = {
	currentTime: 0,
	currentPeriod: "work",
	periods: {
		work: {
			titleTimer: "Work",
			initialTime: 3600,
		},
		break: {
			titleTimer: "Break",
			initialTime: 600,
		},
	},
	pause: true,
};

function reducer(state = initialState, action) {
	const { type, payload } = action;
	const actions = {
		START_CLOCK() {
			return { ...state, pause: false };
		},
		PAUSE_CLOCK() {
			return { ...state, pause: true };
		},
		STOP_CLOCK() {
			return {
				...state,
				pause: true,
				currentTime: state.periods[payload].initialTime,
			};
		},
		NEXT_CLOCK() {
			const nextPeriod = state.currentPeriod === "work" ? "break" : "work";
			return {
				...state,
				currentTime: state.periods[nextPeriod].initialTime,
				currentPeriod: nextPeriod,
			};
		},
		SET_TIME() {
			return producer(state, (draft) => {
				if (payload.period === draft.currentPeriod) {
					draft.currentTime = payload.time;
				}
				draft.periods[payload.period].initialTime = payload.time;
			});
		},
		DECREMENT_CURRENT_TIME() {
			return { ...state, currentTime: state.currentTime - 1 };
		},
	};
	if (type in actions) {
		return actions[type]();
	}
	console.log("Not found type");
	return state;
}

const store = createStore(reducer);
export default store;
