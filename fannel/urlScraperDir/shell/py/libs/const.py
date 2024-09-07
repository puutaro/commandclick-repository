

import os


class Const:

	_home_dir = os.environ['HOME']
	PUKT_PATH = f"{_home_dir}/nltk_data/tokenizers/punkt"
	MAX_OUTPUT_LINES = 100
	# MAX_CONCUR_PROCESS_NUM = 5
	LANG_JUDGE_MAX_STRING = 400
	BLOCK_CONTENTS_TUPLE = (
		"Please make sure your browser supports JavaScript and cookies and that you are not blocking them from loading",
		)

	def __init__(self):
		pass
