
<div><img src="https://github.com/puutaro/txtPdfViewer/assets/55217593/7aa8a7cd-28e0-4353-afce-5538e08a0dd2" width="300"></div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# txtPdfViewer.js
----------------

Text pdf viewer with tts @puutaro


Table of Contents
-------

<!-- vim-markdown-toc GFM --> 
* [Support long press menu table](#support-long-press-menu-table)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
	* [Edit Button](#edit-button)
* [Cmd Variables](#cmd-variables)
	* [txtPdfPath](#txtpdfpath)
	* [TTS_PLAY](#tts_play)
	* [toLang](#tolang)
	* [Pitch](#pitch)
	* [Speed](#speed)
	* [onTrack](#ontrack)
	* [menuTtsSwitch](#menuttsswitch)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [execPlayBtnLongPress](#execplaybtnlongpress)
	* [execEditBtnLongPress](#execeditbtnlongpress)
	* [homeFannelsPath](#homefannelspath)


## Support long press menu
---------

| type | enable |
| ----- | ----- |
| src anchor | o |
| src image anchor | o |
| image | x |


## Toolbar buttons

### Play Button

1. Set `txtPdfPath`
2. Click

- long press -> page search

### Edit Button

- long press -> web search

## Cmd Variables
--------

### txtPdfPath 
Pdf file path

### TTS_PLAY 
text to speech play

### toLang
Text to speech lang

| code | lang |
| ------ | ------ |
| - | default language |
| `en` | english |
| `zh` | chinese |
| `es` | spanish |
| `ko` | korean |
| `ja` | japanese |

### Pitch
Text to speech pitch

| pitch | description |
| ------ | --------- |
| 50 | normal |
| 50 Up | pitch up |
| 50 down | pitch down |

### Speed
Text to speech speed

| speed | description |
| ------ | --------- |
| 50 | normal |
| 50 Up | speed up |
| 50 down | speed down |

### onTrack

| switch | description |
| ------ | --------- |
| `ON` | Memory past number and step |
| `OFF` | No memory past number and step |

### menuTtsSwitch

| switch | description |
| ------- | ------- |
| `ON` | Play text to speech in long press menu |
| `OFF` | Text or pdf viewer in long press menu |


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
| `WEB_SEARCH` | Apear web search bar |
| `PAGE_SEARCH` | Apear page search bar |
| js file path | Execute js file |

### execEditBtnLongPress
Execute when edit button long press

| type or name | description |
| ------- | ------- |
| `WEB_SEARCH` | Apear web search bar |
| `PAGE_SEARCH` | Apear page search bar |
| js file path | Execute js file |

### homeFannelsPath
Specified fannel put always bottom in app history 

| Button type | usage | 
| --------- | --------- |
| DSL button | Drag and sort home fannels List |
| ADD button | Add fannel to home fannels list |
