#!/bin/bash

readonly CURRENT_DIR_PATH="$(dirname $0)"
cd "${CURRENT_DIR_PATH}"
sudo apt-get install -y \
	translate-shell
sudo pip3 install \
	newspaper3k \
	langdetect
python3 ./py/nltk_downloader.py
echo "comp installed"