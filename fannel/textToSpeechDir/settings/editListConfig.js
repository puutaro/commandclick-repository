

// settingAction=
// 	|sAcVar=appDirPath
// 		?importPath=`${textToSpeechSettingsDirPath}/makeAppDirPath.js`
// 		?replace=
// 			SAVE_FILE="settingActin.txt"
// 	// |sVar=TEXT_VAR
// 	// 	?value=`${APP_DIR_PATH}`
// 	// |sVar=TEXT_VAR2
// 	// 	?func=toast.short
// 	// 	?args=
// 	// 		msg="aa"
// 	|sVar=filePath
// 		?sIf=`${appDirPath}`
// 		?args=
// 			baseRegex="^default$"
// 			&matchType=notEqual
// 		?onReturn=`${appDirPath}/snotEqual.txt`
// 		?onReturn=`${appDirPath}/sequal.txt`
// 	// |sAcVar=runToast
// 	// 	?sIf="aa"
// 	// 	?args=
// 	// 		baseRegex="^default$"
// 	// 		&matchType=notEqual
// 	// 	?importPath=`${textToSpeechSettingsDirPath}/toast.js`
// 	// 	?replace=
// 	// 		MESSAGE=`${filePath}`
// 	|sVar=runSaveFile
// 		?func=path.getFileName
// 		?args=
// 			msg=`${filePath}`
// 		?func=fileSystems.updateWrite
// 		?args=
// 			filePath=`${filePath}`
// 			&con=`${it}`
// 	,


list=
	mapListPath=`${textToSpeechMapListPath}`
	// |compMapListPath=`file://${newEditListSettingPath}`
	|viewLayoutPath=`${textToSpeechViewLayoutPath}`
	|defaultFrameTag="secondTest"
	|sortType=lastUpdate
	// |prefix=map&next
	// |suffix=.tsv&.txt
	,

layout=
	col=1
	|onReverseLayout=ON
	|editByDrag=
		editByDragDisable=ON
	|margin=5
	|elevation=5
	// |radius=10
	|onClickUpdate=OFF,

bk=
	image=
		paths=`${newEditExpImagesDirPath}/white_green_back_ground_90.png`
	|imageProperty=
		scale="centerCrop",

footerLayoutPath=
	`${textToSpeechFooterLayoutPath}`,

toolbarLayoutPath=
	`${newEditExpToolbarLayoutPath}`,

searchBox=
	visible=OFF,

titleLayoutPath=
	`${newEditExpTitleSettingPath}`,

delete=
	|onDeleteFile=ON
	|withJsAction=`
		func=jsToast.short
		?args=
			msg="aa"
		`
	,