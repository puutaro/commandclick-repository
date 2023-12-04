
<div><img src="https://github.com/puutaro/cmdYoutuberU/assets/55217593/410beeff-7221-456b-aa1e-919daa5f5fdc" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# cmdYoutuberU


Youtube background player (**ubuntu version**) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Support long press menu table](#support-long-press-menu-table)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
		* [Edit Site Usage](#edit-site-usage)
* [Cmd Variables](#cmd-variables)
	* [Install](#install)
	* [searchWord](#searchword)
	* [playMode](#playmode)
	* [PLAY](#play)
	* [tubePlayListName](#tubeplaylistname)
	* [STOP](#stop)
	* [numberPlay](#numberplay)
	* [EDIT_TUBE_PLAY_LIST](#edit_tube_play_list)
* [Execute target on click in url history](#execute-target-on-click-in-url-history)
* [Acknowledge](#acknowledge)
* [Setting variables](#setting-variables)
	* [onUrlHistoryRegister](#onurlhistoryregister)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#terminalcolor)


## Support long press menu table
-------

| type | enable |
| ----- | ----- |
| src anchor | o |
| src image anchor | o |
| image | x |

## Toolbar buttons

### Play Button

Launch youtube play list edit site

- long press -> web search

#### Edit Site Usage
- Recent visit youtube url show in "Save title"
- Change item  order by drag and drop 
- Delete item  by dragging to another area(no item area).

## Cmd Variables
--------
### Install
Install & upgrade require package

### searchWord
Web Youtube Search Word

### playMode
Select shuffle or ordinaly and press

1. Press "Exec"
2. (Execute play list)

## PLAY

Play youtube music

### tubePlayListName
Input or select play list file name
- Prefix must be "tube" 
	ex) "tubePlayList"

### STOP
Play stop

### numberPlay
Input or inc/dec number
- Press "Exec" and play number

### onSearchMode
Web search switch

| switch | description |
| ----------- | ----------- |
| `OFF` | off |
| `ON` | on |

### EDIT_TUBE_PLAY_LIST

Edit tube play list name by `renameTubePlayListName`


`renameTubePlayListName` 

| value | description |
| ----------- | ----------- |
| blank | Delete tube url list name |
| other | Rename tube url list name (auto comp prefix `tube`) |


## Execute target on click in url history

[PLAY](#play)

## Acknowledge
----------
This Fannel is used to bellow repo as core library.
[ytfzf](https://github.com/pystardust/ytfzf)


## Setting variables
---------
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
