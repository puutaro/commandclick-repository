
import argparse 

class Args:

	def __init__(self):
		pass


	@classmethod
	def parse(cls):
		parser = argparse.ArgumentParser(
			description='news summury speech'
		)  
		parser.add_argument(
			'--urls', '-u',
			nargs='*', 
			type=str, 
			required=True, 
			help='new site'
		)
		parser.add_argument(
			'--each_num', 
			'-n', 
			type=int,
			default=50,
			help='select num by each site'
		)
		parser.add_argument(
			'--lang', 
			'-l', 
			type=str,
			required=True, 
			help='lang'
		)
		parser.add_argument(
			'--trans_output', 
			'-to', 
			type=str,
			required=True, 
			help='trans output file path'
		)
		parser.add_argument(
			'--normal_output', 
			'-no', 
			type=str,
			required=True, 
			help='local output file path'
		)
		parser.add_argument(
			'--summary_length', 
			'-sl', 
			type=int,
			required=True,
			help='summary length'
		)
		parser.add_argument(
			'--err_log_file', 
			'-el', 
			type=str,
			required=True,
			help='err log file path'
		)
		parser.add_argument(
			'--max_concur', 
			'-mc', 
			type=int,
			required=True,
			help='max concurrency num'
		)

		return parser.parse_args()
