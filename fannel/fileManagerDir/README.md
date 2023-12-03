# fileManager.js
----------------

File manager by puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Usage](#usage)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
	* [Edit Button](#edit-button)
* [Cmd Variables](#cmd-variables)
	* [Dir path list](#dir-path-list)
	* [STOP](#stop)
	* [SETTING](#setting)
	* [INSTALL](#install)
* [Long press link](#long-press-link)
* [Setting variables](#setting-variables)
	* [homeScriptUrlsPath](#homescripturlspath)
	* [scriptFileName](#scriptfilename)
* [Acknowledge](#acknowledge)

## Usage
--------

Follow Bellow usecase 

- Find ubuntu & android files
- Find via pc browser (fannel create etc..)  
- Watch file contents, image, text file, pdf etc.

## Toolbar buttons
--------

### Play Button

Launch file manager

- long press -> select dir path

### Edit Button

- long press -> copy url

## Cmd Variables
--------

### Dir path list

Select & register dir path

| Scene | Description |
| --------- | --------- |
| Select dir path | Load dir path |
| In select `DELETE` | Delete dir path |
| Input path, press `RG` button | Register input path |
| In blank, press `RG` button | Register clipboard path |

### STOP

Stop file managing

### SETTING

Detail setting

| Name | Description |
| --------- | --------- |
| `Root dir path` | Decide root dir path |
| `Base url` | Base url -> {ipv4 Address}:{port num(4 digits or more)} |
| `Is launch on click url history` | Decide root dir path |


- `Root dir path` is used in secure env 
- `Base url` is used in connecting to other phone or pc

### INSTALL

Install requirement package


## Long press link
---------

| Link type | Action | 
| -------------- | -------------- |
| src anckor | Copy link |
| src image anchor | Copy link |
| image anchor | x |


## Setting variables
---------

### homeScriptUrlsPath

Specified script, url and html put always bottom in url history

| Button type | usage | 
| -------------- | -------------- |
| DSL button | Drag and sort home url script List |
| ADD button | Add fannel to home url script list |

### scriptFileName 

Rename script name

## Acknowledge
----------
This [Fannel](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel) is used to bellow repo as core library.

- [filebrowser](https://github.com/filebrowser/filebrowser)
