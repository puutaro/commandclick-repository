

/// LABELING_SECTION_START
// https://github.com/puutaro/ctsvViewer
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
terminalSizeType="LONG"
terminalOutputMode="NORMAL"
onUpdateLastModify="ON"
onUrlHistoryRegister="OFF"
onAdBlock="OFF"
terminalFontZoom="0"
terminalColor=""
terminalFontColor=""
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
scriptFileName="ctsvViewer.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
scrollBoost="0"
colRange="0"
rowRange="0"
startColNum="0"
startRowNum="0"
autoScrollType="horizon"
viewType="SRC"
rowLimit=1000
inputCTsvPath=""
selectColmuns=""
filters=""
/// CMD_VARIABLE_SECTION_END


/// Please write bellow with javascript

csvCheckPathAndRegister(
	inputCTsvPath
);
let args = jsArgs.get().split("\t");
const FROM_HTML = "FROM_HTML";
const FIRST_ARGS = args.at(0);
const SECOND_ARGS = args.at(1);
let AUTO_SCROLL_TYPE_NAME = {
	no: 'no',
	horizon: 'horizon',
    rHorizon : 'rHorizon',
    vartical : 'vartical',
    rVartical : 'rVartical',
};
startColNum = Number(startColNum);
startRowNum = Number(startRowNum);
scrollBoost = Number(scrollBoost);
colRange = Number(colRange);
rowRange = Number(rowRange);
rowLimit = Number(rowLimit);
const srcTagName = "csv";
const selectColmunTagName = "selectColmunCsv";
const filteredTagName = "filteredCsv";
const PARRENT_APP_DIR_PATH = "${PARRENT_APP_DIR_PATH}";
const FANNEL_SCRIPT_PATH = `${PARRENT_APP_DIR_PATH}/` + "${02}";
const CURRENT_APP_DIR_PATH = "${CURRENT_APP_DIR_PATH}";
const CURRENT_LIST_DIR_PATH="${CURRENT_LIST_DIR_PATH}";
jsFileSystem.createDir(CURRENT_LIST_DIR_PATH);
const CURRENT_COLUMN_LIST_FILE_PATH = "${CURRENT_COLUMN_LIST_FILE_PATH}";
const CURRENT_FILTERS_LIST_FILE_PATH = "${CURRENT_FILTERS_LIST_FILE_PATH}";
const CURRENT_FILTER_GAIN_LIST_FILE_PATH = "${CURRENT_FILTER_GAIN_LIST_FILE_PATH}";
const CURRENT_INUPT_CSV_LIST_FILE_PATH = "${CURRENT_INUPT_CSV_LIST_FILE_PATH}";
const HTML_TEMPLATE_DIR_PATH = `${CURRENT_APP_DIR_PATH}/html`;
const HTML_AG_TABLE_TEMPLATE_FILE_PATH = `${HTML_TEMPLATE_DIR_PATH}/aggre_table.html`;
const HTML_AG_CHART_TEMPLATE_FILE_PATH = `${HTML_TEMPLATE_DIR_PATH}/bar_chart_js.html`;
const LAUNCH_HTML_NAME = inputCTsvPath.split("/").at(-1).replace(/\.[a-zA-Z0-9_-]*$/, "");
const HTML_LAUNCH_DIR_PATH = `${CURRENT_APP_DIR_PATH}/launch`;
jsFileSystem.createDir(HTML_LAUNCH_DIR_PATH);
const HTML_LAUNCH_FILE_PATH = `${HTML_LAUNCH_DIR_PATH}/ctsvViewer.html`;
const TEMP_DIR_PATH = `${CURRENT_APP_DIR_PATH}/tmp`;
jsFileSystem.createDir(TEMP_DIR_PATH);
const SEARCH_INFO_FILE_PATH = `${TEMP_DIR_PATH}/search_info`;
const HTML_TITLE_TEMP_FILE_PATH = `${TEMP_DIR_PATH}/html_title`;
const SELECT_FIRST_READ_TEMP_FILE_PATH = `${TEMP_DIR_PATH}/first_read`;
const SELECT_COLUMN_TEMP_FILE_PATH = `${TEMP_DIR_PATH}/select_colunm`;
const FILTER_COLUMN_TEMP_FILE_PATH = `${TEMP_DIR_PATH}/filter_csv`;
const START_NUM_STR_SAVE_FILE_PATH = `${TEMP_DIR_PATH}/start_num_str`;
const CMDCLICK_CSV_FINDER_TITLE = "CMDCLICK_CSV_FINDER_TITLE";
const CMDCLICK_CSV_FINDER_TABLE_BODY = "CMDCLICK_CSV_FINDER_TABLE_BODY";
const CMDCLICK_CSV_FINDER_PAGE_NATION = "CMDCLICK_CSV_FINDER_PAGE_NATION";
const CMDLICK_LABEL_LIST = "CMDLICK_LABEL_LIST";
const CMDLICK_LABEL_LIST1 = `${CMDLICK_LABEL_LIST}1`;
const CMDLICK_LABEL_LIST2 = `${CMDLICK_LABEL_LIST}2`;
const CMDLICK_UNIQ_LIST = "CMDLICK_UNIQ_LIST";
const CMDLICK_UNIQ_LIST1 = `${CMDLICK_UNIQ_LIST}1`;
const CMDLICK_UNIQ_LIST2 = `${CMDLICK_UNIQ_LIST}2`;
const CMDLICK_SUM_MAX_W_LIST = "CMDLICK_SUM_MAX_W_LIST";
const CMDLICK_SUM_MAX_W_LIST1 = `${CMDLICK_SUM_MAX_W_LIST}1`;
const CMDLICK_SUM_MAX_W_LIST2 = `${CMDLICK_SUM_MAX_W_LIST}2`;
const CMDLICK_SUM_MIN_W_LIST = "CMDLICK_SUM_MIN_W_LIST";
const CMDLICK_SUM_MIN_W_LIST1 = `${CMDLICK_SUM_MIN_W_LIST}1`;
const CMDLICK_SUM_MIN_W_LIST2 = `${CMDLICK_SUM_MIN_W_LIST}2`;
const CMDLICK_SUM_AVR_LIST = "CMDLICK_SUM_AVR_LIST";
const CMDLICK_SUM_AVR_LIST1 = `${CMDLICK_SUM_AVR_LIST}1`;
const CMDLICK_SUM_AVR_LIST2 = `${CMDLICK_SUM_AVR_LIST}2`;
const CMDCLICK_FIRST_READ_EXEC_SIGN = "CMDCLICK_FIRST_READ_EXEC_SIGN";
const CMDCLICK_SELECT_COLUMN_EXEC_SIGN = "CMDCLICK_SELECT_COLUMN_EXEC_SIGN";
initNumVariable();
let VIEW_TYPE_NAME = {
	AGGRE: 'AGGRE',
    CHART : 'CHART',
    SRC : 'SRC',
};
let MotionType = {
	back: "back",
	repeat: "repeat",
	forward: "forward",
	ZERO: "ZERO",
};

const CMDCLICK_FANNEL_SCRIPT_PATH = "CMDCLICK_FANNEL_SCRIPT_PATH";
const isRead = jsCsv.isRead(srcTagName);
firstRead(isRead);
const isReadForSelect = jsCsv.isRead(
	selectColmunTagName
);
execSelectColumns(
	isReadForSelect
);

syncSelectColumns();
makeFilters();

execFilterColumns();

const PAST_SEARCH_INFO = readSearchInfo(isRead);
const PAST_START_NUM_STR = readStartNumStr();
const filteredCsvColNum = jsCsv.toCol(
	filteredTagName, 2, 0, 0
).split("\n").length;

const filterCsvStr = jsCsv.outPutTsvForDRow(
	filteredTagName
);

const filterdColSize = 
	jsCsv.takeColSize(filteredTagName);
const headerRow = jsCsv.toHeaderRow(
	filteredTagName,
	0,
	filterdColSize
);
const filteredTagNameRowSize = jsCsv.takeRowSize(
	filteredTagName
);

if(
	colRange == 0
) colRange = filterdColSize;
if(
	rowRange == 0
) rowRange = filteredTagNameRowSize;
cancelerAutoScrollTypeByRange(
	filteredTagNameRowSize,
	filterdColSize
);

switchStartNumByScrollType();

const endColNum = makeEndNum(
	startColNum,
	colRange,
	filterdColSize
);

const endRowNum = makeEndNum(
	startRowNum,
	rowRange,
	filteredTagNameRowSize
);

displayStartColNum = startColNum;
if(
	displayStartColNum == 0
) displayStartColNum = 1;
const currentLastLocation = 
	`row: ${startRowNum}/${filteredTagNameRowSize}  `
	+ `col: ${displayStartColNum}/${filterdColSize}`;

const sliceHeaderRow = jsCsv.sliceHeader(
    filteredTagName,
    startColNum,
    endColNum,
    headerRow,
);

const agHeaderRowHtmlStr = jsCsv.toHtml(
	sliceHeaderRow,
	"on"
);


var agSourceCsvStrHtmlStr = "";
var aggregateCsvHtmlStr = "";
let chartAgUniqList = [];
let chartAgSumMaxWList = [];
let chartAgSumMinWList = [];
let chartAgSumAvrList = [];
makeSrcAndAggregateHtml(
	startRowNum, endRowNum,
	startColNum, endColNum,
);

let sliceHeaderList = 
	sliceHeaderRow.split("\t");

switchByArgs();


function cancelerAutoScrollTypeByRange(
	filteredTagNameRowSize,
	filterdColSize
){
	switch(autoScrollType){
		case AUTO_SCROLL_TYPE_NAME.horizon:
		case AUTO_SCROLL_TYPE_NAME.rHorizon:
			if(
				colRange >= filterdColSize
			) autoScrollType = AUTO_SCROLL_TYPE_NAME.no;
			break;
		case AUTO_SCROLL_TYPE_NAME.vartical:
		case AUTO_SCROLL_TYPE_NAME.rVartical:
			if(
				rowRange >= filteredTagNameRowSize
			) autoScrollType = AUTO_SCROLL_TYPE_NAME.no;
			break;
	};
}


function firstRead(
	isRead
){
	const pastInputPathRowLimit = jsFileSystem.readLocalFile(
		SELECT_FIRST_READ_TEMP_FILE_PATH
	);
	jsFileSystem.writeLocalFile(
		SELECT_FIRST_READ_TEMP_FILE_PATH,
		`${inputCTsvPath}${rowLimit}`,
	);
	const currentInputPathRowLimit = `${inputCTsvPath}${rowLimit}`;
	const onChangeInputPath = 
		pastInputPathRowLimit != currentInputPathRowLimit;
	if(
		isRead
		&& !onChangeInputPath
	) return;
	jsCsv.read_S(
		srcTagName,
		inputCTsvPath, 
		"", 
		rowLimit,
	);
	jsFileSystem.writeLocalFile(
		CURRENT_COLUMN_LIST_FILE_PATH,
		jsCsv.toHeaderRow(
			srcTagName, 0, 0
		).replaceAll("\t", "\n")
	);
	jsFileSystem.writeLocalFile(
		SELECT_COLUMN_TEMP_FILE_PATH,
		CMDCLICK_FIRST_READ_EXEC_SIGN
	);
	jsFileSystem.writeLocalFile(
		FILTER_COLUMN_TEMP_FILE_PATH,
		CMDCLICK_FIRST_READ_EXEC_SIGN
	);
	const firstHeaderRow = jsCsv.toHeaderRow(
		srcTagName, 0, 0
	);
	if(!firstHeaderRow) exitZero();
};

function syncSelectColumns(){
	if(
		FIRST_ARGS != "selectColSync"
	) return;
	jsFileSystem.writeLocalFile(
		CURRENT_COLUMN_LIST_FILE_PATH,
		jsCsv.toHeaderRow(
			srcTagName, 0, 0
		).replaceAll("\t", "\n")
	);
	jsToast.short("column sync ok");
	exitZero();
};


function makeFilters(
){
	const targetVariable = "filters";
	const filtersArgsName = targetVariable;
	if(
		FIRST_ARGS != filtersArgsName
	) return;
	let filterMapKey = {
		operator: "operator",
		filterGain: "filterGain"
	};
	const filtersMap = makeFiltersMap(
		targetVariable,
		filterMapKey
	);
	const filteringColumns = jsDialog.multiListDialog(
        "Select filter column",
        jsCsv.toHeaderRow(selectColmunTagName, 0, 0).replaceAll("\t", "\n"),
        Array.from(
        	filtersMap.keys()
        ).join("\n"),
    );
    if(!filteringColumns) {
    	exitZero();
    	return;
    }
    let filteringColumnList = filteringColumns.split("\t");
    const updatefilters = makeUpdateFilters(
		filteringColumnList,
		filtersMap,
		filterMapKey,
	);
	updateByFiltersFlow(
		targetVariable,
		updatefilters,
	);
	exitZero();
};

function makeFiltersMap(
	targetVariable,
	filterMapKey
){
	let filtersMapSourceList = jsEdit.getFromEditText(
		targetVariable
	).split("\t").map(function(el){
		let elList = el.split(",");
		if(
			elList.length != 3
		) return [];
		const key = elList[0].trim();
		const operatorGainMap = new Map(
			[
				[filterMapKey.operator, elList[1].trim()],
				[filterMapKey.filterGain, elList[2].trim()]
			]
		);
		return [key, operatorGainMap]
	}).filter(function(elList){
		return elList != [];
	});
	return new Map(filtersMapSourceList);
};

function makeUpdateFilters(
	filteringColumnList,
	filtersMap,
	filterMapKey,
){
	const operatorList = ["in", ">=", "<=", ">", "<" ,"="];
	return filteringColumnList.map(
    	function(colName){
    		const opeGainMap = filtersMap.get(colName);
    		try{
    		    var operator = opeGainMap.get(
    		    	filterMapKey.operator
    		    );
    		} catch(e){
    			var operator = operatorList[0];
    		};
    		try {
    			var filterGain = opeGainMap.get(
    				filterMapKey.filterGain
    			);
    		} catch(e) {
    			var filterGain = "";
    		}
    		let noFocusOperatorList = operatorList.filter(
    			function(op){
	    			return op != operator;
	    		});
    		let updateOperatorList = [operator].concat(
    			noFocusOperatorList
    		);
    		return jsDialog.formDialog(
				`Edit "${colName}" filter`,
				`colName:RO=\noperator:CB=${updateOperatorList.join("?")}\nfilterGain:ELCB=${LIST_PATH}=${CURRENT_FILTER_GAIN_LIST_FILE_PATH}?${LIMIT_NUM}=30`,
				`colName=${colName}\noperator=${colName}\nfilterGain=${filterGain}`,
			).split("\n").map(
		    	function(query){
		    		let queryList = query.split("=");
		    		if(queryList < 2) return "";
		    		return queryList
		    			.slice(1)
		    			.join("=")
		    			.trim()
		    			.replaceAll("\"", "");
		    	});
    	}).join("\t");
};

function updateByFiltersFlow(
	targetVariable,
	updatefilters,
){
	var setFilterOk = false;
    if(
    	updatefilters
    ) setFilterOk = confirm(
    	`Set bellow filters ok?\n\n ${updatefilters.replaceAll("\t", "\n\ ")}`
    );
    if(!setFilterOk) {
    	exitZero();
    	return;
    };
    let updatefiltersList = updatefilters.split("\t");
    let filterGainsList = updatefilters.split("\t").map(
    	function(filter){
    		let filterSeries = filter.split(",");
    		if(filterSeries.length != 3) return "";
    		return filterSeries[2];
    	}).filter(function(gain){
    		return gain != "";
    	});
    const filterGains = filterGainsList.join("\n");
    const currentFilterGainList = jsFileSystem.readLocalFile(
    	CURRENT_FILTER_GAIN_LIST_FILE_PATH
    ).split("\n");
    const saveFilterGains = filterGainsList.filter(function(filter){
    	return !currentFilterGainList.includes(filter);
    }).join("\n");
    if(saveFilterGains){
        jsListSelect.updateListFileCon(
    		CURRENT_FILTER_GAIN_LIST_FILE_PATH,
    		saveFilterGains
    	);
   	};
    jsListSelect.updateListFileCon(
		CURRENT_FILTERS_LIST_FILE_PATH,
		updatefilters
	);
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        targetVariable,
    	updatefilters
	);
};

function execSelectColumns(
	isReadForSelect
){
	const currentSelectColumn = jsFileSystem.readLocalFile(
		SELECT_COLUMN_TEMP_FILE_PATH
	);
	jsFileSystem.writeLocalFile(
		SELECT_COLUMN_TEMP_FILE_PATH,
		selectColmuns
	);
	if(
		currentSelectColumn == selectColmuns
		&& isReadForSelect
	) return;
	jsCsv.selectColumn_S(
		srcTagName,
		selectColmunTagName,
		selectColmuns
	);
	jsFileSystem.writeLocalFile(
		FILTER_COLUMN_TEMP_FILE_PATH,
		CMDCLICK_SELECT_COLUMN_EXEC_SIGN
	);
	const selectSectionHeaderRow = jsCsv.toHeaderRow(
		selectColmunTagName, 0, 0
	);
	if(
		!selectSectionHeaderRow
	) exitZero();
};

function execFilterColumns(){
	const isReadForFilter = jsCsv.isRead(
		filteredTagName
	);
	const currentFilters = jsFileSystem.readLocalFile(
		FILTER_COLUMN_TEMP_FILE_PATH
	);
	jsFileSystem.writeLocalFile(
		FILTER_COLUMN_TEMP_FILE_PATH,
		filters
	);
	if(
		currentFilters == filters
		&& isReadForFilter
	) return;
	jsCsv.filter_S(
		selectColmunTagName,
	    filteredTagName,
	    filters
	);
};


function switchStartNumByScrollType(){
	const CURRENT_SEARCH_INFO = makeSearchInfo();
	const CURRENT_START_NUM_STR = makeStartNumStr();
	const PAST_TITLE = jsFileSystem.readLocalFile(
		HTML_TITLE_TEMP_FILE_PATH,
	);
	const CURRENT_TITLE = document.title;
	const onRestoreHtml = !CURRENT_TITLE && PAST_TITLE != CURRENT_TITLE;
	const onZeroStan = judgeStanbyStartNum(
		CURRENT_START_NUM_STR
	);
	writeSearchInfo(CURRENT_SEARCH_INFO);
	writeStartNumStr(CURRENT_START_NUM_STR);
	jsFileSystem.writeLocalFile(
		HTML_TITLE_TEMP_FILE_PATH,
		CURRENT_TITLE
	);
	if(onZeroStan) return;
	if( 
		CURRENT_SEARCH_INFO != PAST_SEARCH_INFO
		|| onRestoreHtml
	) return;
	switch(autoScrollType){
		case AUTO_SCROLL_TYPE_NAME.horizon:
			startColNum = startColNum + 1 + colRange * scrollBoost;
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        "startColNum",
				startColNum,
			);
			break;
		case AUTO_SCROLL_TYPE_NAME.rHorizon:
			startColNum = startColNum - 1 - colRange * scrollBoost;
			if(startColNum < 0) startColNum = 1;
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		      	"startColNum",
				startColNum,
			);
			break;
		case AUTO_SCROLL_TYPE_NAME.vartical:
			startRowNum = startRowNum + 1 + rowRange * scrollBoost;
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		      	"startRowNum",
				startRowNum,
			);
			break;
		case AUTO_SCROLL_TYPE_NAME.rVartical:
			startRowNum = startRowNum - 1 - rowRange * scrollBoost;
			if(startColNum < 0) startRowNum = 1;
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		      	"startRowNum",
				startRowNum,
			);
			break;
	};
};

function switchByArgs(){
	var handlerType = SECOND_ARGS;
	if(!handlerType) handlerType = viewType;
	switchFirstArgs(handlerType);
	backStartNum();
	switch(handlerType){
		case VIEW_TYPE_NAME.AGGRE:
			launchCTsvViewHtml(
				aggregateCsvHtmlStr
			);
			break;
		case VIEW_TYPE_NAME.CHART:
			launchCartViewHtml(
				sliceHeaderList,
				chartAgUniqList,
				chartAgSumMaxWList,
				chartAgSumMinWList,
				chartAgSumAvrList,
				sliceHeaderList.length,
			);
			break;
		case VIEW_TYPE_NAME.SRC:
			launchCTsvViewHtml(
				agSourceCsvStrHtmlStr
			);
			break;
	};
};


function switchFirstArgs(
	handlerType
){
	updateViewType(
		handlerType
	);
};


function initNumVariable(){
	const initPrefix = "init";
	let initList = [
		`${initPrefix}StartColNum`,
		`${initPrefix}StartRowNum`,
		`${initPrefix}ColRange`,
		`${initPrefix}RowRange`,
		`${initPrefix}ScrollBoost`,
		`${initPrefix}RowLimit`
	];
	const initIndex = initList.indexOf(FIRST_ARGS);
	if(initIndex < 0) return;
	const initPrefixRegex = new RegExp(`^${initPrefix}`);
	const updateVariableName = 
		initList[initIndex].replace(initPrefixRegex, '');
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        capitalize(updateVariableName),
        "0"
    );
	exitZero();
};

function updateViewType(
	handlerType
){
	if(
		FIRST_ARGS != FROM_HTML
	) return;
	const viewTypeName = "viewType";
	jsEdit.updateSpinner(
		viewTypeName, 
		handlerType
	);
	jsEdit.updateByVariable(
		FANNEL_SCRIPT_PATH,
        viewTypeName,
		handlerType,
    );
};

function makeSrcAndAggregateHtml(
	rowStartNum, rowEndNum,
	colStartNum, colEndNum,
){
	let agSourceCsv = [];
	let aggregateCsv = [];
	const descStyle = "<span style=\"color:#5FE0C1;\">";
	const headerList = jsCsv.sliceHeader(
	    filteredTagName,
	    startColNum,
	    endColNum,
	    headerRow,
	).split("\t");
	range(
		colStartNum, 
		colEndNum
	).forEach(
		function(num){
			let aggregateRow = [];
			let chartAggregateRow = [];
			let colString = jsCsv.toCol(
				filteredTagName, num - 1, rowStartNum, rowEndNum
			);
			agSourceCsv.push(
				colString.replaceAll("\n", "\t")
			);
			let cols = colString.split("\n");
			const uniq = Array.from(new Set(cols)).length;
			aggregateRow.push(`${descStyle}uniq</span></br>` + uniq);
			chartAgUniqList.push(uniq);
			let sortedCols = cols.sort();
			let freqCols = sortByFrequency(sortedCols);
			var maxFreqWord = freqCols.at(0);
			if(!maxFreqWord) maxFreqWord = "null";
			aggregateRow.push(`${descStyle}maxW</span></br>` + maxFreqWord);
			var sumMaxFreqWord = countFreqWord(
				freqCols,
				maxFreqWord,
			);
			aggregateRow.push(`${descStyle}sumMaxW</span></br>` + sumMaxFreqWord);
			chartAgSumMaxWList.push(sumMaxFreqWord);
			var minFreqWord = freqCols.at(-1);
			if(!minFreqWord) minFreqWord = "null";
			aggregateRow.push(`${descStyle}minW</span></br>` + minFreqWord);
			var sumMinFreqWord = countFreqWord(
				freqCols,
				minFreqWord,
			);
			aggregateRow.push(`${descStyle}sumMinW</span></br>` + sumMinFreqWord);
			chartAgSumMinWList.push(sumMinFreqWord);
			var max = 0;
			var min = 0;
			if(cols.every(isNaN)) {
				var centerIndex = freqCols.length / 2;
				var avarageStr = cols.at(centerIndex);
				if(!avarageStr) avarageStr = "null";
				aggregateRow.push(`${descStyle}avrW</span></br>` + avarageStr);
				var sumAvr = countFreqWord(
					freqCols,
					avarageStr,
				);
				aggregateRow.push(`${descStyle}sumAvrW</span></br>` + sumAvr);
				chartAgSumAvrList.push(sumAvr);
				aggregateRow.push(`${descStyle}max</span></br>` + max);
				aggregateRow.push(`${descStyle}min</span></br>` + min);
			} else {
				var average = cols.reduce((a, b) => a + b) / cols.length;
				if(!average) average = 0;
				aggregateRow.push(`${descStyle}avr</span></br>` + average);
				var sumAvr = countFreqWord(
					cols,
					average,
				);
				aggregateRow.push(`${descStyle}sumAvrW</span></br>` + sumAvr);
				chartAgSumAvrList.push(sumAvr);
				max = cols.reduce((a,b)=>Math.max(a,b));
				if(!max) max = 0;
				aggregateRow.push(`${descStyle}max</span></br>` + max);
				min = cols.reduce((a,b)=>Math.min(a,b));
				if(!min) min = 0;
				aggregateRow.push(`${descStyle}min</span></br>` + min);
			}
			aggregateCsv.push(aggregateRow.join("\t"));
		}
	);
	const agSourceCsvStr = agSourceCsv.join("\n");
	const agSourceCsvStrTrans = jsText.trans(agSourceCsvStr);
	agSourceCsvStrHtmlStr = agHeaderRowHtmlStr + "\n" + jsCsv.toHtml(
		agSourceCsvStrTrans,
		""
	);

	const aggregateCsvStr = aggregateCsv.join("\n");
	const aggregateCsvStrTrans = jsText.trans(aggregateCsvStr);
	aggregateCsvHtmlStr = agHeaderRowHtmlStr 
		+ "\n" 
		+ jsCsv.toHtml(
			aggregateCsvStrTrans,
			""
		);
};


function launchCartViewHtml(
	headerRowList,
	chartAgUniqList,
	chartAgSumMaxWList,
	chartAgSumMinWList,
	chartAgSumAvrList,
	filterdColSize,
){
	var splitLength = Math.floor(filterdColSize / 2);
	const splitRemain = filterdColSize % 2;
	if(splitRemain != 0) splitLength++;
	let headerRowSplitList = sliceByNumber(
		headerRowList, splitLength
	);
	let chartAgUniqSplitList = sliceByNumber(
		chartAgUniqList, splitLength
	);
	let chartAgSumMaxWSplitList = sliceByNumber(
		chartAgSumMaxWList, splitLength
	);
	let chartAgSumMinWSplitList = sliceByNumber(
		chartAgSumMinWList, splitLength
	);
	let chartAgSumAvrSplitList = sliceByNumber(
		chartAgSumAvrList, splitLength
	);
	const chartListLength = chartAgSumAvrSplitList.length;
	var launch_chart_html_contents = jsFileSystem.readLocalFile(
		HTML_AG_CHART_TEMPLATE_FILE_PATH
	);
	launch_chart_html_contents = makeReplacedHeaderHtml(
			launch_chart_html_contents,
			headerRowSplitList,
			chartListLength
	);
	launch_chart_html_contents = makeReplacedAgShemaHtml(
		launch_chart_html_contents,
		chartAgUniqSplitList,
		chartListLength,
		[CMDLICK_UNIQ_LIST1, CMDLICK_UNIQ_LIST2],
	);
	launch_chart_html_contents = makeReplacedAgShemaHtml(
		launch_chart_html_contents,
		chartAgSumMaxWSplitList,
		chartListLength,
		[CMDLICK_SUM_MAX_W_LIST1, CMDLICK_SUM_MAX_W_LIST2],
	);
	launch_chart_html_contents = makeReplacedAgShemaHtml(
		launch_chart_html_contents,
		chartAgSumMinWSplitList,
		chartListLength,
		[CMDLICK_SUM_MIN_W_LIST1, CMDLICK_SUM_MIN_W_LIST2],
	);
	launch_chart_html_contents = makeReplacedAgShemaHtml(
		launch_chart_html_contents,
		chartAgSumAvrSplitList,
		chartListLength,
		[CMDLICK_SUM_AVR_LIST1, CMDLICK_SUM_AVR_LIST2],
	);
	jsFileSystem.createDir(HTML_LAUNCH_DIR_PATH);
	launch_chart_html_contents = launch_chart_html_contents
		.replace(
			CMDCLICK_FANNEL_SCRIPT_PATH,
			FANNEL_SCRIPT_PATH
		).replace(
			CMDCLICK_CSV_FINDER_PAGE_NATION,
			currentLastLocation
		).replace(
			CMDCLICK_CSV_FINDER_TITLE,
			LAUNCH_HTML_NAME
		);
	jsFileSystem.writeLocalFile(
		HTML_LAUNCH_FILE_PATH,
		launch_chart_html_contents
	);
	jsToast.short(currentLastLocation);
	jsUrl.loadUrl("file://" + HTML_LAUNCH_FILE_PATH);
};

function makeReplacedHeaderHtml(
		chart_html_contents,
		headerRowSplitList,
		chartListLength
){
	if(chartListLength == 0) return chart_html_contents;
	var launch_chart_html_contents = chart_html_contents.replace(
		CMDLICK_LABEL_LIST1,
		`[${headerRowSplitList[0].map(
			function(el){return `\"${el}\"`}).join(",")}]`
	);
	if(chartListLength <= 1) {
		launch_chart_html_contents = launch_chart_html_contents.replace(
			CMDLICK_LABEL_LIST2,
			`[]`
		);
		return launch_chart_html_contents;
	};
	return launch_chart_html_contents.replace(
		CMDLICK_LABEL_LIST2,
		`[${headerRowSplitList[1].map(
			function(el){return `\"${el}\"`}).join(",")}]`
	);
};


function makeReplacedAgShemaHtml(
	chart_html_contents,
	chartAgSplitList,
	chartListLength,
	replaceValNameList,
){
	if(chartListLength == 0) return chart_html_contents;
	var launch_chart_html_contents = chart_html_contents.replace(
		replaceValNameList[0],
		`[${chartAgSplitList[0].join(",")}]`
	);
	if(chartListLength <= 1) {
		launch_chart_html_contents = launch_chart_html_contents.replace(
			replaceValNameList[1],
			`[]`
		);
		return launch_chart_html_contents;
	};
	return launch_chart_html_contents.replace(
		replaceValNameList[1],
		`[${chartAgSplitList[1].join(",")}]`
	);
};

function range(
	startNum, 
	endNum
){
	return [...Array(endNum).keys()].filter(
		function(num){
			return num + 1 >= startNum;
	}).map(
		function(num){
			return num + 1;
	});
};


function sortByFrequency(data) {
  const freq = data.reduce((r, e) => {
    if (!r[e]) r[e] = 1;
    else r[e]++;
    return r;
  }, {});

  return [...data].sort((a, b) => {
    return freq[b] - freq[a] || a - b
  });
};


function countFreqWord(
	freqCols,
	freqWord,
){
	const sumFreqWord =freqCols.filter(function(cell){
		return cell == freqWord;
	}).length;
	if(
		!sumFreqWord 
		|| sumFreqWord == 0
	) return 1;
	return sumFreqWord;
};

function launchCTsvViewHtml(
	aggregateCsvHtmlStr
){
	const launch_html_contents = jsFileSystem.readLocalFile(
		HTML_AG_TABLE_TEMPLATE_FILE_PATH
	).replace(
		CMDCLICK_CSV_FINDER_TITLE,
		LAUNCH_HTML_NAME
	).replace(
		CMDCLICK_CSV_FINDER_TABLE_BODY, 
		aggregateCsvHtmlStr
	).replace(
		CMDCLICK_CSV_FINDER_PAGE_NATION,
		currentLastLocation
	).replace(
		CMDCLICK_FANNEL_SCRIPT_PATH,
		FANNEL_SCRIPT_PATH
	);
	jsFileSystem.createDir(
		HTML_LAUNCH_DIR_PATH
	);
	jsFileSystem.writeLocalFile(
		HTML_LAUNCH_FILE_PATH,
		launch_html_contents
	);
	jsToast.short(currentLastLocation);
	jsUrl.loadUrl("file://" + HTML_LAUNCH_FILE_PATH);

};

function sliceByNumber(array, number){
  const length = Math.ceil(array.length / number);
  return new Array(length).fill().map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  );
};

function range(
	startNum, 
	endNum
){
	return [...Array(endNum).keys()].filter(
		function(num){
			return num + 1 >= startNum;
	}).map(
		function(num){
			return num + 1;
	});
};


function sortByFrequency(data) {
  const freq = data.reduce((r, e) => {
    if (!r[e]) r[e] = 1;
    else r[e]++;
    return r;
  }, {});

  return [...data].sort((a, b) => {
    return freq[b] - freq[a] || a - b
  });
};


function countFreqWord(
	freqCols,
	freqWord,
){
	const sumFreqWord =freqCols.filter(function(cell){
		return cell == freqWord;
	}).length;
	if(
		!sumFreqWord 
		|| sumFreqWord == 0
	) return 1;
	return sumFreqWord;
};

function makeEndNum(
	startNum,
	range,
	size
){
	if(
		range == 0
	) return size;
	return startNum + range;
};

function capitalize(str) {
	if (
		typeof str !== 'string' 
		|| !str
	) return str;
	return str.charAt(0).toLowerCase() 
		+ str.slice(1);
};

function readSearchInfo(isRead){
	if(!isRead) return "";
	return jsFileSystem.readLocalFile(
		SEARCH_INFO_FILE_PATH,
	);
};
function writeSearchInfo(
	jsContents
){
	jsFileSystem.writeLocalFile(
		SEARCH_INFO_FILE_PATH,
		jsContents
	);
};
function makeSearchInfo(){
	const searchInfoSource = `${colRange}${rowRange}`
 		+ `${autoScrollType}${inputCTsvPath}${rowLimit}`;
	switch(autoScrollType){
		case AUTO_SCROLL_TYPE_NAME.horizon:
		case AUTO_SCROLL_TYPE_NAME.rHorizon:
			return `${searchInfoSource}${startRowNum}`;
			break;
		case AUTO_SCROLL_TYPE_NAME.vartical:
		case AUTO_SCROLL_TYPE_NAME.rVartical:
			return `${searchInfoSource}${startColNum}`;
			break;
	};
	return searchInfoSource;
};

function readStartNumStr(){
	return jsFileSystem.readLocalFile(
		START_NUM_STR_SAVE_FILE_PATH,
	);
};
function writeStartNumStr(
	jsContents
){
	jsFileSystem.writeLocalFile(
		START_NUM_STR_SAVE_FILE_PATH,
		jsContents
	);
};
function makeStartNumStr(){
	switch(autoScrollType){
		case AUTO_SCROLL_TYPE_NAME.horizon:
		case AUTO_SCROLL_TYPE_NAME.rHorizon:
			return `startColNum${startColNum}`;
			break;
		case AUTO_SCROLL_TYPE_NAME.vartical:
		case AUTO_SCROLL_TYPE_NAME.rVartical:
			return `startRowNum${startRowNum}`;
			break;
	};
	return "";
};
function judgeStanbyStartNum(
	CURRENT_START_NUM_STR
){
	var onFirstNumStr = false;
	switch(autoScrollType){
		case AUTO_SCROLL_TYPE_NAME.horizon:
		case AUTO_SCROLL_TYPE_NAME.rHorizon:
			onFirstNumStr = "startColNum0" == CURRENT_START_NUM_STR;
			break;
		case AUTO_SCROLL_TYPE_NAME.vartical:
		case AUTO_SCROLL_TYPE_NAME.rVartical:
			onFirstNumStr =  "startRowNum0" == CURRENT_START_NUM_STR;
			break;
	};
	if(!onFirstNumStr) return false;
	return PAST_START_NUM_STR != CURRENT_START_NUM_STR;
};

function backStartNum(){
	const judgeRowOrCol = 
		judgeReturnBack();
	motionHandler(
		judgeRowOrCol
	);
};

function judgeReturnBack(){
	switch(autoScrollType){
		case AUTO_SCROLL_TYPE_NAME.horizon:
		case AUTO_SCROLL_TYPE_NAME.rHorizon:
			if(startColNum >= filterdColSize){
				return "startColNum";
			};
			break;
		case AUTO_SCROLL_TYPE_NAME.vartical:
		case AUTO_SCROLL_TYPE_NAME.rVartical:
			if(startRowNum >= filteredTagNameRowSize){
				return "startRowNum";
			}
			break;
	};
	return "";
};

function motionHandler(
	judgeRowOrCol
){
	switch(judgeRowOrCol){
		case "startColNum":
			motionFlow(
				startRowNum,
				rowRange,
				filteredTagNameRowSize,
				"select row motion",
				"startColNum",
				"startRowNum",
			);
			break;
		case "startRowNum":
			motionFlow(
				startColNum,
				colRange,
				filterdColSize,
				"select col motion",
				"startRowNum",
				"startColNum",
			);
			break;
	};
};

function motionFlow(
	startNum,
	range,
	endNum,
	description,
	initVariableName,
	motionVariableName,
){
	const startLimitNum = 0;
	var preBackStartRowNum = startNum - rowRange;
	if(
		preBackStartRowNum < startLimitNum
	) preBackStartRowNum = startLimitNum;
	if(
		startNum <= startLimitNum
	) preBackStartRowNum = -1;
	var preForwardStartRowNum = startNum + rowRange;
	if(
		startNum > endNum
	) preForwardStartRowNum = endNum + 1;
	var motionList = makeMotionList(
		preBackStartRowNum,
		preForwardStartRowNum,
		endNum
	);
	var selectedMotion = jsDialog.listDialog(
		description,
		"",
		motionList
	);
	execMotion(
		selectedMotion,
		initVariableName,
		motionVariableName,
		preBackStartRowNum,
		preForwardStartRowNum
	);
};

function makeMotionList(
	preBackStartNum,
	preForwardStartNum,
	endNum
){
	const startLimitNum = 0;
	if(
		preBackStartNum >= startLimitNum
	) var backSelect = `${MotionType.back}`;
	else var backSelect = "";
	var repeatSelect = MotionType.repeat;
	if(
		preForwardStartNum <= endNum
	) var forwardSelect = `${MotionType.forward}`;
	else var forwardSelect = `${MotionType.ZERO}`;
	return [
		backSelect,
		repeatSelect,
		forwardSelect
	].join("\n");
};

function execMotion(
	selectedMotion,
	initVariableName,
	motionVariableName,
	backMotionNum,
	forwardMotionNum
){
	switch(selectedMotion){
		case MotionType.back:
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        motionVariableName,
				backMotionNum,
		    );
		    jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        initVariableName,
				"0",
		    );
			jsUrl.loadUrl(
		    	jsUrl.makeJsUrl(FANNEL_SCRIPT_PATH)
		    );
			exitZero();
			break;
		case MotionType.repeat:
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        initVariableName,
				"0",
		    );
			jsUrl.loadUrl(
		    	jsUrl.makeJsUrl(FANNEL_SCRIPT_PATH)
		    );
			exitZero();
			break;
		case MotionType.forward:
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        motionVariableName,
				forwardMotionNum,
		    );
		    jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        initVariableName,
				"0",
		    );
			jsUrl.loadUrl(
		    	jsUrl.makeJsUrl(FANNEL_SCRIPT_PATH)
		    );
			exitZero();
			break;
		case MotionType.ZERO:
			jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        motionVariableName,
				"0",
		    );
		    jsEdit.updateByVariable(
				FANNEL_SCRIPT_PATH,
		        initVariableName,
				"0",
		    );
		    jsUrl.loadUrl(
		    	jsUrl.makeJsUrl(FANNEL_SCRIPT_PATH)
		    );
			exitZero();
			break;
	};
};

function csvCheckPathAndRegister(
	inputPath
){
	extendCheckInputPath(
		inputPath
	);
	existCheckInputPath(
		inputPath
	);
	jsListSelect.updateListFileCon(
		"${CURRENT_INUPT_CSV_LIST_FILE_PATH}",
		`${inputPath}`
	);
};

function extendCheckInputPath(
	inputPath
){
	let permittionExtends = ["csv", "tsv"];
	const checkOk = jsPath.checkExtend(
		inputPath,
		permittionExtends.join("&")
	);
	if(checkOk) return;
	alert(
		`Extend must be ${permittionExtends.join(", ")}\n\n ${inputPath}`
	);
	exitZero();
};

function existCheckInputPath(
	inputPath
){
	const existFile = jsFileSystem.isFile(
		inputPath
	);

	if(existFile) return;
	alert(
		`No exist \n\n ${inputPath}`
	);
	exitZero();
};
