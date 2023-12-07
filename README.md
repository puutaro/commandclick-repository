![cmdclick_repository_sha_nuki](https://user-images.githubusercontent.com/55217593/226264143-2da03394-0c9d-4d11-966d-09588a2c90d8.png)

# commandclick-repository
`CommandClick`'s [`fannel`](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel) repository

[`Fannel`](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel) is `ComamndClick` using script (javascript, and shellscript)  
For instance, your click script in `CommandClick`.   
One thing I can say that `CommandClick` is developed for the purpose of changing javaxcript and shellscript to gui appication.   
That applies to click script. It's so called Gui application. We can say so. I call the gui application `fannel`.




Table of Contents
-----------------

* [Desire](#desire)
* [Your Fannel Register condition](#your-fannel-register-condition)
  * [Procedure 1](#procedure-1)  
    * [Example](#example)
  * [Procedure 2](#procedure-2)  
    * [Example](#example)
* [Others](#others)
  * [Description](#description)


Desire
-----  

[`Fannel`](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel) is idea application.   
Add idea to your javascript and shellscript skill.　   
That's all there is to great it.    
Therefore commit your idea app to this repository. Don't forget author(`@`yourname).  


Your Fannel Register condition
-------------

### Procedure 1

This is simple, and excelent by scalability, visuality, popularity, becuase of only use github topic.  
Finally, fannle install process integrate this.  


1. Each file is less 5M
2. [`Fannel`](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel) main file is `{fannle name}`.js(sh), main directory  `{fannel name}`Dir like bellow location

```kt.js
.
├── README.md
├── ${fannel name}.js(sh)
└── ${fannel name}Dir
    ├── README.md
    .
    .
    .
```

- Put require file for fannel to above `${fannel name}Dir`

3. Make palin text pr by bellow format

```js.js
onGit:prefix=${your git repo url};name=${fannel name}
```

4. Paste above qr image your README.md and your repo [sorcial preview](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview)
5. Put `fannel` tag  to your fannel repo

### Procedure 2

This is for register this fannel repository.  
This merit is download fast.

1. Each file is less 5M
2. [`Fannel`](https://github.com/puutaro/CommandClick/blob/master/md/developer/glossary.md#fannel) main file is `{fannle name}`.js(sh), main directory  `{fannel name}`Dir like bellow location

```kt.js
.
├── README.md
├── ${fannel name}.js(sh)
└── ${fannel name}Dir
```
- Put require file for fannel to above `${fannel name}Dir`

3. Write your github url to [fannles.txt](https://github.com/puutaro/commandclick-repository/blob/master/manage/fannels/input_txt_list/repo_url_list.txt)
4. Put `fannel` tag  to your fannel repo
5. Please `PR`


#### Example

[cmdYoutube](https://github.com/puutaro/commandclick-repository/blob/master/fannel/cmdYoutuberDir/README.md)  

Main file: `cmdYoutube.js`   
Main Dir: `cmdYoutubeDir`  

- `cmdYoutubeDir` incliude some files. [detail](https://github.com/puutaro/commandclick-repository/tree/master/fannel)

Others
-------------

### Description

By `setting` -> `install_fannel`, Script's `CommandClick description` 50 char in first line is displayed.    
 - install [detail](https://github.com/puutaro/CommandClick/blob/master/README.md#install-fannel)  
 - description [detail](https://github.com/puutaro/CommandClick#description)  


<img src="https://github.com/puutaro/commandclick-repository/assets/55217593/6f62911e-772c-4c04-8375-0998d1353612" width="600">  


