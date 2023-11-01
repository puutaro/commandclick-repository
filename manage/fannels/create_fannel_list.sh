#!/bin/bash

pwd
cd fannel

find  \
	-type f \
	-not -path '*/.git/*' \
	-not -path '*/.github/*' \
	-and -not -path '*/exp_fannel/*' \
	-and -not -path '*/old/*' \
	-and -not -path '*/.difbk/*' \
	-and -not -path '*/manage/*' \
 	-and -not -name '*gitignore' \
	-and -not -name '*LICENSE' \
	-and -not -name '*README.md' \
	-and -not -name '*difbk_ignore' \
	-printf '%P\n' \
 >  "../manage/fannels/list/fannels.txt"
