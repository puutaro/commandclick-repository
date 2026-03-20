
|sVar=appDirPath1
	?func=path.getMainAppDirPath
	?args=
		fannelPath=`${FANNEL_PATH}`
	// 		`/storage/emulated/0/Documents/cmdclick/AppDir/default/textToSpeech.js`

|sVar=runSavePath
	?value=`${appDirPath1}/{{ SAVE_FILE }}`
	?func=fileSystems.write
	?args=
		filePath=`${it}`
		&con="aaa"
// |sVar=runfilePath2
// 	?sIf=`${APP_DIR_PATH1}`
// 	?args=
// 		baseRegex="^default$"
// 		&matchType=notEqual
// 	?onReturn=`${APP_DIR_PATH5}/snotEqual.txt`
// 	?onReturn=`${APP_DIR_PATH}/sequal.txt`
|sAcVar=APP_DIR_PATH2
	?importPath=`${textToSpeechSettingsDirPath}/getParentDirPath.js`
	?replace=
		FILE_PATH=`${appDirPath1}`
// |sVar=APP_DIR_PATH1
// 	?value=`${APP_DIR_PATH2}/aaa`
// |sVar=APP_DIR_PATH2
// 	?func=path.getParentDirPath
// 	?args=
// 		filePath=`${APP_DIR_PATH1}`