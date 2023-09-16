#!/bin.bash


package_installer(){
	local package_name="${1}"
	local exist_package=$(\
		pkg list-installed \
			| grep "${package_name}" \
	)
	case "${exist_package}" in
		"") ;;
		*) 
			echo "already pkg installed: ${exist_package}"
			return ;;
	esac
	pkg install -y "${package_name}"
}

wget_and_move(){
	local get_url="${1}"
	local move_dir="${2}"
	local get_file_Name="$(basename "${get_url}")"
	test \
		-f "${move_dir}/${get_file_Name}" \
		&& return
	wget "${get_url}" \
		-P  "${move_dir}" \
		-O "${get_file_Name}"
}

export -f package_installer
export -f wget_and_move

readonly install_pkg_list='
tesseract
poppler
freetype
libimagequant
libjpeg-turbo
libraqm
libtiff
libwebp
libxcb
littlecms
openjpeg
zlib'

echo_package_install_shell(){
	echo "${install_pkg_list}" \
		| awk '{
			if($0 ~ /^$/) next
			print "package_installer \x22"$0"\x22"
		}'
}

readonly wget_files="
https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata
https://github.com/tesseract-ocr/tessdata/raw/3.04.00/jpn.traineddata
https://github.com/tesseract-ocr/tessdata/raw/main/jpn_vert.traineddata
"
readonly wget_move_dir="/data/data/com.termux/files/usr/share/tessdata"

echo_wget_move_shell(){
	echo "${wget_files}" \
		| awk \
			-v wget_move_dir="${wget_move_dir}" \
		'{
			if($0 ~ /^$/) next
			print "wget_and_move \x22"$0"\x22 \x22"wget_move_dir"\x22"
		}'
}


bash -c "$(echo_package_install_shell)"  2>&1
bash -c "$(echo_wget_move_shell)" 2>&1
