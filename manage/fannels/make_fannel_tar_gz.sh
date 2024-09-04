
set -ue

readonly WORKING_DIR_PATH=$(pwd)
readonly FANNEL_STOCK_DIR_NAME="fannel"
readonly FANNEL_STOCK_DIR_PATH="${WORKING_DIR_PATH}/${FANNEL_STOCK_DIR_NAME}"
readonly FANNEL_TAR_GZ_DIR_NAME="fannel_tar_gz"
readonly FANNEL_TAR_GZ_DIR_PATH="${WORKING_DIR_PATH}/${FANNEL_TAR_GZ_DIR_NAME}"
mkdir -p "${FANNEL_TAR_GZ_DIR_PATH}"
readonly TEMP_WORK_DIR_NAME="temp"
readonly TEMP_WORK_DIR_PATH="${WORKING_DIR_PATH}/${TEMP_WORK_DIR_NAME}"
rm -rf "${TEMP_WORK_DIR_PATH}"
mkdir -p "${TEMP_WORK_DIR_PATH}"
echo "${TEMP_WORK_DIR_PATH}"
exit 0

create_fannel_tar_gz(){
	local fannel_name="${1}"
	local fannel_path="${FANNEL_STOCK_DIR_PATH}/${fannel_name}"
	test -f "${fannel_path}" \
		|| return
	local fannel_raw_name="${fannel_name%\.*}"
	local fannel_dir_path="${FANNEL_STOCK_DIR_PATH}/${fannel_raw_name}Dir"
	local fannel_temp_work_dir_path="${TEMP_WORK_DIR_PATH}/${fannel_raw_name}"
	mkdir -p "${fannel_temp_work_dir_path}"
	local temp_fannel_path="${fannel_temp_work_dir_path}/${fannel_name}"
	local temp_fannel_dir_path="${fannel_temp_work_dir_path}/${fannel_raw_name}Dir"
	cp -arvf \
		"${fannel_path}" \
		"${temp_fannel_path}"
	if [ -d "${fannel_dir_path}" ];then
		cp -arvf \
			"${fannel_dir_path}" \
			"${temp_fannel_dir_path}"
	fi
	cd "${fannel_temp_work_dir_path}"
	local fannel_tar_gz_file_name="${fannel_raw_name}.tar.gz"
	tar \
		-cvpzf "${FANNEL_TAR_GZ_DIR_PATH}/${fannel_tar_gz_file_name}" \
		./
}

export -f create_fannel_tar_gz


readonly FANNEL_NAME_LIST="$(\
	ls -p ${FANNEL_STOCK_DIR_PATH} | grep -v /\
)"

times=0
for f_name in ${FANNEL_NAME_LIST}
do
	echo "${f_name}"
	create_fannel_tar_gz \
		"${f_name}" &
	case "$(( ${times} % 5))" in
		4) 
			echo "wait"
			wait;;
	esac
done
wait
rm -rf "${TEMP_WORK_DIR_PATH}"

find "${FANNEL_TAR_GZ_DIR_PATH}" -type f