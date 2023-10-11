

/// LABELING_SECTION_START
//  You can ask gpt35 @puutaro
/// LABELING_SECTION_END


/// SETTING_SECTION_START
scriptFileName="askGpt35.js"
/// SETTING_SECTION_END


const gpt35Url = `https://huggingface.co/spaces/kunishou/Rapid-GPT`;
jsDialog.webView(
    gpt35Url,
    "",
    "dismissType=both!iconName=cancel",
    "",
);

