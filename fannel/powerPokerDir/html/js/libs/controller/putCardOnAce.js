
function updateCardsDataHandlerOnAce(
  putHandStr,
  powerPoker
){
  if(
    !powerPoker.enablePut
  ) return
  const putNumber = toNumber(putHandStr)
  powerPoker.spotCardNum = putNumber;
  powerPoker.enablePut = powerPoker.enemyDisplayShrine.filter(
    function(el){
      return el.includes(putNumber)
  }).length > 1
  switch(true){
    case noDuplicationPutList.includes(putNumber):
      execPutOnAce(
        toHandStr(putHandStr),
        powerPoker
      );
      powerPoker.onPutConfirmDialog = confirmDialogType.acePutFix
      powerPoker.enablePut = false;
      break;
    case true:
      execPutOnAce(
      	toHandStr(putHandStr),
        powerPoker
      );
      powerPoker.onPutConfirmDialog = confirmDialogType.acePutFix
      break;
  }
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
  powerPoker.enablePut = true
  powerPoker.spotCardNum = "";

  updateTmpCardsByDisplayCards(
    powerPoker
  )
  powerPoker.enemyDisplayShrine = []
  alert("aa" + powerPoker.enemyDisplayShrine.join("--"))
  updateCardsBackupDataMapByTmpMap()
  powerPoker.displayHandMode = displayHandModeType.normal
  powerPoker.onPutConfirmDialog = confirmDialogType.menu
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

function execNoFixPutOnAce(
  powerPoker
){
  powerPoker.enablePut = true
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
  removeClass(
      SWITCH_PARTS_ID.menuButtonBox,
      CLASS_FOR_SWITCH.noDisplay
    );
  powerPoker.onPutConfirmDialog = confirmDialogType.menu
}
