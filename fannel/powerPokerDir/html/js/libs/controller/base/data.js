

function makeData() {
    return {
        enemyDisplayField: cardSort(
          cardsTmpDataMap.get(
            cardsDataMapOrderKey.enemyField
          )
        ),
        playerDisplayField: cardSort(
          cardsTmpDataMap.get(
            cardsDataMapOrderKey.playerField
          )
        ),
        playerDisplayHand: cardSort(
          cardsTmpDataMap.get(
            cardsDataMapOrderKey.playerHand
          )
        ),
        enemyDisplayShrine: [],
        enemyDisplayDust: [],
        playerDisplayDust: [],
        enemyDisplayShrine: [],
        playerDisplayShrine: [],
        switchViews: [
            switchViewChangeType.dust, 
            switchViewChangeType.shrine,
            switchViewChangeType.hand,
        ],
        currentFaze: currentFazeType.hand,
        aceTimes: 0,
        currentAceTimes: 0,
        enemyShineTotal: 0,
        playerShineTotal: 0,
        enemyScore: 0,
        playerScore: 0,
        bothTotal: 0,
        enemyTotal: 0,
        playerTotal: 0,
        turn: 1,
        enemyEfect: "",
        playerEfect: "",
        efect: "",
        displayHandMode: displayHandModeType.normal,
        onPutConfirmDialog: confirmDialogType.menu,
        enableUserPlay: true,
	}
}
