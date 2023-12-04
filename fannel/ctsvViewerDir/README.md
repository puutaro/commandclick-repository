
<div><img src="https://github.com/puutaro/ctsvViewer/assets/55217593/23cfa534-4d58-46d8-b3fd-70aad9320702" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# ctsvViewer.js
----------------

Advanced csv & tsv viewer @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
* [Cmd Variables](#cmd-variables)
	* [inputCTsvPath](#inputctsvpath)
	* [scrollBoost](#scrollboost)
	* [colRange](#colrange)
	* [rowRange](#rowrange)
	* [startColNum](#startcolnum)
	* [startRowNum](#startrownum)
	* [autoScrollType](#autoscrolltype)
	* [viewType](#viewtype)
	* [rowLimit](#rowlimit)
	* [filters](#filters)
	* [Table static word](#table-static-word)
* [Acknowledge](#acknowledge)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#playmode)

## Toolbar buttons

### Play Button

View csv by cmd variables setting

## Cmd Variables
--------

### inputCTsvPath 
set csv or tsv path
### scrollBoost 
Auto scroll boost rate

| scroll gain | description |
| ------ | ------ |
| 0 | one step |
| 1 | spedify direction range step |
| other | specifyDirectStartNum + 1 + specifyDirectRange * scrollBoost |

### colRange 
view column range num

### rowRange
view row range num

### startColNum 
start column index

### startRowNum 
start row index

### autoScrollType
Auto scroll direction

| scroll type | direction |
| ------ | ------ |
| horizon | left to right |
| rHorizon | right to left |
| vartical | top to bottom |
| rVartical | bottom to top |

### viewType 

| view type | description |
| ------ | ------ |
| `SRC` | src csv or tsv |
| `AGGRE` | aggregated table |
| `CHART` | aggregated chart |

### rowLimit 

Row limit about view 
(more smaller this value, more shoter reading speed up)

### filters
filter query

| query | description |
| ------ | ------ |
| `in` | by included word |
| `>=` | by equal larger |
| `>` | by larger |
| `<=` | by equal smaller |
| `>` | by smaller |
| `=` | by equal |

### Table static word

| word | description |
| ------ | ------ |
| `maxW` | maximum frequent word
| `sumMaxW` | count maximum frequent word
| `minW` | minimum frequent word
| `sumMinW` | count minimum frequent word
| `avrW` | middle frequent word
| `sumAvrW` | count middle frequent word


## Acknowledge
----------

This Fannel is used to bellow repo.

[Chart.js](https://github.com/chartjs/Chart.js)

## Setting variables
---------

### terminalFontZoom
Adjust terminal font size (percentage)

### terminalFontColor
Adjust terminal font color

### terminalColor
Adjust terminal background color
