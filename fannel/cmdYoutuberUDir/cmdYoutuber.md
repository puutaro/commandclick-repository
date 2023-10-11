Youtube background play fannel (**ubuntu version**) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Support long press menu table](#support-long-press-menu-table)
* [Cmd Variables](#cmd-variables)
	* [Install](#install)
	* [Play](#play)
		* [Edit Site Usage](#edit-site-usage)
	* [searchWord](#searchword)
	* [playMode](#playmode)
	* [tubePlayListName](#tubeplaylistname)
	* [STOP](#stop)
	* [numberPlay](#numberplay)
* [Acknowledge](#acknowledge)
* [Setting variables](#setting-variables)
	* [onUrlHistoryRegister](#onurlhistoryregister)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#playmode)
	* [numberPlay](#terminalcolor)


## Support long press menu table
-------

| type | enable |
| ----- | ----- |
| src anchor | o |
| src image anchor | o |
| image | x |

## Cmd Variables
--------
### Install
Install & upgrade require package

### Play 
Launch youtube play list edit site

#### Edit Site Usage
- Recent visit youtube url show in "Save title"
- Change item  order by drag and drop 
- Delete item  by doragging to another area(no item area).

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
