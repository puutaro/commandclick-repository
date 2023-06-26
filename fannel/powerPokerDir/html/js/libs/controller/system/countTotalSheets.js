
function registerTotal(
	powerPoker
){
	powerPoker.enemyShineTotal = execCountTotalForShrine(
		cardsTmpDataMap.get(
	        cardsDataMapOrderKey.enemyShrine
	    )
	);
 	powerPoker.playerShineTotal = execCountTotalForShrine(
 		cardsTmpDataMap.get(
	        cardsDataMapOrderKey.playerShrine
	    )
  	);
  	powerPoker.enemyTotal = execCountTotalForEnemyField(
  		powerPoker,
  		cardsTmpDataMap.get(
	        cardsDataMapOrderKey.enemyField
	    )
  	);
  	powerPoker.playerTotal = execCountTotalForPlayerField(
  		powerPoker,
  		cardsTmpDataMap.get(
	        cardsDataMapOrderKey.playerField
	    )
  	);
  	powerPoker.bothTotal = powerPoker.enemyTotal + powerPoker.playerTotal;
};


function execCountTotalForEnemyField(
	powerPoker,
	cardList
){
	const simpleSheetsTotal = simpleSheetsCount(
		cardList
	)
	const fourPiece = count4Efect(
		cardList
	)
	if(fourPiece > 0){
		powerPoker.enemyEfect += `${efectType.four}x${fourPiece}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType}x[0-9]\t`)
		)
	}

	const fourTotal = fourPiece * 3
	return fourTotal + simpleSheetsTotal
}

function execCountTotalForPlayerField(
	powerPoker,
	cardList
){
	const simpleSheetsTotal = simpleSheetsCount(
		cardList
	)
	const fourPiece = count4Efect(
		cardList
	)
	if(fourPiece > 0){
		powerPoker.playerEfect += `${efectType.four}x${fourPiece}\t`
	} else {
		powerPoker.playerEfect = deleteEfect(
			powerPoker.playerEfect,
			new RegExp(`${efectRegexType.four}x[0-9]\t`)
		)
	}
	const fourTotal = fourPiece * 3
	return fourTotal + simpleSheetsTotal
}

function execCountTotalForShrine(
	cardList
){
	const simpleSheetsTotal = simpleSheetsCount(
		cardList
	)
	const fourPiece = count4Efect(
		cardList
	)
	const fourTotal = fourPiece * 3
	return fourTotal + simpleSheetsTotal
}

function simpleSheetsCount(
	cardList
){
	return cardList.filter(
		function(el){
			return el
		}).length
}

function count4Efect(
	cardList
){
	return cardList.filter(
		function (el) {
			return toNumber(el) == "4"
	}).length
}
