

function updateCardsDataHandler(
  putHandStr,
  powerPoker
){
  if(
    !powerPoker.enablePut
  ) return
  const putNumber = toNumber(putHandStr)
  powerPoker.spotCardNum = putNumber;
  powerPoker.enablePut = powerPoker.playerDisplayHand.filter(
    function(el){
      return el.includes(putNumber)
  }).length > 1
  switch(true){
    case noDuplicationPutList.includes(putNumber):
      normalPut(
        toHandStr(putHandStr),
        powerPoker
      );
      powerPoker.enablePut = false;
      break;
    case true:
      normalPut(
      	toHandStr(putHandStr),
        powerPoker
      );
      break;
  }
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
  const enableAceInclude = diffplayerField.some(
    function(el){
      return el.includes("A");
    });
  switch(true){
    case enableAceInclude:
      powerPoker.currentFaze = currentFazeType.pullEnemyShrine
      powerPoker.spotCardNum = ""
      powerPoker.enemyDisplayShrine = cardsTmpDataMap.get(
        cardsDataMapOrderKey.enemyShrine
      )
      alert(powerPoker.enemyDisplayShrine.join("--"))
      // updateCardTmpDataPartByList(
      //   cardsDataMapOrderKey.playerField,
      //   powerPoker.playerDisplayField
      // )
      powerPoker.enablePut = true
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
  powerPoker.enablePut = true
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
  powerPoker.enablePut = true
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
  removeClass(
      SWITCH_PARTS_ID.menuButtonBox,
      CLASS_FOR_SWITCH.noDisplay
    );
  powerPoker.onPutConfirmDialog = confirmDialogType.menu
}
