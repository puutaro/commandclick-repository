

execCopy();

function execCopy() {
    const fileDirPath = jsPath.echoPath("appFiles");
    const scriptLogPath = `${fileDirPath}/1/rootfs/home/cmdclick/script.log`;
    const scriptLogCon = jsFileSystem.readLocalFile(
        scriptLogPath
    ).replaceAll(
        "\n",
        "<br>"
    ).replaceAll(
        /[\u001b\u009b][\[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
    ).replaceAll(
        /[\x00-\x1F\x7F-\xA0]+/g,
        ""
    ).replaceAll(
        /(cmdclick@localhost)/g,
        "<br><font color=\"#30992e\"><b>$1</b></font>"
    ).replaceAll(
        /\]0\;\n*/g, ""
    ).replaceAll(
        /\n\n*/g, "\n"
    ).replaceAll(
        "\n",
        "<br>"
    ).replaceAll(
        /\<font color\=\"\#30992e\"\>\<b\>cmdclick@localhost\<\/b\>\<\/font\>: \~\<br\>/g,
        "",
    ).replaceAll(
        /\<font color\=\"\#30992e\"\>\<b\>cmdclick@localhost\<\/b\>\<\/font\>\:\~\$ \<br\>/g,
        "",
    ).replaceAll(
        /\<br\>\<br\>*/g,
        "\<br\>",
    );
    jsDialog.copyDialog_S(
        "Select text",
        scriptLogCon,
        true
    );
};