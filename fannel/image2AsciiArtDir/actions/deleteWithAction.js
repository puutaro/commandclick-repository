// js/action

var=deleteDirPath
    ?value="{{ DELETE_DIR_PATH }}"
|func=jsFileSystem.removeFile
    ?args=
        path=`${deleteDirPath}/{{ IMAGE_NAME }}`
,
