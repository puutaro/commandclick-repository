
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
	    ),
	    cardsTmpDataMap.get(
	        cardsDataMapOrderKey.playerField
	    )
  	);
  	powerPoker.playerTotal = execCountTotalForPlayerField(
  		powerPoker,
  		cardsTmpDataMap.get(
	        cardsDataMapOrderKey.playerField
	    ),
	    cardsTmpDataMap.get(
	        cardsDataMapOrderKey.enemyField
	    )
  	);
  	powerPoker.bothTotal = powerPoker.enemyTotal + powerPoker.playerTotal;
};


function execCountTotalForEnemyField(
	powerPoker,
	cardList,
	otherCardList
){
	const simpleSheetsTotal = simpleSheetsCount(
		cardList
	)
	const fourPiece = count4Efect(
		cardList
	)
	const onTwoBarrier = twoBarrierJudge(
	    cardList,
	    otherCardList,  
	)
	const onFour = fourPiece > 0 && onTwoBarrier
	if(onFour){
		powerPoker.enemyEfect += `${efectType.four}x${fourPiece}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType}x[0-9]\t`)
		)
		return simpleSheetsTotal;
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
