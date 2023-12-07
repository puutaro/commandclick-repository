
<div><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/f6680922-7c89-48ed-9642-290cf42bc761" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# japanRouteSearcher.js
----------------

Japan train roote searcher by [CommandClick](https://github.com/puutaro/CommandClick) @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Screenshots](#screenshots)
* [Installation](#installation)
* [Usage](#usage)
  * [Web search](#web-search)
  * [Link long press search](#link-long-press-search)
  * [Bookmark](#bookmark)
* [Toolbar buttons](#toolbar-buttons)
  * [Play Button](#play-button)
  * [Edit Button](#edit-button)
* [Cmd Variables](#cmd-variables)
	* [SETTING](#setting)
	* [Bookmark name](#cmdinput)
	* [BOOKMARK MANAGER](#bookmark-manager)
* [Setting variables](#setting-variables)
	* [scriptFileName](#scriptfilename)

## Installation
--------------

1. Install [ComamndClick](https://github.com/puutaro/CommandClick#app-installation) to your android
2. Install this fannel by [install repo](https://github.com/puutaro/CommandClick/blob/master/USAGE.md#install-fannel) or QR code

## Screenshots
--------
<a href="https://github.com/puutaro/CommandClick/assets/55217593/b8ff6c1f-6a3f-48e2-bb57-9e8111e53407"><img src="https://github.com/puutaro/CommandClick/assets/55217593/b8ff6c1f-6a3f-48e2-bb57-9e8111e53407" width="30%" /></a>
<a href="https://github.com/puutaro/fannelStore/assets/55217593/20ddac0e-46fd-4381-8426-5cc472ad9d8b"><img src="https://github.com/puutaro/fannelStore/assets/55217593/20ddac0e-46fd-4381-8426-5cc472ad9d8b" width="30%" /></a>
<a href="https://github.com/puutaro/fannelStore/assets/55217593/54d406b1-3860-447b-a6ce-1a27886d17f5"><img src="https://github.com/puutaro/fannelStore/assets/55217593/54d406b1-3860-447b-a6ce-1a27886d17f5" width="30%" /></a>
<a href="https://github.com/puutaro/fannelStore/assets/55217593/b26c9d48-df69-4c07-932c-8f11904c654f"><img src="https://github.com/puutaro/fannelStore/assets/55217593/b26c9d48-df69-4c07-932c-8f11904c654f" width="30%" />
<a href="https://github.com/puutaro/fannelStore/assets/55217593/c5a8fb2c-8a55-4e23-ace4-f3da824daf1f"><img src="https://github.com/puutaro/fannelStore/assets/55217593/c5a8fb2c-8a55-4e23-ace4-f3da824daf1f" width="30%" /></a>
<a href="https://github.com/puutaro/fannelStore/assets/55217593/1c7fbba6-aea7-4096-a963-0f846def4e51"><img src="https://github.com/puutaro/fannelStore/assets/55217593/1c7fbba6-aea7-4096-a963-0f846def4e51" width="30%" /></a>

## Usage
--------

Mostly, trigger each feature by **Long press**

### Web search

Long press Play button

| phase          | description               |
|----------------|-----------------------|
| Highlight text | Search highlight text |
| None           | Google search page    |

### Link long press search

Link url search by Long press bellow link

- src anchor link
- src ancher link


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

Launch japan route search site
- Long press -> web search

### Edit Button

- long press -> page search

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

Edit bookmark list by `renameJapanRouteSearcherBookmarkName`

`renameJapanRouteSearcherBookmarkName`

| value | description                                          |
| ----------- |------------------------------------------------------|
| blank | Delete tube url list name                            |
| other | Rename tube url list name (auto comp prefix `route`) |

## Setting variables
---------

### scriptFileName

Rename script name

