

function getRecentUrlFromHisCon(
	appHistoryCon
){
	return appHistoryCon.split("\n").reverse().slice(-100).map(
		function(line){
			return line.split("\t").at(-1);
		}
	).filter(
		function(url){
			return url.startsWith("http://") 
			|| url.startsWith("https://");
		}
	).at(-1);
};