

function makeRootDirPath(cmdValsCon){
	const rootDirPath = jsScript.subValOnlyValue(
		"ROOT_DIR_PATH",
		cmdValsCon
	);
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