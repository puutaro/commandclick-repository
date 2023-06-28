
function updateCardsDataHandlerOnAce(
  putHandStr,
  powerPoker
){
  const putNumber = toNumber(putHandStr)
  powerPoker.spotCardNum = putNumber;
  execPutOnAce(
    toHandStr(putHandStr),
    powerPoker
  );
  powerPoker.onPutConfirmDialog = confirmDialogType.acePutFix
};

function execPutOnAce(
  putHandStr,
  powerPoker
){
  powerPoker.enemyDisplayShrine = powerPoker.enemyDisplayShrine.filter(
    function(el){
      return el != putHandStr
    })
  powerPoker.playerDisplayField.push(putHandStr)
  powerPoker.playerDisplayField = cardSort(
    powerPoker.playerDisplayField
  );
  powerPoker.playerEfect = "";
  powerPoker.enemyEfect = "";
  registerTotal(
    powerPoker
  )
  registerScore(
    powerPoker
  ) 
}


function execAceFixPut(
  powerPoker
){
  let currentArray = powerPoker.playerDisplayField
  let previousArray = cardsTmpDataMap.get(
        cardsDataMapOrderKey.playerField
      )
  let diffplayerField = diffArray(
    previousArray,
    currentArray
  )
  const aceCardList = diffplayerField.filter(
    function(el){
      return el.includes("A");
    });
  const aceCardListLength = aceCardList.length
  powerPoker.currentAceTimes = aceCardListLength - 1
  // alert(`${powerPoker.currentAceTimes} / ${aceCardListLength}\n${aceCardList.join("-")}`)
  const tempPlayerField = powerPoker.playerDisplayField.filter(function(el){
      return !el.includes(aceCardList[0])
    })
  powerPoker.playerDisplayField = currentArray.filter(
    function(el){
    return !aceCardList.includes(el)
  })

  const onAceContinue = aceCardList.length > 1
  powerPoker.spotCardNum = "";
  updateCardTmpDataPartByList(
    cardsDataMapOrderKey.playerField,
    tempPlayerField
  )
  updateCardTmpDataPartByList(
    cardsDataMapOrderKey.enemyShrine,
    powerPoker.enemyDisplayShrine,
  )
  updateCardTmpDataPartByList(
    cardsDataMapOrderKey.enemyField,
    powerPoker.enemyDisplayField,
  )
  setTimeout(function() {
    powerPoker.playerEfect = "";
    powerPoker.enemyEfect = "";
    registerTotal(
      powerPoker
    )
    registerScore(
      powerPoker
    )
    if(
      !onAceContinue
    ){
        powerPoker.enemyDisplayShrine = []
        updateDisplayCardsByTmpMap(powerPoker)
        updateCardsBackupDataMapByTmpMap()
        powerPoker.currentFaze = currentFazeType.hand;
        powerPoker.displayHandMode = displayHandModeType.normal
        powerPoker.onPutConfirmDialog = confirmDialogType.menu
        powerPoker.enableUserPlay = false
    }
  }, 100)
}

function execNoFixPutOnAce(
  powerPoker
){
  powerPoker.spotCardNum = "";
  updateCardsTmpDataMapByBuckupDataMap()
  updateDisplayCardsByTmpMap(
    powerPoker
  )
  powerPoker.displayHandMode = displayHandModeType.normal
  powerPoker.onPutConfirmDialog = confirmDialogType.menu
  powerPoker.currentFaze = currentFazeType.hand;
  powerPoker.playerEfect = "";
  powerPoker.enemyEfect = "";
  registerTotal(
    powerPoker
  )
  registerScore(
    powerPoker
  )
  powerPoker.onPutConfirmDialog = confirmDialogType.menu
}
