

<div><img src="https://github.com/puutaro/sendClipToGmail/assets/55217593/085e2777-f9d0-4f73-80f5-373bef7f6ff1" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# saveToGmail
---------------------

Save site contents to Gmail draft @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Installation](#installation)
* [Cmd Variables](#cmd-variables)
	* [gmailDraftUrl](#gmaildrafturl)
	* [gmailDraftListURL](#gmaildraftlisturl)
	* [play](#play)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [terminalColor](#terminalColor)

## Installation
--------------

1. Install [ComamndClick](https://github.com/puutaro/CommandClick#app-installation) to your android
2. Install this fannel by [install repo](https://github.com/puutaro/CommandClick/blob/master/USAGE.md#install-fannel) or QR code


## Cmd Variables
--------
### gmailDraftUrl 
Paste gmail draft url
### gmailDraftListURL 
Paste gmail draft list url
### play 
Depend on state, change execute like bellow table.

| state | execute content | 
| --------- | --------- |
| `gmailDraftUrl` doesn't launch | Launch `gmailDraftUrl` |
| `gmailDraftUrl` launch and gmail bocy blank | Paste clipboard |
| `gmailDraftUrl` launch and gmail body has been written | Save draft gmail |


## Setting variables
---------
### terminalFontZoom
Adjust terminal font size (percentage)
### terminalFontColor
Adjust terminal font color
### terminalColor
Adjust terminal background color
