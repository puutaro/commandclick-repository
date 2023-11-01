
import datetime
import newspaper
import os
import sys
import subprocess
import unicodedata
import random

from collections import Counter
from langdetect import detect
from multiprocessing import Manager, Process
from typing import List, Tuple
from .args import Args
from .const import Const


class Summarize:

	def __init__(self):
		args = Args.parse()
		self._each_num = args.each_num
		self._urls = _slice_url(
			self._each_num,
			args.urls,
		)
		self._lang = args.lang
		self._len_total_url = len(self._urls)
		self._trans_output_file_path = args.trans_output
		self._normal_output_file_path = args.normal_output
		self._returned_dict = self._make_return_dict()
		self._summary_length = args.summary_length
		self._err_log_file = args.err_log_file
		self._max_concur = args.max_concur


	def exec(self):
		_create_dir(self._trans_output_file_path)
		self._concur_summrize()
		self._write_trans_or_normal()


	def _concur_summrize(self):
		_len_num_tuple = tuple(range(self._len_total_url))
		_len_num_tuple_chunk = tuple(
			_chunks(
				_len_num_tuple, 
				self._max_concur,
			)
		)
		for len_num_tuple in _len_num_tuple_chunk:
			self.__exec_concur_summrize(
				len_num_tuple
			)

	def __exec_concur_summrize(
		self, 
		len_num_tuple: Tuple[int]
	):
		process_list = []
		for i in len_num_tuple:
			url = self._urls[i]
			process = Process(
				target=self._exec_summarize,
				kwargs={
					'url': url,
					'cur_url_times': i,
			})
			process.start()
			process_list.append(process)

		for process in process_list:
			process.join()

	def _exec_summarize(
		self,
		url: str,
		cur_url_times: int,
	): 
		display_cur_url_times = cur_url_times + 1
		# _toast(f"[{display_cur_url_times}/{self._len_total_url}] Site download..")
		_website = newspaper.build(
			url, 
			memoize_articles = False, 
			MAX_SUMMARY = self._summary_length
		)
		# _toast(f"[{display_cur_url_times}/{self._len_total_url}] Site download ok")
		_ouput_list = []
		_len_articles = len(_website.articles)
		display_total_len_articles = _len_articles
		if display_total_len_articles > self._each_num:
			display_total_len_articles = self._each_num
		_article_list = _website.articles
		random.shuffle(_article_list)
		for item in range(display_total_len_articles):
			_website_article = _article_list[item]
			_website_article_url = _website_article.url
			try:
				display_item = item + 1
				# _toast(
				# 	f"[{display_cur_url_times}/{self._len_total_url}] {display_item}/{display_total_len_articles} {url}"
				# )
				_website_article.download()
				_website_article.parse()
				_website_article.nlp()
				_summary = _website_article.summary
				# _date = self._convert_datetime_str(_website_article.publish_date)
				_title = self._convert_title_str(_website_article.title)
				if _judge_block(_summary):
					continue
				_output = f"{item}\t{_website_article_url}\t{_title}, {_summary}"
				_ouput_list.append(_output.replace('\n', ''))
			except Exception as e:
				with open(self._err_log_file, 'a') as f:
					print(
						f"A[{str(item)}]\t{_website_article_url}\tGet err: {e}\n",
						file=f
					)
		self._returned_dict[url] = self._create_lang_to_con_dict(
			'\n'.join(_ouput_list)
		)

	def _create_lang_to_con_dict(self, con):
		_lang = self._judge_lang(con)
		return {
		_ArticleKeys.LANG: _lang,  
		_ArticleKeys.CONTENTS: con
	}

	def _convert_title_str(self, title_src) -> str:
		if not title_src:
			return ""
		return f"{title_src}"				

	def _make_return_dict(self):
		manager = Manager()
		return manager.dict()

	def _write_trans_or_normal(self):
		_trans_lang = self._judge_trans_lang()
		_lang_key = _ArticleKeys.LANG
		_contents_key = _ArticleKeys.CONTENTS
		_trans_con_gen = [ 
				con_dict[_contents_key] 
				for con_dict in self._returned_dict.values() 
					if con_dict[_lang_key] == _trans_lang 
			]
		_normal_con_gen = [ 
				con_dict[_contents_key] 
				for con_dict in self._returned_dict.values() 
					if con_dict[_lang_key] == self._lang 
			]
		_write_file(
			_trans_con_gen, 
			self._trans_output_file_path
		)
		_write_file(
			_normal_con_gen, 
			self._normal_output_file_path
		)

	def _judge_trans_lang(self):
		_lang_key = _ArticleKeys.LANG
		_trans_lang_list = [
			con_dict[_lang_key] 
			for con_dict in self._returned_dict.values() 
				if con_dict[_lang_key] != self._lang
		]
		_counter = Counter(_trans_lang_list)
		l = list(_counter.keys())
		if not l:
			return ""
		_lang_times_list, _ = zip(*_counter.most_common())
		_max_times_lang = _lang_times_list[0]
		return _max_times_lang

	def _judge_lang(self, con) -> str:
		try:
			return detect(con[:Const.LANG_JUDGE_MAX_STRING])
			# _con_list = con[:Const.LANG_JUDGE_MAX_STRING].split(',')
			# _detect_con = ""
			# if(len(_con_list) > 3):
			# 	_detect_con = ','.join(_con_list[2:])
			# else:
			# 	_detect_con = ','.join(_con_list)	
			# return detect(_detect_con)
		except Exception as e:
			return "u"			

def _slice_url(
	each_num: int,
	urls_src: List[str],
):
	_max_output_lines = Const.MAX_OUTPUT_LINES
	_len_require_urls = _max_output_lines // each_num
	rnd_urls_src = list(urls_src)
	random.shuffle(rnd_urls_src)
	_urls_src_len = len(rnd_urls_src)
	if _len_require_urls >= _urls_src_len:
		return rnd_urls_src
	_last_index_len_require_urls = _len_require_urls - 1
	return rnd_urls_src[:_last_index_len_require_urls]


def _create_dir(path: str):
	dir_path = os.path.dirname(path)
	if not os.path.isdir(dir_path):
		os.mkdir(dir_path)

def _echo(con: str):
	subprocess.run(["echo", con])

def _toast(con: str):
	subprocess.Popen(["toast", con])


def _write_file(con_list: List[str], path: str):
	if not con_list:
		return
	_con = '\n'.join(con_list)
	with open(path, mode='w', encoding='utf-8', newline='\n') as f:
		f.write(f"{_con}\n")

def _chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def _judge_block(con):
	block_con_tuple = Const.BLOCK_CONTENTS_TUPLE
	for block_con in block_con_tuple:
		if block_con in con:
			return True
	return False

class _ArticleKeys:

	LANG = "lang"
	CONTENTS = "contents"