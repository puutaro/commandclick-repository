

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
        // playerField: cardSort(
        //   cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.playerField
        //   )
        // ),
        // enemyField: ["♥\n3", "♥\n7","♥\n8","♥\n9","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10","♥\n10"],
        // cardSort(
        //   cardsDataBackupMap.get(
        //       cardsDataMapOrderKey.enemyField
        //     ).split("\t")
        // ),
        // playerHand: cardSort(
        //   cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.playerHand
        //   )
        // ),
        // enemyHand: cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.enemyHand
        // ).split("\t"),
        // playerDust: cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.playerDust
        // ).split("\t"),
        // enemyDust: cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.enemyDust
        // ).split("\t"),
        // playerShrine: cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.playerShrine
        // ).split("\t"),
        // enemyShrine: ["♥\nA", "♥\n3", "♥\n3", "♥\n7","♥\n8", "♥\nQ"],
        // cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.enemyShrine
        // ).split("\t"),
        // dekiMountain: cardsDataBackupMap.get(
        //     cardsDataMapOrderKey.dekiMountain
        // ).split("\t"),
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
        enablePut: true,
        spotCardNum: "",
        enableUserPlay: true,
	}
}
