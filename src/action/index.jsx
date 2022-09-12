export function actionNextTime() {
	return { type: "NEXT_CLOCK" };
}
export function actionStartClock() {
	return { type: "START_CLOCK" };
}
export function actionStopClock(currentPeriod) {
	return { type: "STOP_CLOCK", payload: currentPeriod };
}
export function actionPauseClock() {
	return { type: "PAUSE_CLOCK" };
}
