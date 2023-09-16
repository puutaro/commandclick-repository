

function putByEnemy(
	powerPoker
){
	updateCardsTmpDataMapByBuckupDataMap()
	const pullLength = 1;
	let enemyDisplayField = cardsTmpDataMap.get(
		cardsDataMapOrderKey.enemyField,
	)
	let enemyHand = cardsTmpDataMap.get(
		cardsDataMapOrderKey.enemyHand,
	)
	const pullList = enemyHand.slice(0, pullLength);
	cardsTmpDataMap.set(
		cardsDataMapOrderKey.enemyHand,
		enemyHand.slice(pullLength)
	)
	cardsTmpDataMap.set(
		cardsDataMapOrderKey.enemyField,
		cardSort(
			cardsTmpDataMap.get(
				cardsDataMapOrderKey.enemyField
			).concat(
				pullList
			)
		)
	)
	updateCardsBackupDataMapByTmpMap()
	updateDisplayCardsByTmpMap(
		powerPoker
 	)
}
