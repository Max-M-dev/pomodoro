import { Box, InputAdornment, TextField } from "@mui/material";
import { connect } from "react-redux";

function EditTime(props) {
	const attrInput = {
		sx: { m: 2, width: "20ch" },
		type: "number",
		disabled: !props.pause,
		InputProps: {
			endAdornment: <InputAdornment position="end">sec</InputAdornment>,
		},
	};
	const handleChange = (period) => {
		return (event) => props.setTime(period, event.target.value);
	};
	return (
		<Box>
			<TextField
				label="Work time"
				id="outlined-name"
				value={props.work.initialTime}
				onChange={handleChange("work")}
				{...attrInput}
			/>

			<TextField
				label="Break time"
				id="outlined-name"
				value={props.break.initialTime}
				onChange={handleChange("break")}
				{...attrInput}
			/>
		</Box>
	);
}

function mapStateToProps(state) {
	return {
		work: state.periods.work,
		break: state.periods.break,
		pause: state.pause,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		setTime(period, time) {
			return dispatch({ type: "SET_TIME", payload: { period, time } });
		},
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTime);
