import sys
import tensorflow as tf
import gpt_2_simple as gpt2

def generateSummary(arg): 
    return arg[2]

def retrainModel(arg): 
    return "Model retrained"

# if __name__ == '__main__':
operations = {
    "generateSummary": generateSummary,
    "retrainModel" : retrainModel
    }
res = operations[sys.argv[1]](sys.argv)
print(res)
sys.stdout.flush()