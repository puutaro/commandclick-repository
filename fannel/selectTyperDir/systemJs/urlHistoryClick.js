
jsimport "${selectTyperGetRecentUrlFromHisConJsPath}";
jsimport "${selectTyperSaveRecentUrlToHistoryPath}";

saveRecentUrlToHistory();
jsIntent.launchShortcut(
	"${currentAppDirPath}",
	"${fannelName}"
);

