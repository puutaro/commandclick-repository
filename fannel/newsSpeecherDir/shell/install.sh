#!/bin/bash

readonly CURRENT_DIR_PATH="$(dirname $0)"
cd "${CURRENT_DIR_PATH}"
sudo apt-get install -y \
	translate-shell
sudo pip3 install -U \
	newspaper3k \
	langdetect \
	lxml_html_clean
python3 ./py/nltk_downloader.py
echo "comp installed"