

function execPullByPlayer(
	powerPoker
){
	let playerTmpHand = cardsTmpDataMap.get(
    	cardsDataMapOrderKey.playerHand
    );
	const pullLength = sizeSeries.handSize - playerTmpHand.length;
	let dekiMountain = cardsTmpDataMap.get(
    	cardsDataMapOrderKey.dekiMountain
    );
	const pullList = dekiMountain.slice(0, pullLength);
	cardsTmpDataMap.set(
		cardsDataMapOrderKey.playerHand,
		cardSort(
			playerTmpHand.concat(
				pullList
			)
    	)
    )
	updateMountainAndCardData(
		powerPoker,
		pullLength,
		dekiMountain
	)
}

function execPullByEnemy(
	powerPoker
){
	let enemyTmpHand = cardsTmpDataMap.get(
    	cardsDataMapOrderKey.enemyHand
    );
	const pullLength = sizeSeries.handSize - enemyTmpHand.length;
	let dekiMountain = cardsTmpDataMap.get(
    	cardsDataMapOrderKey.dekiMountain
    );
	const pullList = dekiMountain.slice(0, pullLength);
	cardsTmpDataMap.set(
		cardsDataMapOrderKey.enemyHand,
		cardSort(
			enemyTmpHand.concat(
				pullList
			)
    	)
    )
	updateMountainAndCardData(
		powerPoker,
		pullLength,
		dekiMountain
	)
}

function updateMountainAndCardData(
	powerPoker,
	pullLength,
	dekiMountain
){
	cardsTmpDataMap.set(
		cardsDataMapOrderKey.dekiMountain,
		cardSort(
			dekiMountain.slice(pullLength)
    	)
    )
    updateCardsBackupDataMapByTmpMap()
    updateDisplayCardsByTmpMap(powerPoker)
}
