

kill_process(){
	local pids=$(ps aux | grep "${1}" | awk '{print $2}')
	case "${pids}" in
		"") return ;;
	esac
	kill ${pids} \
	2>/dev/null \
	|| e=$?
}
