

jsScript.readCmdValsCon(`${0}`);
function makeRootDirPath(){
	const rootDirPath = jsScript.getCmdVal("ROOT_DIR_PATH");
	if(rootDirPath) return rootDirPath;
	return "/";
};

function makeDirPath(
	rootDirPath,
	selectDirPath
){
	const prefixRegex = new RegExp(`^${rootDirPath}`);
	const noPrefixDirPath = selectDirPath.replace(prefixRegex, "");
	if(noPrefixDirPath.startsWith("/")) return noPrefixDirPath;
	return `/${noPrefixDirPath}`;
};

function makeFMUrlPrefix(){
	const IPV4_ADDRESS = jsNetTool.getIpv4();
	return `http://${IPV4_ADDRESS}:${PORT_NUM}`;
};