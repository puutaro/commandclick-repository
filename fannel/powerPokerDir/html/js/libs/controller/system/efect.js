

function cardEfect(
	powerPoker
){
	let playerEffectList = powerPoker.playerEffect
		.split("\t")
		.map(
			function(elSrc){
				const elSrcList = elSrc.split("x");
				const el = elSrcList[0]
				const sheets = elSrcList[1]
				switch(el){
					case efectType.one:
						return `<span class="playerEffect">${el}x${sheets}</span>`
						break
					case efectType.two:
						return `<span class="playerEffect">${el}</span>`
						break
					case efectType.three:
						return `<span class="playerEffect">${el}x${sheets}</span>`
						break
					case efectType.jorker:
						return `<span class="playerEffect">${el}x${sheets}</span>`
						break
					case efectType.four:
						return `<span class="playerEffect">${el}x${sheets}</span>`
						break
					case efectType.mark4Comp:
						return `<span class="playerEffect">${el}</span>`
						break
					case efectType.mark4Same:
						return `<span class="playerEffect">${el}x${sheets}</span>`
						break
					case efectType.num4Same:
						return `<span class="playerEffect">${el}</span>`
						break
					case efectType.num4Continue:
						return `<span class="playerEffect">${el}x${sheets}</span>`
						break
				}
		})
	let enemyEffectList = powerPoker.enemyEffect
		.split("\t")
		.map(
			function(elSrc){
				const elSrcList = elSrc.split("x");
				const el = elSrcList[0]
				const sheets = elSrcList[1]
				switch(el){
					case efectType.one:
						return `<span class="enemyEffect">${el}x${sheets}</span>`
						break
					case efectType.two:
						return `<span class="enemyEffect">${el}</span>`
						break
					case efectType.three:
						return `<span class="enemyEffect">${el}x${sheets}</span>`
						break
					case efectType.jorker:
						return `<span class="enemyEffect">${el}x${sheets}</span>`
						break
					case efectType.four:
						return `<span class="enemyEffect">${el}x${sheets}</span>`
						break
					case efectType.mark4Comp:
						return `<span class="enemyEffect">${el}</span>`
						break
					case efectType.mark4Same:
						return `<span class="enemyEffect">${el}x${sheets}</span>`
						break
					case efectType.num4Same:
						return `<span class="enemyEffect">${el}</span>`
						break
					case efectType.num4Continue:
						return `<span class="enemyEffect">${el}x${sheets}</span>`
						break
				}
		})
	powerPoker.efect = playerEffectList.join("\t") + enemyEffectList.join("\t")
}
