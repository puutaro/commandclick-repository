#!/bin/bash

set -ue 

readonly REPLACE_VARS_CON="$(get_rvar "${0}")"
readonly NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH=$(\
	get_rvar "${REPLACE_VARS_CON}" NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH \
)

readonly is_re_summarize_process=$(\
	ps aux \
	| grep "${NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH}" \
	| grep -v grep \
)

case "${is_re_summarize_process}" in
	"") ;;
	*) exit 0 ;;
esac

exec bash \
	"${NEWS_SPEECHER_CAT_AND_SPEECH_SHELL_PATH}"\
	"$@" \
	2>/dev/null