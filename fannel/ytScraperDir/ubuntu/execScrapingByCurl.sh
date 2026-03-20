#!/bin/bash


set -ue

function url_encode {
  echo "${1}" | nkf -WwMQ | sed 's/=$//g' | tr = % | tr -d '\n'
}
readonly YOTUBE_VIDEO_URL_PREFIX="https://www.youtube.com/watch?v="
readonly VIDEO_ID_KEY="videoId"
readonly TITLE_KEY="title"
readonly TEXT_KEY="text"
case "${1:-}" in
	"") exit 0;;
esac
readonly encode_search_word="$(url_encode "${1}")"
readonly ytSearchUrl="https://www.youtube.com/results?search_query=${encode_search_word}"
curl "${ytSearchUrl}" \
| sed \
	-re 's/("'${VIDEO_ID_KEY}'")/\n\1/g' \
	-re 's/("'${TITLE_KEY}'")/\n\1/g'   \
| awk '{
	if(\
		$0 ~ /^\x22'${TITLE_KEY}'\x22/\
		&& $0 ~ /^\x22'${TITLE_KEY}'\x22:\{\x22runs\x22:\[\{\x22'${TEXT_KEY}'\x22/ \
	){
		split($0, textConList, "\x22'${TEXT_KEY}'\x22")
		textContents = textConList[2]
		printf "\n\x22'${TEXT_KEY}'\x22\t%s\n", textContents
		next
	}
	if(\
		$0 ~ /^\x22'${VIDEO_ID_KEY}'\x22/\
		&& $0 ~ /\x22thumbnail\x22/ \
	){
		print gensub(/\x22'${VIDEO_ID_KEY}'\x22/, "\n\x22'${VIDEO_ID_KEY}'\x22\t", "g", $0)
		next
	}
	print $0
}' \
| awk '{
	if(\
		$0 ~ /^\x22'${VIDEO_ID_KEY}'\x22\t/ \
	) {
		print $0
		next
	}
	if(\
		$0 ~ /^\x22'${TEXT_KEY}'\x22\t/ \
		&& $0 ~ /accessibility/ \
	) {
		print $0
		next
	}
}' \
| awk -v YOTUBE_VIDEO_URL_PREFIX="${YOTUBE_VIDEO_URL_PREFIX}" '
{
	if($0 ~ /^\x22'${VIDEO_ID_KEY}'\x22\t/) {
		videoId = sprintf("%s", gensub(/^\x22'${VIDEO_ID_KEY}'\x22\t:\x22([^\x22]+)\x22.*/, "\\1", "1", $0))
		printf "\n%s%s", YOTUBE_VIDEO_URL_PREFIX, videoId
		next
	}
	if($0 ~ /^\x22'${TEXT_KEY}'\x22\t/) {
		print gensub(/^\x22'${TEXT_KEY}'\x22\t:\x22([^\x22]+)\x22.*/, "\t\\1", "1", $0)
		next
	}
	next
}'\
| awk -F '\t' '{
	ytUrl = gensub(/\\$/, "", "1", $1)
	title = gensub(/\\$/, "", "1", $2)
	if(\
		!title || !ytUrl \
	) next
	if(videoIdMap[ytUrl]) next
	printf "%s\t%s\n", title, ytUrl
	videoIdMap[$1]++
	}' \
| shuf
