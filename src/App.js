import { useEffect } from "react";
import { connect } from "react-redux";

import Clock from "./component/clock";
import EditTime from "./component/EditTime";
import ControllBtn from "./component/ControllBtn";

function App(props) {
	const { currentTime, pause, currentPeriod, periods, dispatchState } = props;

	useEffect(() => {
		let idTimer;
		if (!pause && currentTime > 0) {
			idTimer = setTimeout(() => {
				dispatchState({ type: "DECREMENT_CURRENT_TIME" });
				clearTimeout(idTimer);
			}, 1000);
		} else if (!pause && currentTime === 0) {
			dispatchState({ type: "NEXT_CLOCK" });
		}
		return () => {
			clearTimeout(idTimer);
		};
	}, [pause, currentTime]);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Clock
				valueCircular={getProcentCircular(
					currentTime,
					periods[currentPeriod].initialTime,
					currentPeriod === "break"
				)}
				time={prepareTimeView(currentTime)}
				title={currentPeriod}
			/>
			<ControllBtn />
			<EditTime />
		</div>
	);
}

function prepareTimeView(time) {
	function beforeAddZero(sec) {
		return sec >= 10 ? sec : `0${sec}`;
	}
	let min = beforeAddZero(Math.floor(time / 60));
	let sec = beforeAddZero(time % 60);
	return `${min}:${sec}`;
}

function getProcentCircular(currentTime, initialTime, reverse = true) {
	if (reverse) {
		return (currentTime / initialTime) * 100;
	}
	return 100 - (currentTime / initialTime) * 100;
}

function mapStateToProps(state) {
	const { initialTime, currentTime, pause, currentPeriod, periods } = state;
	return {
		initialTime,
		currentTime,
		pause,
		currentPeriod,
		periods,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		dispatchState(action) {
			return dispatch(action);
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
