

function updateCardsDataHandler(
  putHandStr,
  powerPoker
){
  const putNumber = toNumber(putHandStr)
  powerPoker.spotCardNum = putNumber;
  normalPut(
    toHandStr(putHandStr),
    powerPoker
  );
};


function normalPut(
  putHandStr,
  powerPoker
) {
  execNormalPut(
    putHandStr,
    powerPoker
  );
  powerPoker.onPutConfirmDialog = confirmDialogType.putFix
};


function execNormalPut(
  putHandStr,
  powerPoker
){
  powerPoker.playerDisplayHand = powerPoker.playerDisplayHand.filter(
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

function execFixOrOtherHandler(
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
  const onTwoBarrier = twoBarrierJudge(
    powerPoker.playerDisplayField,
    powerPoker.enemyDisplayField,
  )
  const onAceTrigger = aceCardListLength > 0 && onTwoBarrier;
  switch(true){
    case onAceTrigger:
      powerPoker.aceTimes = aceCardListLength
      powerPoker.currentAceTimes = aceCardListLength
      powerPoker.currentFaze = currentFazeType.pullEnemyShrine
      powerPoker.spotCardNum = ""
      powerPoker.enemyDisplayShrine = cardsTmpDataMap.get(
        cardsDataMapOrderKey.enemyShrine
      )
      updateCardTmpDataPartByList(
        cardsDataMapOrderKey.playerHand,
        powerPoker.playerDisplayHand
      )
      powerPoker.displayHandMode = displayHandModeType.ace
      powerPoker.onPutConfirmDialog = confirmDialogType.acePutFix
      break
    case true:
      execFixPut(
        powerPoker
      )
      break;
  }
}

function execFixPut(
  powerPoker
){
  powerPoker.spotCardNum = "";
  updateCardTmpDataPartByList(
    cardsDataMapOrderKey.playerField,
    powerPoker.playerDisplayField
  )
  updateCardTmpDataPartByList(
    cardsDataMapOrderKey.playerHand,
    powerPoker.playerDisplayHand
  )
  updateCardsBackupDataMapByTmpMap()
  setTimeout(function() {
    powerPoker.playerEfect = "";
    powerPoker.enemyEfect = "";
    registerTotal(
      powerPoker
    )
    registerScore(
      powerPoker
    )
    powerPoker.onPutConfirmDialog = confirmDialogType.menu
    powerPoker.enableUserPlay = false
  }, 100)
}



function execNoFixPut(
  powerPoker
){
  powerPoker.spotCardNum = "";
  updateCardsTmpDataMapByBuckupDataMap()
  updateDisplayCardsByTmpMap(
    powerPoker
  )
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
