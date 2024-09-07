
<div><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/f6680922-7c89-48ed-9642-290cf42bc761" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# japanRouteSearcher.js
----------------

Japan train roote searcher @puutaro

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

<a href="https://github.com/puutaro/japanRouteSearcher/assets/55217593/d2e86a07-ca2f-4c8a-aa80-5826a927dd3d"><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/d2e86a07-ca2f-4c8a-aa80-5826a927dd3d" width="30%" /></a>
<a href="https://github.com/puutaro/japanRouteSearcher/assets/55217593/0d85a0b9-94d9-4d3a-b9c2-a3e3c3c17866"><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/0d85a0b9-94d9-4d3a-b9c2-a3e3c3c17866" width="30%" /></a>
<a href="https://github.com/puutaro/japanRouteSearcher/assets/55217593/8a40e4cd-981b-4c2e-ae3e-93f4493c27c7"><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/8a40e4cd-981b-4c2e-ae3e-93f4493c27c7" width="30%" /></a>
<a href="https://github.com/puutaro/japanRouteSearcher/assets/55217593/7f1cd531-c976-4d6a-b7e7-9fbccffdd69d"><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/7f1cd531-c976-4d6a-b7e7-9fbccffdd69d" width="30%" />
<a href="https://github.com/puutaro/japanRouteSearcher/assets/55217593/4683edd2-1a15-4d5e-8aba-21f7512a8204"><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/4683edd2-1a15-4d5e-8aba-21f7512a8204" width="30%" /></a>
<a href="https://github.com/puutaro/japanRouteSearcher/assets/55217593/06b5ca19-01bc-4cd2-b104-8c48cc13d340"><img src="https://github.com/puutaro/japanRouteSearcher/assets/55217593/06b5ca19-01bc-4cd2-b104-8c48cc13d340" width="30%" /></a>

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

