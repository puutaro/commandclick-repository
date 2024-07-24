// js/action/setting

icon=cancel,
click=
	|var=runKillCmd
		?func=jsUbuntu.killBackground
		?args=
			killCmdName=`${quickStartShellExecuteShellPath}`,
