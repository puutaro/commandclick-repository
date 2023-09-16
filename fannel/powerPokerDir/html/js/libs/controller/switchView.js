

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
	updateDisplayCardPartByTmpMap(
    	powerPoker,
    	cardsDataMapOrderKey.playerDust
    )
    updateDisplayCardPartByTmpMap(
    	powerPoker,
    	cardsDataMapOrderKey.enemyDust
    )
	closeSwitchBar();
}

function execDiplayShrine(
	powerPoker
){
	powerPoker.currentFaze = currentFazeType.shrine
	updateDisplayCardPartByTmpMap(
    	powerPoker,
    	cardsDataMapOrderKey.playerShrine
    )
    updateDisplayCardPartByTmpMap(
    	powerPoker,
    	cardsDataMapOrderKey.enemyShrine
    )
    closeSwitchBar();
}

function execDisplayBack(
	powerPoker
){	
	powerPoker.currentFaze = currentFazeType.hand
	updateDisplayCardsByTmpMap(
		powerPoker
	)
    closeSwitchBar();
}
