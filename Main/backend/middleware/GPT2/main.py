#! python37
import sys
import gpt_2_simple as gpt2
from os import path
import requests

gpt2ModelDownload = "https://drive.google.com/uc?export=download&id=1UFY2AmRR5GFFWVe2N7-sqV5hj1SFaBnf"
gpt2ModelLocalPath = "./checkpoint/run1/model-2000.data-00000-of-00001"

def generateSummary(arg): 
    if not path.exists(gpt2ModelLocalPath): 
        r = requests.get(gpt2ModelDownload, allow_redirects=True)
        open(gpt2ModelLocalPath, 'wb').write(r.content)
    
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