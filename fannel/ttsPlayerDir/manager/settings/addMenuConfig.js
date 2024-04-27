
name=Add url con
|icon=internet
|tsvImport=`${cmdTtsPlayerManagerListIndexTsvPath}`
|jsPath=jsAddUrlCon.add_S
    ?args=
        urlStringOrMacro=RECENT
        &onSearchBtn=ON
        &urlConSaveParentDirPath=`${cmdTtsPlayerSaveUrlConDirPath}`
        &compSuffix=`${TXT_SUFFIX}`
    ,


name=Add gmail con
|icon=internet
|tsvImport=`${cmdTtsPlayerManagerGmailAdTsvPath}`
|jsPath=jsAddGmailCon.add
    ?args=
        gmailAd=`${gmailAd}`
        &urlConSaveParentDirPath=`${cmdTtsPlayerSaveUrlConDirPath}`
        &compSuffix=`${TXT_SUFFIX}`
    ,
