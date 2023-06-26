
function registerScore(
	powerPoker
){
	powerPoker.enemyScore = execEnemyCountScore(
		powerPoker,
		powerPoker.enemyDisplayField,
		powerPoker.playerDisplayField
	);
 	powerPoker.playerScore = execPlayerCountScore(
 		powerPoker,
  		powerPoker.playerDisplayField,
  		powerPoker.enemyDisplayField
  	);
}


function execPlayerCountScore(
	powerPoker,
	cardList,
	otherCardList
){
	let factNumList = makeFactNumList(
		cardList
	)
	const simpleTotal = makeSimpleTotal(
		factNumList
	);
	let numList = makeNumList(
		cardList
	)
	let twoSheets = countNum(
		numList,
		2
	)
	let enemyTwoSheets = directTwoNumCount(
		otherCardList
	)
	if(
		twoSheets < enemyTwoSheets
	) return simpleTotal
	if(twoSheets > 0){
		powerPoker.playerEfect += `${efectType.two}\t`
	} else {
		powerPoker.playerEfect = deleteEfect(
			powerPoker.playerEfect,
			new RegExp(`${efectRegexType.two}\t`)
		)
	}

	const num4SamePieces = makeNum4SamePieces(
		factNumList
	)
	if(num4SamePieces > 0){
		powerPoker.playerEfect += `4x${num4SamePieces}\t`
	}
	const num4SamePoint = 13 * num4SamePieces;
	
	let markListEntry = makeMarkListEntry(
		cardList
	);
	let markList = makeMarkList(
		markListEntry
	);
	const allMarkPiece = makeAllMarkPiece(
		markList
	)
	if(allMarkPiece > 0){
		powerPoker.playerEfect += `${efectType.mark4Comp}\t`
	} else {
		powerPoker.playerEfect = deleteEfect(
			powerPoker.playerEfect,
			new RegExp(`${efectRegexType.mark4Comp}\t`)
		)
	}
	const allMarkPoint = allMarkPiece * 13;
	
	const samMarkPiece = sameMarkPiece(
		markListEntry,
		markList
	)
	if(samMarkPiece > 0){
		powerPoker.playerEfect += `${efectType.mark4Same}x${samMarkPiece}\t`
	} else {
		powerPoker.playerEfect = deleteEfect(
			powerPoker.playerEfect,
			new RegExp(`${efectRegexType.mark4Same}x[0-9]\t`)
		)
	}
	const sameMarkPoint = 13 * samMarkPiece;

	let threeSheets = countNum(
		numList,
		3
	)
	if(threeSheets > 0){
		powerPoker.playerEfect += `${efectType.three}x${threeSheets}\t`
	} else {
		powerPoker.playerEfect = deleteEfect(
			powerPoker.playerEfect,
			new RegExp(`${efectRegexType.three}x[0-9]`)
		)
	}
	const threePoint = numList.length * threeSheets * 3;
	const continuePiece = countContinueNum(
		numList
	)
	if(continuePiece > 0){
		powerPoker.playerEfect += `${efectType.num4Continue}x${continuePiece}\t`
	} else {
		powerPoker.playerEfect = deleteEfect(
			powerPoker.playerEfect,
			new RegExp(`${efectRegexType.num4Continue}x[0-9]\t`)
		)
	}
	const continuePoint = 13 * continuePiece;
	return simpleTotal + allMarkPoint + sameMarkPoint + continuePoint + num4SamePoint + threePoint
}

function execEnemyCountScore(
	powerPoker,
	cardList,
	otherCardList
){
	let factNumList = makeFactNumList(
		cardList
	)
	const simpleTotal = makeSimpleTotal(
		factNumList
	);
	let numList = makeNumList(
		cardList
	)
	let twoSheets = countNum(
		numList,
		2
	)
	let playerTwoSheets = directTwoNumCount(
		otherCardList
	)
	if(
		twoSheets < playerTwoSheets
	) return simpleTotal
	if(twoSheets > 0){
		powerPoker.enemyEfect += `${efectType.two}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType.two}\t`)
		)
	}
	const num4SamePieces = makeNum4SamePieces(
		factNumList
	)
	if(num4SamePieces > 0){
		powerPoker.enemyEfect += `${efectType.num4Same}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType.num4Same}\t`)
		)
	}
	const num4SamePoint = 13 * num4SamePieces;
	
	let markListEntry = makeMarkListEntry(
		cardList
	);
	let markList = makeMarkList(
		markListEntry
	);
	const allMarkPiece = makeAllMarkPiece(
		markList
	)
	if(allMarkPiece > 0){
		powerPoker.enemyEfect += `${efectType.mark4Comp}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType.mark4Comp}\t`)
		)
	}
	const allMarkPoint = allMarkPiece * 13;
	
	const samMarkPiece = sameMarkPiece(
		markListEntry,
		markList
	)
	if(samMarkPiece > 0){
		powerPoker.enemyEfect += `${efectType.mark4Same}x${samMarkPiece}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType.mark4Same}x[0-9]\t`)
		)
	}
	const sameMarkPoint = 13 * samMarkPiece;

	let threeSheets = countNum(
		numList,
		3
	)
	if(threeSheets > 0){
		powerPoker.enemyEfect += `${efectType.three}x${threeSheets}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType.three}x[0-9]\t`)
		)
	}
	const threePoint = numList.length * threeSheets * 3;
	const continuePiece = countContinueNum(
		numList
	)
	if(continuePiece > 0){
		powerPoker.enemyEfect += `${efectType.num4Continue}x${continuePiece}\t`
	} else {
		powerPoker.enemyEfect = deleteEfect(
			powerPoker.enemyEfect,
			new RegExp(`${efectRegexType.num4Continue}x[0-9]\t`)
		)
	}
	const continuePoint = 13 * continuePiece;
	return simpleTotal + allMarkPoint + sameMarkPoint + continuePoint + num4SamePoint + threePoint
}


function makeFactNumList(
	cardList
){
	return cardList.map(
		function(el){
			const numEntry = toNumberInScore(el);
			var num = Number(numEntry)
			if(num) return num
			num = strFactNumberMap.get(numEntry)
			if(num) return num
			return 0
		}).sort(
		function (a, b) {
		    return a - b
		})
}


function makeNum4SamePieces(
	factNumList
){
	var num4SamePoint = 0;
	const sameDiff = factNumList.length - Array.from(new Set(factNumList)).length;
	if(
		sameDiff >= 3
	) return sameDiff - 2;
	return 0
};

function makeSimpleTotal(
	factNumList
){
	return factNumList.reduce(
		function(sum, element){
		  return sum + element;
	}, 0);
}

function makeMarkListEntry(
	cardList
){
	return cardList.map(
		function(el){
			return toMark(el);
		})
}

function makeMarkList(
	markListEntry
){
	return Array.from(new Set(markListEntry));
}

function sameMarkPiece(
	markListEntry,
	markList
){
	const sameMarkNum = markListEntry.length - markList.length - 2
	if(sameMarkNum > 0){
		return markListEntry.length - markList.length - 2
	}
	return 0
}

function countContinueNum(
	numList
){
	let numListFrom6to13Entry = numList.filter(
		function(num){
			return 6 <= num
	})

	let numListFrom6to13 = Array.from(
		new Set(numListFrom6to13Entry)
	)
	var continueNumCount = 1;
	var continueList = [];
	numListFrom6to13.map(
		function(num, index){
			continueNumCount = 1;
			numListFrom6to13.forEach(
				function(innerNum, innerIndex){
					if(innerIndex <= index) return
					if(innerNum - num == innerIndex - index) continueNumCount++;
					else continueNumCount = 1;
			})
			continueList.push(continueNumCount)
	})
	return continueList.filter(
		function(countNum){
			return countNum >= 4;
	}).length
}

function makeAllMarkPiece(
	markList
){
	if(
		markList.length >= 4
	) return 1
	return 0
}
