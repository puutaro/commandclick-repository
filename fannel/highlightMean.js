

/// LABELING_SECTION_START
// Display highlight text's mean  @puutaro
// ---
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
setVariableTypes="toLang:CB=ja!en!zh!es!ko"
scriptFileName="highlightMean.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
toLang="en"
/// CMD_VARIABLE_SECTION_END


const highlightText = getSelectionText();
const mean = transByToLang(
    highlightText
);
alert(
    `${highlightText}:\n ${mean}`
);



function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    };
    if(!text) exitZero();
    return text;
};

function transByToLang(
    highlightText
){
    if(
        !toLang
    ) return highlightText;
    const convertText = jsTrans.get(
        highlightText,
        toLang,
        false
    );
    if(!convertText) exitZero();
    return convertText;
};

