

/// LABELING_SECTION_START
// https://github.com/puutaro/saveToGmail
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="NO"
onUpdateLastModify="ON"
disableSettingValsEdit="ON"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript


const LEAST_STRING_NUM = 300;

launchOrPaste();


function launchOrPaste(){
	var doc = document;
	var list = doc.querySelectorAll("h1,h2,h3"); 
	let tocArr = makeTocArr(list);
	var summary = makeSummary(tocArr);
    if(summary.length < LEAST_STRING_NUM) {
        summary = summaryComp(summary);
    };
	const url = location.href;
	const body = [url, summary].join("\n\n");
	jsIntent.sendGmail(
		doc.title,
		body,
		`url=${url}`,
	);
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
    ) return summary;
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

