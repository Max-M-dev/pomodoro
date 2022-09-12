import { Box, CircularProgress, Typography } from "@mui/material";

function Clock(props) {
	const { valueCircular, time, title } = props;
	const styleText = {
		display: "flex",
		justifyContent: "center",
		textTransform: "uppercase",
	};
	const colorCirular = valueCircular > 50 ? "primary" : "error";
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress
				size={250}
				variant="determinate"
				color={colorCirular}
				value={valueCircular}
			/>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
				}}
			>
				<Typography variant="caption" sx={{ ...styleText, fontSize: 20 }}>
					{time}
				</Typography>
				<Typography variant="caption" sx={{ ...styleText, fontSize: 16 }}>
					{title}
				</Typography>
			</Box>
		</Box>
	);
}

export default Clock;
