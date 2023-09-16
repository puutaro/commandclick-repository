
function registerTotal(
	powerPoker
){
	powerPoker.enemyShineTotal = execCountTotalForShrine(
		powerPoker.enemyDisplayShrine
		// cardsTmpDataMap.get(
	    //     cardsDataMapOrderKey.enemyShrine
	    // )
	)
 	powerPoker.playerShineTotal = execCountTotalForShrine(
		powerPoker.enemyDisplayShrine
 		// cardsTmpDataMap.get(
	    //     cardsDataMapOrderKey.playerShrine
	    // )
  	)
  	powerPoker.enemyTotal = execCountTotalForEnemyField(
  		powerPoker,
		powerPoker.enemyDisplayField,
		powerPoker.playerDisplayField,
  	)
  	powerPoker.playerTotal = execCountTotalForPlayerField(
  		powerPoker,
		powerPoker.playerDisplayField,
		powerPoker.enemyDisplayField
  	);
  	powerPoker.bothTotal = powerPoker.enemyTotal + powerPoker.playerTotal;
}


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
		powerPoker.enemyEffect += `${efectType.four}x${fourPiece}\t`
	} else {
		powerPoker.enemyEffect = deleteEfect(
			powerPoker.enemyEffect,
			new RegExp(`${efectRegexType}x[0-9]\t`)
		)
		return simpleSheetsTotal;
	}

	const fourTotal = fourPiece * 3
	return fourTotal + simpleSheetsTotal
}

function execCountTotalForPlayerField(
	powerPoker,
	cardList,
	otherCardList,
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
		powerPoker.playerEffect += `${efectType.four}x${fourPiece}\t`
	} else {
		powerPoker.playerEffect = deleteEfect(
			powerPoker.playerEffect,
			new RegExp(`${efectRegexType.four}x[0-9]\t`)
		)
		return simpleSheetsTotal;
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
