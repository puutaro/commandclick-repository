

function toNumber(cardStr){
	return cardStr
		.replace(/.*\n/, "")
		.replaceAll(/ /g, "")
	  .replaceAll(/\t/g, "")
	  .replace(/\n$/, "")
}

function toMark(cardStr){
	return cardStr.replace(/\n.*$/, "")
		.replaceAll(/ /g, "")
    .replace(/\t/g, "")
    .replace(/\n$/, "")
}

function toHandStr(handStrEntry){
	return handStrEntry.replaceAll(/ /g, "")
    	.replace(/\t/g, "")
    	.replace(/\n$/, "")
};


function outSortIndex(srcStr){
	const x_sort_val =  srcStr
		.replace(/.*\n/, "")
		.trim()
	return sortScaleList.indexOf(x_sort_val);
}


function cardSort(cards){
	return cards
	.join("\t")
	.trim()
	.trim("\t")
	.split("\t")
	.sort(function(x, y) {
		const x_sort_index = outSortIndex(x)
		const y_sort_index = outSortIndex(y)
	  if (x_sort_index < y_sort_index) {
	    return -1;
	  }
	  if (x_sort_index > y_sort_index) {
	    return 1;
	  }
	  return 0;
	});
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

function updateCardsBackupDataMapByTmpMap(){
	cardsDataBackupMap.set(
    cardsDataMapOrderKey.playerField,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.playerField
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.enemyField,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.enemyField
      
    	 )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.playerHand,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.playerHand
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.enemyHand,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.enemyHand
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.playerDust,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.playerDust
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.enemyDust,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.enemyDust
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.playerShrine,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.playerShrine
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.enemyShrine,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.enemyShrine
      )
    )
  );
  cardsDataBackupMap.set(
    cardsDataMapOrderKey.dekiMountain,
    deepCopyArray(
      cardsTmpDataMap.get(
      	cardsDataMapOrderKey.dekiMountain
      )
    )
  );
};

function updateCardsTmpDataMapByBuckupDataMap(){
	cardsTmpDataMap.set(
    cardsDataMapOrderKey.playerField,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.playerField
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.enemyField,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.enemyField
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.playerHand,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.playerHand
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.enemyHand,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.enemyHand
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.playerDust,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.playerDust
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.enemyDust,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.enemyDust
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.playerShrine,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.playerShrine
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.enemyShrine,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.enemyShrine
      )
    )
  );
  cardsTmpDataMap.set(
    cardsDataMapOrderKey.dekiMountain,
    deepCopyArray(
      cardsDataBackupMap.get(
      	cardsDataMapOrderKey.dekiMountain
      )
    )
  );
};


function updateDisplayCardsByTmpMap(
	powerPoker
){
	powerPoker.enemyDisplayField = cardSort(
		deepCopyArray(
			cardsTmpDataMap.get(
		    	cardsDataMapOrderKey.enemyField
		    )
		)
	)
	powerPoker.playerDisplayField = cardSort(
		deepCopyArray(
			cardsTmpDataMap.get(
		    	cardsDataMapOrderKey.playerField
		    )
		)
	)
	powerPoker.playerDisplayHand = cardSort(
		deepCopyArray(
			cardsTmpDataMap.get(
		    	cardsDataMapOrderKey.playerHand
		    )
		)
	)
};

function updateTmpCardsByDisplayCards(
	powerPoker
){
	cardsTmpDataMap.set(
    	cardsDataMapOrderKey.enemyField,
    	deepCopyArray(
    	  powerPoker.enemyDisplayField
    	)
  )
  cardsTmpDataMap.set(
    	cardsDataMapOrderKey.playerField,
    	deepCopyArray(
    	  powerPoker.playerDisplayField
    	)
  )
  cardsTmpDataMap.set(
    	cardsDataMapOrderKey.playerHand,
    	deepCopyArray(
	    	powerPoker.playerDisplayHand
	    )
  )
};


function updateCardTmpDataPartByList(
	dataKey,
	list,
){
	switch(dataKey){
		case cardsDataMapOrderKey.playerField:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.playerField,
				deepCopyArray(list)
			)
			break;	
		case cardsDataMapOrderKey.enemyField:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.enemyField,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.playerHand:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.playerHand,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.enemyHand:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.enemyHand,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.playerDust:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.playerDust,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.enemyDust:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.enemyDust,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.playerShrine:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.playerShrine,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.enemyShrine:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.enemyShrine,
				deepCopyArray(list)
			)
			break;
		case cardsDataMapOrderKey.dekiMountain:
			cardsTmpDataMap.set(
				cardsDataMapOrderKey.dekiMountain,
				deepCopyArray(list)
			)
			break;
	}
}

function updateDisplayCardPartByTmpMap(
	powerPoker,
	dataKey,
){
	switch(dataKey){
		case cardsDataMapOrderKey.playerField:
			powerPoker.playerDisplayField = deepCopyArray(
	      cardsTmpDataMap.get(
	      	cardsDataMapOrderKey.playerField
	      )
	    )
			break;	
		case cardsDataMapOrderKey.enemyField:
			powerPoker.enemyDisplayField = deepCopyArray(
	      cardsTmpDataMap.get(
	      	cardsDataMapOrderKey.enemyField
	      )
	    )
			break;
		case cardsDataMapOrderKey.playerHand:
			powerPoker.playerDisplayHand = deepCopyArray(
	      cardsTmpDataMap.get(
	      	cardsDataMapOrderKey.playerHand
	      )
	    )
			break;
	}
}

function countNum(
	numList,
	targetNum
){
	return numList.filter(
		function(num){
			return num == targetNum
		}).length	
}

function deleteEfect(
	efect,
	regex
){
	return efect.replace(regex, "")
}

function blackOrOtherColor(
	card
){
	const onRed = redMarkList.some(
		function(redMark){
      return card.includes(redMark)
    });
  if(onRed) return 'red';
  return 'black';
};
