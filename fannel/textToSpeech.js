

/// LABELING_SECTION_START
// site contents to speech with translation @puutaro
// ---
//  * speechMode 
//      - All: speech site contents 
//      - Summary: speech site sumamry 
//      - Copy: speech copy contents
//  * toLang
//  -> translate by specified language
//      - - : default language
//      - en: english
//      - zh: chinese
//      - es: spanish
//      - ko: korean
//      - ja: japanese
/// LABELING_SECTION_END


/// SETTING_SECTION_START
setReplaceVariables="file://${01}/${001}/settingVariables/setReplaceVariables.js"
setVariableTypes="file://${01}/${001}/settingVariables/setVariableTypes.js"
hideSettingVariables="file://${01}/${001}/settingVariables/hideSettingVariables.js"
scriptFileName="textToSpeech.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
speechMode="All"
Speed="50"
Pitch="50"
toLang="-"
/// CMD_VARIABLE_SECTION_END

Speed = Number(Speed) / 50;
if(Speed > 1000) Speed = 1000;
Pitch = Number(Pitch) / 50;
if(Pitch > 1000) Pitch = 1000;
const LEAST_STRING_NUM = 300;


let speechModeType = {
    All: "All",
    Summary: "Summary",
    Copy: "Copy"
};

function makeTocArr(list){
    if(list.length <= 0) return [];
    var tocArr = [], curH2 = [], curH3 = []; 
    for (var i = 0; i < list.length; i++) {
        var e = list[i];
        var tagName = e.tagName ;
        if (tagName == "H1") {
            tocArr.push({text:e.textContent, children:(curH2=[])});
        } else if(tagName == "H2"){
            curH2.push({text:e.textContent, children:(curH3=[])});
        } else {
            curH3.push(e.textContent);
        }
    };
    return tocArr;
}


function makePtagSummaryTotal(summaryPList, summaryEntry, prefix="-"){
    var summaryEntryPTagTextTotal = "";
    var summaryEntryPreTagText = "";
    if(summaryPList.length <= 0) return summaryEntryPTagTextTotal;
    for(var summaryPreTag of summaryPList){
        summaryEntryPreTagText = summaryPreTag.textContent.substring(
            0, LEAST_STRING_NUM
        );
        if(!summaryEntryPreTagText.trim()) continue;
        summaryEntryPTagTextTotal = summaryEntryPTagTextTotal.concat(
            "\n\t\t\t\t", 
            prefix + " ", 
            summaryEntryPreTagText
        );
        if(
            summaryEntry.length + summaryEntryPTagTextTotal.length > LEAST_STRING_NUM
        ) break;
    };
    return summaryEntryPTagTextTotal;
};


function summaryComp(summary){
    if(
        summary.length > LEAST_STRING_NUM
    ) return summary.replace(/\n\n*/g, "\n");
    let summaryPList = document.querySelectorAll("p");
    var summaryEntry = summary;
    var summaryEntryPtagTextTotal = "";
    summaryEntryPtagTextTotal = makePtagSummaryTotal(
        summaryPList, 
        summaryEntry
    );
    summaryEntry = summaryEntry.concat(
        summaryEntryPtagTextTotal
    );
    if(
        summaryEntry.length > LEAST_STRING_NUM
    ) return summaryEntry.replace(/\n\n*/g, "\n");
    let summaryPreList = document.querySelectorAll("pre");
    var summaryEntryPreTagTextTotal = "";

    summaryEntryPreTagTextTotal = makePtagSummaryTotal(
        summaryPreList, 
        summaryEntry,
        "--",
    );
    summaryEntry = summaryEntry.concat(
        summaryEntryPreTagTextTotal
    );
    if(summaryEntry) return summaryEntry.replace(/\n\n*/g, "\n");
    return "no summary";
};


function makeSummary(tocArr){
    var summary = "";
    if(
        tocArr.length <= 0
    ) return summaryComp(summary);
    for (var i in tocArr) {
        summary = summary.concat(tocArr[i].text, '\n');

        var ch = tocArr[i].children;
        if (ch.length <= 0) continue;
        for (var i2 in ch) {
            h2Con = ch[i2].text.trim().replaceAll('\n', ' ');
            if(!h2Con) break; 
            summary = summary.concat("\t\t", h2Con, '\n');

            h3ch = ch[i2].children;
            if (h3ch.length <= 0) continue;
            for (var i3 in h3ch){
                h3Con = h3ch[i3].trim().replaceAll('\n', ' ');
                if(!h3Con) break; 
                summary = summary.concat("\t\t\t\t", h3Con, '\n');
            };
        };
        if(
            summary.endsWith("\n\n")
        ) continue;
    };
    return summary.replace(/\n\n*/g, "\n");
};

var list = document.querySelectorAll("h1,h2,h3"); 
let tocArr = makeTocArr(list);
var summary = makeSummary(tocArr);

if(summary.length < LEAST_STRING_NUM) {
    summary = summaryComp(summary);
};

const appDir = "${01}/${001}";
const playFilePath = `${appDir}/playText`;
const playListPath = `${appDir}/playList`;


switch(speechMode){
    case speechModeType.Summary:
        var speechText = summary;
        break;
    case speechModeType.All:
        var speechText = document.body.innerText;
        break;
    case speechModeType.Copy:
        var speechText = jsUtil.echoFromClipboard();
        break;
};


jsFileSystem.createDir(appDir);
jsFileSystem.writeLocalFile(
    playFilePath,
    speechText
);

jsFileSystem.writeLocalFile(
    playListPath,
   `${playFilePath}`
);


jsTextToSpeech.speech(
    playListPath,
    "",
    "",
    "",
    toLang,
    "",
    Speed,
    Pitch,
);
