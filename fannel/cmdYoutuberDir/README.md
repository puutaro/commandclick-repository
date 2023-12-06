
<div><img src="https://github.com/puutaro/cmdYoutuber/assets/55217593/28e4bc72-a6c0-4689-983f-3bc85439e4a4" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# cmdYoutuber.js
----------------

Youtube background player (**termux**) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Support long press menu table](#support-long-press-menu-table)
* [Installation](#installation)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
		* [Edit Site Usage](#edit-site-usage)
* [Cmd Variables](#cmd-variables)
	* [Install](#install)
	* [searchWord](#searchword)
	* [playMode](#playmode)
	* [tubePlayListName](#tubeplaylistname)
	* [playLogName](#playlogname)
	* [STOP](#stop)
	* [numberPlay](#numberplay)
	* [minMinutes](#minminutes)
	* [maxMinutes](#maxminutes)
	* [playLogOut](#playlogout)
	* [EDIT_TUBE_PLAY_LIST](#edit_tube_play_list)
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

## Installation
---------------------

1. Install [ComamndClick](https://github.com/puutaro/CommandClick) to your android by [this link](https://github.com/puutaro/CommandClick#app-installation)
2. Set up termux by [this link](https://github.com/puutaro/CommandClick/blob/master/USAGE.md#termux-setting)
3. Install this fannel by [install repo](https://github.com/puutaro/CommandClick/blob/master/USAGE.md#install-fannel) or QR code
4. Press [Install button](#install)



## Toolbar buttons
---------------------

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

### tubePlayListName
Input or select play list file name
- Prefix must be "tube" 
	ex) "tubePlayList"

### playLogName
Input or select play list file name
- Prefix must be "tube" 
	ex) "tubePlayList"
If volume control enable when CommandClick hide

### STOP
Play stop

### numberPlay
Input or inc/dec number
- Press "Exec" and play number

### onSearchMode
Web search switch

| switch | description |
| ----------- | ----------- |
| `OFF` | no web search |
| `SHORT` | sort by shortest |
| `RECENT` | sort by latest |

### minMinutes
Filter movie by minimum play minutes

### maxMinutes
Filter movie  by maximum play minutes

### playLogOut
Output play log

### EDIT_TUBE_PLAY_LIST

Edit tube play list name by `renameTubePlayListName`


`renameTubePlayListName` 

| value | description |
| ----------- | ----------- |
| blank | Delete tube url list name |
| other | Rename tube url list name (auto comp prefix `tube`) |


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
