
function init(onContinue){
	switch(onContinue){
		case true:
			createCards()
			break;
		case false:
			break;
	}
};

function createCards(){
	var dekiListSource = shuffleArray(
		shuffleArray(
			createCard()
		)
	);
	var dekiListSource = shuffleArray(
		dekiListSource
	);
	var dekiListSource = shuffleArray(
		dekiListSource
	);
	var dekiListSource = shuffleArray(
		dekiListSource
	);
	let plyerHand = dekiListSource.slice(0, 5);
	let enemyHand = dekiListSource.slice(6, 11);
	let dekiMountain = dekiListSource.slice(10);
	cardsDataBackupMap.set(
		cardsDataMapOrderKey.playerHand,
		plyerHand
	)
	cardsDataBackupMap.set(
		cardsDataMapOrderKey.enemyHand,
		enemyHand
	);
	cardsDataBackupMap.set(
		cardsDataMapOrderKey.dekiMountain,
		dekiMountain
	);
	updateCardsTmpDataMapByBuckupDataMap()
}


function createCard(){
	var dekiList = [];
	const sortScaleListLength = sortScaleList.length;
	let base52Cards = sortScaleList.map(function(num){
			return cardTypeList.map(function(type){
					return `${type}\n${num}`
			});
		}).flat();
	return jorkers.concat(
		base52Cards
	)
}
