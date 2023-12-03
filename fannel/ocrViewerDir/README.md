# ocrViewer.js
----------------

OCR Viewer with tts (###termux) @puutaro


Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
* [Cmd Variables](#cmd-variables)
	* [ocrTargetPath](#ocrtargetpath)
	* [EXEC_EXTRACT](#exec_extract)
	* [TTS_PLAY](#tts_play)
	* [ocrLang](#ocrlang)
	* [onEnglish](#onenglish)
	* [Pitch](#pitch)
	* [Speed](#speed)
	* [onTrack](#ontrack)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [execPlayBtnLongPress](#execplaybtnlongpress)
	* [homeFannelsPath](#homefannelspath)

## Toolbar buttons

### Play Button

1. Set `ocrTargetPath`
2. Click

- long press -> web search

## Cmd Variables
--------

### ocrTargetPath 
target image and pdf file path

### EXEC_EXTRACT 
extract from image or pdf

### TTS_PLAY 
text to speech play

### ocrLang
ocr support lang

| code | lang |
| -------- | -------- |
| `en` | english |
| `ja` | japanese |

### onEnglish

| switch | description |
| ------ | --------- |
| `ON` | speech by English |
| `OFF` | speech by local lang |

### Pitch
text to speech pitch

| pitch | description |
| ------ | --------- |
| 50 | normal |
| 50 Up | pitch up |
| 50 down | pitch down |

### Speed
text to speech speed

| speed | description |
| ------ | --------- |
| 50 | normal |
| 50 Up | speed up |
| 50 down | speed down |

### onTrack

| switch | description |
| ------ | --------- |
| `ON` | memory past number and step |
| `OFF` | no memory past number and step |


## Setting variables
---------

### terminalFontZoom 
Adjust terminal font size (percentage)

### terminalFontColor
Adjust terminal font color

### execPlayBtnLongPress
Execute when play button long press

| type or name | description |
| ------- | ------- |
| `WEB_SEARCH` | apear web search bar |
| `PAGE_SEARCH` | apear page search bar |
| js file path | execute js file |


### execEditBtnLongPress
Execute when edit button long press

| type or name | description |
| ------- | ------- |
| `WEB_SEARCH` | apear web search bar |
| `PAGE_SEARCH` | apear page search bar |
| js file path | execute js file |

### homeFannelsPath
Specified fannel put always bottom in app history 

| Button type | usage | 
| --------- | --------- |
| DSL button | Drag and sort home fannels List |
| ADD button | Add fannel to home fannels list |
