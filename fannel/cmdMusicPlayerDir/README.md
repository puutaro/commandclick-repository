
<div><img src="https://github.com/puutaro/cmdMusicPlayer/assets/55217593/4f7f7b47-7642-4d84-bdb0-7fa22fe1b5d6" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# cmdMusicPlayer.js
---------------

Music player  (**termux**) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Installation](#installation)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
* [Cmd Variables](#cmd-variables)
	* [Install](#install)
	* [musicDir](#musicdir)
	* [musicPlayListName](#musicplaylistname)
	* [musicPlay](#musicplay)
	* [numberPlay](#numberplay)
	* [About Volume Controll](#about-volume-controll)
	* [STOP](#stop)
	* [startNum](#startnum)
	* [endNum](#endnum)
	* [EDIT_MUSIC_PLAY_LIST](#edit_music_play_list)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#playmode)
	* [numberPlay](#terminalcolor)


## Installation
---------------------

1. Install [ComamndClick](https://github.com/puutaro/CommandClick) to your android by [this link](https://github.com/puutaro/CommandClick#app-installation)
2. Set up termux by [this link](https://github.com/puutaro/CommandClick/blob/master/USAGE.md#termux-setting)
3. Install this fannel by [install repo](https://github.com/puutaro/CommandClick/blob/master/USAGE.md#install-fannel) or QR code
4. Press [Install button](#install)

## Toolbar buttons

### Play Button

Launch music play list site

## Cmd Variables
--------
### Install
Install & upgrade require package

### musicDir 
Target music file saved directory path

### musicPlayListName 
Input or select play list file name
- Prefix must be "music" 
	ex) "musicPlayList"

### musicPlay 
Select shuffle or ordinaly and press
1. Press "PLAY"
2. (Execute play list)

### numberPlay 
Input or inc/dec number

1. Press "PLAY" 
2. (Play number)

### About Volume Controll
- Volume Controll enable when CommandClick hide

### STOP
Play stop

### startNum 
Start number
- 0: firstNumber

### endNum
End number
- 0: lastNumber

### EDIT_MUSIC_PLAY_LIST

Edit music play list name by `renameMusicPlayListName`


`renameMusicPlayListName` 

| value | description |
| ----------- | ----------- |
| blank | Delete music file path list name |
| other | Rename music file path list name (auto comp prefix `music`) |


## Setting variables
---------

### terminalFontZoom
Adjust terminal font size (percentage)

### terminalFontColor
Adjust terminal font color

### terminalColor
Adjust terminal background color
