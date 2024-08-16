
disable=ON,

color=gray,

icon=setting,

click=
    func=D_MENU
        ?args=
            menuPath=
                `${cmdMusicPlayerSettingMenuConfigPath}`
                &title="Setting",

longClick=
    func=D_MENU
        ?args=
            menuPath=
                `${cmdMusicPlayerSettingLongClickMenuConfigPath}`
            &title="Emergency menu",

