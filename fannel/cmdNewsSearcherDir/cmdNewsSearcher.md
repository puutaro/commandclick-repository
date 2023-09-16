News site searcher @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Cmd Variables](#cmd-variables)
	* [WEB_SEARCH_PREFIX](#web_search_prefix)
	* [REMOVE_WEB_SEARCH_PREFIX](#remove_web_search_prefix)
	* [REMOVE_SEARCH_TEXT](#remove_search_text)
	* [Long press play button](#long-press-play-button)
	* [Long press edit button](#long-press-edit-button)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [historySwitch](#historyswitch)
	* [homeScriptUrlsPath](#homescripturlspath)
	* [homeScriptUrlsPath usage](#homescripturlspath-usage)
	* [homeFannelsPath](#homefannelspath)
	* [homeFannelsPath usage](#homefannelspath-usage)

## Cmd Variables
--------

### WEB_SEARCH_PREFIX 
Search target site url
ex) `https://www.google.com/search?q=`

### REMOVE_WEB_SEARCH_PREFIX
Remove web search prefix from list

### REMOVE_SEARCH_TEXT
Remove search text from list

### Long press play button
Apear page search bar

### Long press edit button
Apear web search bar


## Setting variables
---------

### terminalFontZoom 
Adjust terminal font size (percentage)

### historySwitch
Switch app history with url history

| switch type | description |
| --------- | --------- |
| `ON` | switch |
| `OFF` | no switch |
| `INHERIT` | inherit config setting (default) |

### onAdBlock
Adblock switch

| switch type | description |
| --------- | --------- |
| `INHERIT` | inherit config setting |
| `ON` | on |
| `OFF` | off |

### homeScriptUrlsPath
specified script, url and html put always bottom in url history

#### homeScriptUrlsPath usage

ex) homeScriptUrlsPath=${file_path}

| Button type | usage | 
| --------- | --------- |
| DSL button | Drag and sort home url script List |
| ADD button | Add fannel to home url script list |

### homeFannelsPath
Specified fannel put always bottom in app history 

#### homeFannelsPath usage

ex) homeFannelsPath=${file_path}

| Button type | usage | 
| --------- | --------- |
| DSL button | Drag and sort home fannels list |
| ADD button | Add fannel to home fannel list |

