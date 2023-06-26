

function cardEfect(
	powerPoker
){
	let playerEfectList = powerPoker.playerEfect
		.split("\t")
		.map(
			function(elSrc){
				const elSrcList = elSrc.split("x");
				const el = elSrcList[0]
				const sheets = elSrcList[1]
				switch(el){
					case efectType.one:
						return `<span class="playerEfect">${el}x${sheets}</span>`
						break
					case efectType.two:
						return `<span class="playerEfect">${el}</span>`
						break
					case efectType.three:
						return `<span class="playerEfect">${el}x${sheets}</span>`
						break
					case efectType.jorker:
						return `<span class="playerEfect">${el}x${sheets}</span>`
						break
					case efectType.four:
						return `<span class="playerEfect">${el}x${sheets}</span>`
						break
					case efectType.mark4Comp:
						return `<span class="playerEfect">${el}</span>`
						break
					case efectType.mark4Same:
						return `<span class="playerEfect">${el}x${sheets}</span>`
						break
					case efectType.num4Same:
						return `<span class="playerEfect">${el}</span>`
						break
					case efectType.num4Continue:
						return `<span class="playerEfect">${el}x${sheets}</span>`
						break
				}
		})
	let enemyEfectList = powerPoker.enemyEfect
		.split("\t")
		.map(
			function(elSrc){
				const elSrcList = elSrc.split("x");
				const el = elSrcList[0]
				const sheets = elSrcList[1]
				switch(el){
					case efectType.one:
						return `<span class="enemyEfect">${el}x${sheets}</span>`
						break
					case efectType.two:
						return `<span class="enemyEfect">${el}</span>`
						break
					case efectType.three:
						return `<span class="enemyEfect">${el}x${sheets}</span>`
						break
					case efectType.jorker:
						return `<span class="enemyEfect">${el}x${sheets}</span>`
						break
					case efectType.four:
						return `<span class="enemyEfect">${el}x${sheets}</span>`
						break
					case efectType.mark4Comp:
						return `<span class="enemyEfect">${el}</span>`
						break
					case efectType.mark4Same:
						return `<span class="enemyEfect">${el}x${sheets}</span>`
						break
					case efectType.num4Same:
						return `<span class="enemyEfect">${el}</span>`
						break
					case efectType.num4Continue:
						return `<span class="enemyEfect">${el}x${sheets}</span>`
						break
				}
		})
	powerPoker.efect = playerEfectList.join("\t") + enemyEfectList.join("\t") 
}
