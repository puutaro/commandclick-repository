Image to ascii art by web image long press  @puutaro

Table of Contents
-------
<!-- vim-markdown-toc GFM --> 
* [Support long press menu table](#support-long-press-menu-table)
* [Cmd Variables](#cmd-variables)
	* [PLAY_QUIZ](#play_quiz)
	* [DISPLAY_GALLERY](#display_gallery)
	* [convertImageFile2Ascii](#convertimagefile2ascii)
	* [TARGET_DIR](#target_dir)
	* [MOVE_OR_DELETE_IMAGE](#move_or_delete_image)
	* [EDIT_TARGET_DIR_NAME](#edit_target_dir_name)
* [Setting variables](#setting-variables)
	* [terminalFontZoom](#terminalfontzoom)
	* [terminalFontColor](#terminalfontcolor)
	* [execPlayBtnLongPress](#execplaybtnlongpress)
	* [execEditBtnLongPress](#execeditbtnlongpress)


## Support long press menu table
-------

| type | enable |
| ----- | ----- |
| src anchor | x |
| src image anchor | o |
| image | o |


## Cmd Variables
--------

### PLAY_QUIZ
A quiz to guess what kind of image ascii art is

### DISPLAY_GALLERY
Display gallery

### convertImageFile2Ascii
Convert image file to ascii art

| button name | description |
| ------- | ------- |
| `file` | select image file |
| `To` | convert |

### TARGET_DIR
Src image file included dir

### MOVE_OR_DELETE_IMAGE
Move or delete image file 

### EDIT_TARGET_DIR_NAME
Rename or delete TARGET_DIR


## Setting variables
---------

### terminalFontZoom 
Adjust terminal font size (percentage)

### terminalFontColor
Adjust terminal font color

### execPlayBtnLongPress
Execute when play button long press

| type or name | description |
| ------- | ------- |
| `WEB_SEARCH` | apear web search bar |
| `PAGE_SEARCH` | apear page search bar |
| js file path | execute js file |

### execEditBtnLongPress
Execute when edit button long press

| type or name | description |
| ------- | ------- |
| `WEB_SEARCH` | apear web search bar |
| `PAGE_SEARCH` | apear page search bar |
| js file path | execute js file |
