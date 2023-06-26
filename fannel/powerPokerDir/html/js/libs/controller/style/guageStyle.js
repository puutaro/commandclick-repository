

function execEnemyScoreStyle(
	powerPoker
){
	const enemyScore = powerPoker.enemyScore;
	const playerScore = powerPoker.playerScore;
	const denominator = enemyScore + playerScore
	if(
		denominator == 0
	) return {
		width: '30%'
	}
	const enemyWidth = 20 + (enemyScore * 20) / denominator
	return {
		width: `${enemyWidth}%`,
	}
}

function execPlayerScoreStyle(
	powerPoker
){
	const playerScore = powerPoker.playerScore;
	const enemyScore = powerPoker.enemyScore;
	const denominator = enemyScore + playerScore
	if(
		denominator == 0
	) return {
		width: '30%'
	}
	const playerWidth = 20 + (playerScore * 20) / denominator
	return {
		width: `${playerWidth}%`,
	}
}

function execEnemyShineStyle(
	powerPoker
){
	const enemyShineTotal = powerPoker.enemyShineTotal;
	const playerShineTotal = powerPoker.playerShineTotal;
	const denominator = enemyShineTotal + playerShineTotal
	if(
		denominator == 0
	) return {
		width: '30%'
	}
	const enemyShineWidth = 20 + (enemyShineTotal * 20) / denominator
	return {
		width: `${enemyShineWidth}%`,
	}
}

function execPlayerShineTotal(
	powerPoker
) {
	const enemyShineTotal = powerPoker.enemyShineTotal;
	const playerShineTotal = powerPoker.playerShineTotal;
	const denominator = enemyShineTotal + playerShineTotal
	if(
		denominator == 0
	) return {
		width: '30%'
	}
	const playerShineWidth = 20 + (playerShineTotal * 20) / denominator
	return {
		width: `${playerShineWidth}%`,
	}	
}

function execEnemyTotalStyle(
    powerPoker
){
	const enemyTotal = powerPoker.enemyTotal;
	const playerTotal = powerPoker.playerTotal;
	const denominator = enemyTotal + playerTotal
	if(
		denominator == 0
	) return {
		width: '30%'
	}
	const enemyTotalWidth = 15 + (enemyTotal * 20) / denominator
	return {
		width: `${enemyTotalWidth}%`,
	}
}

function execPlayerTotalStyle(
    powerPoker
){
	const enemyTotal = powerPoker.enemyTotal;
	const playerTotal = powerPoker.playerTotal;
	const denominator = enemyTotal + playerTotal
	if(
		denominator == 0
	) return {
		width: '30%'
	}
	const playerTotalWidth = 15 + (playerTotal * 20) / denominator
	return {
		width: `${playerTotalWidth}%`,
	}
}
