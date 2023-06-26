
function execDisplayFieldStyle(
  currentPutNum,
  index,
  powerPoker
){
    const cssColor = blackOrOtherColor(
      currentPutNum
    );
    return {
        color: cssColor,
    }
}


function execDisplayHandStyle(
	currentPutNum,
  index,
	powerPoker
){
    const cssColor = blackOrOtherColor(
      currentPutNum
    );
    const spotCardNum = powerPoker.spotCardNum;
    const currentFaze = powerPoker.currentFaze;
    const pullEnemyShrine = currentFazeType.pullEnemyShrine;
    var borderColor = decideHandBorderColor(
      powerPoker
    )
    const borderLeftStyle = decideBorderLeftStyle(
        borderColor,
        index,
      )
    if(
      !spotCardNum
    ) return {
        'background-color': 'white',
        'color': cssColor,
        'border-top': `1px solid ${borderColor}`,
        'border-bottom': `1px solid ${borderColor}`,
        'border-right': `1px solid ${borderColor}`,
        'border-left': borderLeftStyle,
    }
    if(
      noDuplicationPutList.includes(spotCardNum)
    ) return {
      'background-color': '#cfd0d1',
      'pointer-events': 'none',
      'color': cssColor,
      'border-top': `1px solid ${borderColor}`,
      'border-bottom': `1px solid ${borderColor}`,
      'border-right': `1px solid ${borderColor}`,
      'border-left': borderLeftStyle,
    }
    if(
      currentPutNum.includes(spotCardNum)
    ){
      return {
        'background-color': 'white',
        'color': cssColor,
        'border-top': `1px solid ${borderColor}`,
        'border-bottom': `1px solid ${borderColor}`,
        'border-right': `1px solid ${borderColor}`,
        'border-left': borderLeftStyle,
      }
    }
    return {
      'background-color': '#cfd0d1',
      'pointer-events': 'none',
      'color': cssColor,
      'border-top': `1px solid ${borderColor}`,
      'border-bottom': `1px solid ${borderColor}`,
      'border-right': `1px solid ${borderColor}`,
      'border-left': borderLeftStyle,
    }
}

function execDisplayAceHandStyle(
  currentPutNum,
  index,
  powerPoker
){
    const cssColor = blackOrOtherColor(
      currentPutNum
    );
    const spotCardNum = powerPoker.spotCardNum;
    const currentFaze = powerPoker.currentFaze;
    const pullEnemyShrine = currentFazeType.pullEnemyShrine;
    var borderColor = decideHandBorderColor(
      powerPoker
    )
    const borderLeftStyle = decideBorderLeftStyle(
        borderColor,
        index,
      )
    if(
      powerPoker.enemyDisplayShrine.at(index).includes('A')
    ) return {
        'background-color': '#cfd0d1',
        'pointer-events': 'none',
        'color': cssColor,
        'border-top': `1px solid ${borderColor}`,
        'border-bottom': `1px solid ${borderColor}`,
        'border-right': `1px solid ${borderColor}`,
        'border-left': borderLeftStyle,
    }
    if(
      !spotCardNum
    ) return {
        'background-color': 'white',
        'color': cssColor,
        'border-top': `1px solid ${borderColor}`,
        'border-bottom': `1px solid ${borderColor}`,
        'border-right': `1px solid ${borderColor}`,
        'border-left': borderLeftStyle,
    }
    // if(
    //   noDuplicationPutList.includes(spotCardNum)
    // ) return {
    //   'background-color': '#cfd0d1',
    //   'pointer-events': 'none',
    //   'color': cssColor,
    //   'border-top': `1px solid ${borderColor}`,
    //   'border-bottom': `1px solid ${borderColor}`,
    //   'border-right': `1px solid ${borderColor}`,
    //   'border-left': borderLeftStyle,
    // }
    if(
      currentPutNum.includes(spotCardNum)
    ){
      return {
        'background-color': 'white',
        'color': cssColor,
        'border-top': `1px solid ${borderColor}`,
        'border-bottom': `1px solid ${borderColor}`,
        'border-right': `1px solid ${borderColor}`,
        'border-left': borderLeftStyle,
      }
    }
    return {
      'background-color': '#cfd0d1',
      'pointer-events': 'none',
      'color': cssColor,
      'border-top': `1px solid ${borderColor}`,
      'border-bottom': `1px solid ${borderColor}`,
      'border-right': `1px solid ${borderColor}`,
      'border-left': borderLeftStyle,
    }
}

function execCurrentFazeStyle(
  powerPoker
){
  const currentFaze = powerPoker.currentFaze;
  const pullEnemyShrine = currentFazeType.pullEnemyShrine;
  switch(true){
    case currentFaze == pullEnemyShrine:
      return {
        color: 'white',
        backgroundColor: '#704612',
      }
      break;
    case true:
      return {
        color: '#555555',
        backgroundColor: 'white',
      }
      break;
  };
}

function decideHandBorderColor(
  powerPoker
){
  const currentFaze = powerPoker.currentFaze;
  const pullEnemyShrine = currentFazeType.pullEnemyShrine;
  if(
    currentFaze == pullEnemyShrine
  ) return '#704612';
  return '#7ff59d';
}

function decideBorderLeftStyle(
  borderColor,
  index
){
  if(
    index == 0
  ) return `1px solid ${borderColor}`;
  return 'none'
}
