

const LONG_PRESS_LINK_URL = "${LONG_PRESS_LINK_URL}";
end_judge();

const scpDirPath = makeScpDirPath();
launchQrImageDialog(scpDirPath);


function end_judge(){
	if(
		!LONG_PRESS_LINK_URL.includes("/")
	) exitZero();
};


function makeScpDirPath(){
	let url = new URL(LONG_PRESS_LINK_URL);
	const scpDirPathNoRoot = url.pathname.split("/").slice(2).join("/");
	const fileManagerDirPath = jsPath.dirname(
		jsPath.dirname(`${0}`)
	);
	const fannelRawName = jsPath.basename(fileManagerDirPath).replace(/Dir$/, "");
	const mainFannelPath = [
		jsPath.dirname(
			fileManagerDirPath
		),
		`${fannelRawName}.js`,
	].join("/");
	const cmdValCon = jsScript.readCmdValsCon(mainFannelPath);
	const rootDirPath = jsScript.subValOnlyValue(
	    "ROOT_DIR_PATH",
	    cmdValCon,
	);
	return [
		rootDirPath,
		scpDirPathNoRoot,
	].join("/").replace(/\/+/, "/");
}

function launchQrImageDialog(scpDirPath){
	const srcQrStr = jsQr.makeScpQrSrcStr(scpDirPath);
	const tempDownloadDirPath = `${00}/temp/download`;
	const scpQrImageName = "scpQr.png";
	const scpQrImagePath = `${tempDownloadDirPath}/${scpQrImageName}`;
	jsQr.saveQrImage(
	    srcQrStr,
	    scpQrImagePath,
	);
	let scpDirPathList = scpDirPath.split("/");
	const displayScpDirPath = makeDisplayScpDirPath(scpDirPath);
	jsDialog.imageDialog(
		`Scp: ${displayScpDirPath}`,
		scpQrImagePath,
	);
}

function makeDisplayScpDirPath(scpDirPath){
	let scpDirPathList = scpDirPath.split("/");
	const scpDirPathListLength = scpDirPathList.length;
	const displayMaxLength = 2;
	if(
		scpDirPathListLength < displayMaxLength
	) return scpDirPath;
	const sliceStartIndex = scpDirPathListLength - displayMaxLength - 1;
	if(sliceStartIndex < 0) return scpDirPath;
	return scpDirPathList.slice(sliceStartIndex).join("/");
}
