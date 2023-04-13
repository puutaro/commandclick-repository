

function exit(){
	throw new Error('exit');
}



function clickConfirmRetweet() { 
	document.querySelector('[data-testid="retweetConfirm"]').click();
	if(history.length>1) history.back();
};


function sleep(waitMsec) {
  var startMsec = new Date();
 
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
};


function clickReteet() {
	var roopTimes = 0;
	while(true){
		arialabel = document.querySelector('[aria-label="リツイート"]');
		if(arialabel) {
			arialabel.click();
			clickConfirmRetweet();
			break;
		}
		if(
			jsStop.how().includes("true")
		) exit();
		jsUtil.sleep(500);
		roopTimes++;
		if(roopTimes > 20) {
			alert('timeover, retry');
			exit();
		};
	};
};


window.setTimeout( clickReteet, 10000 );