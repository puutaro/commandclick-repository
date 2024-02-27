
function saveRecentUrlToHistory(){
	const currentUrl = location.href;
	const appHistoryCon = jsFileSystem.readLocalFile(
		"${appHistoryTsvPath}"
	);
	const recentHistoryUrl = getRecentUrlFromHisCon(appHistoryCon);
	if(currentUrl == recentHistoryUrl) return;
	const saveHistoryCon = [
		`${currentUrl}\t${currentUrl}`,
		appHistoryCon
	].join("\n");
	jsFileSystem.writeLocalFile(
		"${appHistoryTsvPath}",
		saveHistoryCon
	);
};