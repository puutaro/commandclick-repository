
disable=ON,

color=gray,

icon=setting,

click=
    func=D_MENU
        ?args=
            menuPath=
                `${cmdYoutuberSettingMenuConfigPath}`
                &title="Setting menu",

longClick=
    func=D_MENU
        ?args=
            menuPath=
                `${cmdYoutuberSettingLongClickMenuConfigPath}`
            &title="Emergency menu",

