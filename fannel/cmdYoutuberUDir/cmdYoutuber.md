Youtube background play fannel (**ubuntu version**) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Support long press menu table](#support-long-press-menu-table)
* [Buttons](#buttons)
	* [Play Button](#play-button)
		* [Edit Site Usage](#edit-site-usage)
* [Cmd Variables](#cmd-variables)
	* [Install](#install)
	* [searchWord](#searchword)
	* [playMode](#playmode)
	* [tubePlayListName](#tubeplaylistname)
	* [STOP](#stop)
	* [numberPlay](#numberplay)
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

## Buttons

### Play Button

Launch youtube play list edit site

- long press -> web search

#### Edit Site Usage
- Recent visit youtube url show in "Save title"
- Change item  order by drag and drop 
- Delete item  by doragging to another area(no item area).

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
