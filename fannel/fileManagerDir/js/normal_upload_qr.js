

const LONG_PRESS_LINK_URL = "${LONG_PRESS_LINK_URL}";
end_judge();

const cpFilePath = makeCpFilePath();
launchQrImageDialog(cpFilePath);


function end_judge(){
	if(
		!LONG_PRESS_LINK_URL.includes("/")
	) exitZero();
};


function makeCpFilePath(){
	let url = new URL(LONG_PRESS_LINK_URL);
	const cpFilePathNoRoot = url.pathname.split("/").slice(2).join("/");
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
	const cpFilePathSrc = [
		rootDirPath,
		cpFilePathNoRoot,
	].join("/").replace(/\/+/, "/");
	return jsPath.convertUbuntuPath(cpFilePathSrc).replace(/\/$/, "");
}

function launchQrImageDialog(cpFilePath){
	jsQr.launchUploader();
	const srcQrStr = jsQr.makeCpFileQr(
        cpFilePath,
    );
	const tempDownloadDirPath = `${00}/temp/download`;
	const scpQrImageName = "cpFileQr.png";
	const scpQrImagePath = `${tempDownloadDirPath}/${scpQrImageName}`;
	jsQr.saveQrImage(
	    srcQrStr,
	    scpQrImagePath,
	);
	let cpFilePathList = cpFilePath.split("/");
	const displayCpFilePath = makeDisplayCpFilePath(cpFilePath);
	jsDialog.imageDialog(
		`Upload: ${displayCpFilePath}`,
		scpQrImagePath,
	);
}

function makeDisplayCpFilePath(cpFilePath){
	let cpFilePathList = cpFilePath.split("/");
	const cpFilePathListLength = cpFilePathList.length;
	const displayMaxLength = 2;
	if(
		cpFilePathListLength < displayMaxLength
	) return cpFilePath;
	const sliceStartIndex = cpFilePathListLength - displayMaxLength - 1;
	if(sliceStartIndex < 0) return cpFilePath;
	return cpFilePathList.slice(sliceStartIndex).join("/");
}
