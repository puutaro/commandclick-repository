
name=Delete
|icon=cancel
|func=SIMPLE_DELETE
,

name=Rename
|icon=edit_frame
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath="${image2AsciiArtAsciiListIndexTsvPath}"
        ?tsvValue="
            ${image2AsciiArtPreviousListPath}
            &${image2AaciiArtLikePlayListPath}
        "
    |disable=ON`
|func=RENAME
,

name=Show
|icon=file
|func=CAT,

name=Copy
|icon=copy
|alter=
    `shellIfPath=JUDGE_LIST_DIR
    |ifArgs=
        tsvPath=${image2AsciiArtAsciiListIndexTsvPath}
        ?tsvValue="
            ${image2AsciiArtPreviousListPath}
            &${image2AaciiArtLikePlayListPath}"
    |disable=ON`
|tsvImport=`${image2AsciiArtAsciiListIndexTsvPath}`
    ?use=`listDir => asciiListDirForImageLongPress`
|var=curAsciiArtList
    ?func=jsPath.basename
    ?args=path=`${asciiListDirForImageLongPress}`
|var=fileList
    ?func=jsFileSystem.showFullFileList
    ?args=
        dirPath=`${image2AaciiArtPlayListTableDirPath}`
        &extraMapCon=`
            prefix=${IMAGE2ASCIIART_PREFIX}
            |excludeFiles=
                ${image2AsciiArtPreviousListName}
                ?${image2AaciiArtLikePlayListName}
                ?${curAsciiArtList}
                `
|actionImport=
    `${image2AsciiArtCopyToOtherAction}`
|replace=
    COPY_TSV_PATH_TO_TYPE_CON=`${fileList}`,

,
