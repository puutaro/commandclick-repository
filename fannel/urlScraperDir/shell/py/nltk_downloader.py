import os
from libs.const import Const

def is_empty(dir_path: str) -> bool:
	if not os.path.isdir(dir_path):
		return TRUE
	return len(os.listdir(dir_path)) < 5

class NltkDownloader:

	def __init__(self):
		pass
	
	@classmethod
	def exec(cls):
		pukt_path = Const.PUKT_PATH
		if is_empty(pukt_path):
			import nltk
			nltk.download('punkt_tab')


NltkDownloader.exec()