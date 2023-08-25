Youtube background play fannel (**termux**) @puutaro

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
	* [playLogName](#playlogname)
	* [STOP](#stop)
	* [numberPlay](#numberplay)
	* [minMinutes](#minminutes)
	* [maxMinutes](#maxminutes)
	* [playLogOut](#playlogout)
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
- Press "Exec" and execute play list

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
- `OFF` -> no web search
- `SHORT` -> sort by shortest
- `RECENT` -> sort by latest

### minMinutes
Filter movie by minimum play minutes

### maxMinutes
Filter movie  by maximum play minutes

### playLogOut
Output play log


## Acknowledge
----------
This Fannel is used to bellow repo as core library.
[ytfzf](https://github.com/pystardust/ytfzf)


## Setting variables
---------
### onUrlHistoryRegister
Url history update signal
- `ON`: update
- `OFF`: no update

### terminalFontZoom
Adjust terminal font size (percentage)

### terminalFontColor
Adjust terminal font color

### terminalColor
Adjust terminal background color
