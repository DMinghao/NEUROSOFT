#! python3.7
import sys
# import tensorflow as tf
import gpt_2_simple as gpt2

def generateSummary(arg): 
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess, run_name='run1')
    text = gpt2.generate(sess,
                    length=100,
                    prefix=arg[2], 
                    return_as_list=True
                    )[0]
    return text.split(arg[2],1)[1]

def retrainModel(arg): 
    return "Model retrained"

def testPipe(arg): 
    return arg[2]

# if __name__ == '__main__':
operations = {
    "generateSummary": generateSummary,
    "retrainModel" : retrainModel, 
    "testPipe" : testPipe
    }
res = operations[sys.argv[1]](sys.argv)
print(res)
sys.stdout.flush()