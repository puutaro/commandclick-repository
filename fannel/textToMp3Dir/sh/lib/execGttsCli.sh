#!/bin/bash


execGttsCli(){
	cat /proc/self/fd/0  \
	| sed 's/[+&@#\*\/&#37;?=~_\|!:,.;！\＃\＄\％\＆\（\）\＝\〜\＾\￥\｜\｛\｝\＠\｀\＊\-]//g' \
	| gtts-cli \
		--lang "${1:-en}" \
		--output "${2}" \
		-

	echo "$(date '+%Y-%m-%d %H:%M:%S') created"
}