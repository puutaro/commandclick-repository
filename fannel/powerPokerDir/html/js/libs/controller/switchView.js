

function execSwitchButtonEvent(event){
	openSwitchBar();
}

function openSwitchBar(){
	addClass(
        SWITCH_PARTS_ID.switchViewNav,
        CLASS_FOR_SWITCH.open
    );
	addClass(
		SWITCH_PARTS_ID.overlay,
		CLASS_FOR_SWITCH.open
	);
	addClass(
		SWITCH_PARTS_ID.settingButton,
		CLASS_FOR_SWITCH.disabled
	);
}

function closeSwitchBar(){
	removeClass(
		SWITCH_PARTS_ID.switchViewNav,
		CLASS_FOR_SWITCH.open
	);
	removeClass(
		SWITCH_PARTS_ID.overlay,
		CLASS_FOR_SWITCH.open
	);
	removeClass(
		SWITCH_PARTS_ID.settingButton,
		CLASS_FOR_SWITCH.disabled
	);
}

function execSwitchView(
	powerPoker,
	event
){
	const switchViewText = 
		event.target.textContent
			.replaceAll("\n", "")
			.replaceAll("\t", "")
			.replaceAll(" ", "")
	switch(switchViewText){
		case switchViewChangeType.hand:
			execDisplayBack(
				powerPoker
			);
			break; 
        case switchViewChangeType.dust:
        	execDustDiplay(
        		powerPoker
        	);
        	break;
        case switchViewChangeType.shrine:
        	execDiplayShrine(
				powerPoker
			);
        	break;
	}
};


function execDustDiplay(
	powerPoker
){
	powerPoker.currentFaze = currentFazeType.dust
	powerPoker.enemyDisplayField = cardSort(
		powerPoker.enemyDust
    );
    powerPoker.playerDisplayField = cardSort(
		powerPoker.playerDust
    );
    closeSwitchBar();
	powerPoker.enablePut = false
}

function execDiplayShrine(
	powerPoker
){
	powerPoker.currentFaze = currentFazeType.shrine
	powerPoker.enemyDisplayField = cardSort(
		powerPoker.enemyShrine
    );
    powerPoker.playerDisplayField = cardSort(
		powerPoker.playerShrine
    );
    closeSwitchBar();
	powerPoker.enablePut = false
}

function execDisplayBack(
	powerPoker
){	
	powerPoker.currentFaze = currentFazeType.hand
	updateCardBackupDataByMap(
    	powerPoker
    )
    closeSwitchBar();
	powerPoker.enablePut = true
}
