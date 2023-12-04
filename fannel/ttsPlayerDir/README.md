
<div><img src="https://github.com/puutaro/ttsPlayer/assets/55217593/e53022d1-2a6e-4d2f-9ef2-a319b9359470" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# ttsPlayer.js
----------------

TextToSpeech player @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Toolbar buttons](#toolbar-buttons)
	* [Play button](#play-button)
* [Cmd Variables](#cmd-variables)
	* [playListName](#playlistname)
	* [ttsPlay](#ttsplay)
	* [numberPlay](#numberplay)
	* [gmailToFile](#gmailtofile)
	* [toLang](#tolang)
	* [manageText](#managetext)
	* [onTrack](#ontrack)
	* [About Volume control](#about-volume-control)
* [Setting variables](#setting-variables)
	* [execPlayBtnLongPress](#execplaybtnlongpress)
	* [execEditBtnLongPress](#execeditbtnlongpress)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#terminalcolor)

## Toolbar buttons
--------

### Play Button

Launch tts play list site

## Cmd Variables
--------

### playListName 

1. Input or select play list file name

- Prefix must be "music" 
	ex) "ttsPlayList"

### ttsPlay 

1. Select shuffle or ordinaly and press
2. Press "Exec" 
3. (Execute play list)

### numberPlay 

1. Input or inc/dec number
2. Press "Exec"
3. (play number)

### gmailToFile 
Launch gmail or write gmail contetns to file by state

| State | Execute contents |
| ------- | ------- |
| No gmail launch | Gmail launch |
| Look gmail body | Write this contents to file |

### toLang
Text to speech language

| code | lang |
| ------ | ------ |
| - | default language |
| `en` | english |
| `zh` | chinese |
| `es` | spanish |
| `ko` | korean |
| `ja` | japanese |

### manageText 
Remove text file or add one to editHtmlSite

1. Select text file
2. Click "MNG" button

### onTrack

| switch | description |
| ------ | --------- |
| `ON` | memory past number and step |
| `OFF` | no memory past number and step |

### About Volume control
Enable when CommandClick hide


## Setting variables
---------

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

### terminalFontZoom 
Adjust terminal font size (percentage)

### terminalFontColor 
Adjust terminal font color

### terminalColor 
Adjust terminal background color
