
<div><img src="https://github.com/puutaro/sshTerminal/assets/55217593/1f97d4b4-aae3-4181-b1e8-674e5d930b97" width="300">  </div>
  
<div><img src="https://github.com/puutaro/selectTyper/assets/55217593/555e8f5f-656a-4faf-bb76-f663c01cfe47" width="300"></div> 


# sshTerminal.js
----------------

SSh access terminal emulator @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Usage](#usage)
  * [`keyPhase` table in dialog](#keyphase-table-in-dialog)
* [Toolbar buttons](#toolbar-buttons)
	* [Play Button](#play-button)
* [Cmd Variables](#cmd-variables)
	* [Keyboard](#keyboard)
	* [cmdInput](#cmdinput)
		* [How to register cmd](#how-to-register-cmd)
		* [How to exec registered cmd](#how-to-exec-registered-cmd)
	* [REGISTER_EXTRA_KEY](#register_extra_key)
		* [Modifier kind table](#modifier-kind-table)
* [Acknowledge](#acknowledge)

## Usage
--------

Enable Ssh access by dialog

- Mainly aim to "touch input"

## `keyPhase` table in dialog <a id="keyphase-table-in-dialog"></a>

| phase    | example               |
|----------|-----------------------|
| `NO`     | no use ssh key        |
| `SET_UP` | set up ssh key        |
| `USE`    | ssh access by ssh key |

## Toolbar buttons

### Play Button

Launch ssh dialog

- `keyPhase` -> [detail](#keyphase-table-in-dialog)

## Cmd Variables
--------

This terminal aim for "key input omission oriented"

### Keyboard

This keyboard squeeze most frequent key.
If, You wont to other key, tap dropdown in three row.

- `Input` -> prompt by suggest

### cmdInput 

Retrieve pre-registerd command.

#### How to register cmd

1. Type one linear command you wont to register.
2. Press "RG" button 

#### How to exec registered cmd

1. Tap dropdown.
2. Select one from command list.

- "-" is escape that you execute command in drop down.
- If you wont to edit keys file, this is bellow.

[cmdTerminalDir](https://github.com/puutaro/CommandClick/blob/master/md/developer/directory_structure.md#fannel_dir)/list/cmdList.txt



### REGISTER_EXTRA_KEY

Register user difinition key.

1. Type string for key.
2. Press "RG_EX_KEY" 

- If you wont to edit keys file, this is bellow.


[cmdTerminalDir](https://github.com/puutaro/CommandClick/blob/master/md/developer/directory_structure.md#fannel_dir)/list/extraKeyList.txt


#### Modifier kind table

| Modifier | example |
| ----------- | ----------- |
| `ctrl+shift+alt` | `ctrl`\+`shift`\+`alt`\+r -> ctrl\_shift\_alt\_\_\_r |
| `ctrl+shift` | `ctrl`\+`shift`\+v -> ctrl\_shift\_\_\_v |
| `ctrl+alt` | `ctrl`\+`alt`\+c -> ctrl\_alt\_\_\_c |
| `ctrl` | `ctrl`\+z -> ctrl\_\_\_z |
| `shift` | `shift`\+a -> shift\_\_\_a |
| `alt` | `alt`\+b -> alt\_\_\_b|

- Modifier key conbination concat by `___`.

## Acknowledge
----------
This Fannel is used to bellow repo as core library.
[webssh](https://github.com/huashengdun/webssh)
