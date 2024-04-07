
jsPath=jsCopySItem.copy_S
|args=
    copyDirOrTsvPathToTypeCon=`{{ COPY_TSV_PATH_TO_TYPE_CON }}`
    ?selectedItem=`${ITEM_TITLE}\t${ITEM_NAME}`
    ?extra=`
        withFile={{ ON_FITH_FILE:ON }}
        `,