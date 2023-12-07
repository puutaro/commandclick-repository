
<div><img src="https://github.com/puutaro/sshTerminal/assets/55217593/1f97d4b4-aae3-4181-b1e8-674e5d930b97" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# fannelStore.js
----------------

Fanenl Store by [CommandClick](https://github.com/puutaro/CommandClick) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Usage](#usage)
  * [Install fannel](#install-fannel)
  * [Web search](#web-search)
  * [Bookmark](#bookmark)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
* [Cmd Variables](#cmd-variables)
	* [SETTING](#setting)
	* [Bookmark name](#cmdinput)
	* [BOOKMARK MANAGER](#bookmark-manager)
* [Setting variables](#setting-variables)
	* [scriptFileName](#scriptfilename)

## Usage
--------

Mostly, trigger each feature by **Long press**

### Install fannel
Long press QR iamge in order to install [fannel](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel.

### Web-search

Long press Play button 


| phase          | description               |
|----------------|-----------------------|
| Highlight text | Search highlight text |
| None           | Google search page    |

### Bookmark

Long press history menu button in left bottom.

| action                             | description                        |
|------------------------------------|------------------------------------|
| Click `Save` button                | Save latest visit git url          |
| Click `Jump` button                | Jump to latest visit git url       |
| Title drag and drop                | Change item order by drag and drop |
| Title drag and drop to extend area | Remove item                        |

## Toolbar buttons
-----------

### Play Button

Launch `fannel` topic on github

## Cmd Variables
--------

This terminal aim for "key input omission oriented"

### SETTING

Fannel store setting

| Name             | Type            | Description                       |
|----------------------- |-----------------|-----------------------------------|
| `On launch bookmark by dialog` | `ON` / `OFF`    | book mark launch by dialog or not |

### Bookmark name 

Create new bookmark by type new name.

### BOOKMARK MANAGER

Edit bookmark list by `renameFannelStoreBookmarkName`

`renameFannelStoreBookmarkName`

| value | description |
| ----------- | ----------- |
| blank | Delete tube url list name |
| other | Rename tube url list name (auto comp prefix `bookmark`) |

## Setting variables
---------

### scriptFileName

Rename script name
