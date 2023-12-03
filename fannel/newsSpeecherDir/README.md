News speech by scraping (**ubuntu**) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Note](#note)
* [Support long press menu table](#support-long-press-menu-table)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
		* [Edit Site Usage](#edit-site-usage)
		* [Web search additional](#web-search-additional)
	* [Edit Button](#edit-button)
* [Cmd Variables](#cmd-variables)
	* [Install](#install)
	* [SPEECH_MODE](#speech_mode)
	* [EACH_NUM](#each_num)
	* [SUMMARY](#summary)
	* [RE_SUMAMRY](#re_summary)
	* [STOP](#stop)
	* [SETTING](#setting)
	* [newsUrlListName](#newsurllistname)
	* [EDIT_NEWS_URL_LIST_NAME](#edit_news_url_list_name)
* [Execute target on click in url history](#execute-target-on-click-in-url-history)

* [Acknowledge](#acknowledge)
* [Setting variables](#setting-variables)
	* [scriptFileName](#scriptfilename)
	* [onUrlHistoryRegister](#onurlhistoryregister)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#terminalcolor)


## Note

Set text to speech engine to Google in your phone


## Support long press menu table
-------

| type | enable |
| ----- | ----- |
| src anchor | o |
| src image anchor | o |
| image | x |


## Toolbar buttons

### Play Button

Launch new url list edit site

- long press -> web search


#### Edit Site Usage

- Recent visit youtube url show in "Save title"
- Change item  order by drag and drop 
- Delete item  by dragging to another area(no item area).
- Clipboad to history by cliik extra button

#### Web search additional

Longpress link url -> copy

### Edit Button

- long press -> page search

## Cmd Variables
--------
### Install
Install & upgrade require package

### SPEECH_MODE

Select `shuffle`, `ordinaly` or `reverse` and press

1. Press "SUMMARY"
2. (Execute play list)

### EACH_NUM

Extraction num by each news url

### SUMMARY

Collect Summary and speech

### RE_SUMMARY

Re-play Summary

### STOP

Stop  all process

### SETTING

Set extra settings

| switch | value | description |
| ----------- | ----------- | ----------- |
| `TO_LANG` | `-`/en`/`es`/`zg`/`ko`/`ja` | language (`-` is local) |
| `ON_SPEECH` | `ON`/`OFF` | speech switch |
| `On before` | `ON`/`OFF` | switch speech before scraping |
| `Pich` | INT | speech pich |
| `Summary length` | INT | summary string max length |
| `Max concur` | INT | max concurency |

- Lang variation is up to 2

### newsUrlListName

Input or select news list site

- Prefix must be "news" 
	ex) "newsUrlList"


### EDIT_NEWS_URL_LIST_NAME

Edit news url list name by `renameEditNewsUrlListName`


`renameEditNewsUrlListName` 

| value | description |
| ----------- | ----------- |
| blank | Delete news url list name |
| other | Rename news url list name (auto comp prefix `news`) |


## Execute target on click in url history

[SUMMARY](#summary)

## Acknowledge
----------

This Fannel is used to bellow repo as core library.
[newspaper](https://github.com/codelucas/newspaper)


## Setting variables
---------

### scriptFileName

Rename script name

### onUrlHistoryRegister
Url history update signal

| switch | description |
| ----------- | ----------- |
| `ON` | update |
| `OFF` | no update |

### terminalFontZoom
Adjust terminal font size (percentage)

### terminalFontColor
Adjust terminal font color

### terminalColor
Adjust terminal background color
