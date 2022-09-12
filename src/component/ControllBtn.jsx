import { Button } from "@mui/material";
import { connect } from "react-redux";

import {
	actionNextTime,
	actionStartClock,
	actionStopClock,
	actionPauseClock,
} from "../action";

function ControllBtn(props) {
	const { pause, currentPeriod, nextTime, startClock, stopClock, pauseClock } =
		props;
	let showBtn;
	if (pause) {
		showBtn = (
			<Button variant="outlined" onClick={startClock}>
				Start
			</Button>
		);
	} else {
		showBtn = (
			<Button variant="outlined" onClick={pauseClock}>
				Pause
			</Button>
		);
	}
	const handleTimerStop = () => stopClock(currentPeriod);
	const handleTimerNext = () => nextTime();

	return (
		<div style={{ display: "inline-flex", marginTop: 20, gap: 20 }}>
			<Button variant="outlined" onClick={handleTimerStop}>
				Stop
			</Button>
			{showBtn}
			<Button variant="outlined" onClick={handleTimerNext}>
				Next
			</Button>
		</div>
	);
}

function mapStateToProps(state) {
	const { pause, currentPeriod } = state;
	return {
		pause,
		currentPeriod,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		nextTime: () => dispatch(actionNextTime()),
		startClock: () => dispatch(actionStartClock()),
		pauseClock: () => dispatch(actionPauseClock()),
		stopClock(currentPeriod) {
			return dispatch(actionStopClock(currentPeriod));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllBtn);
