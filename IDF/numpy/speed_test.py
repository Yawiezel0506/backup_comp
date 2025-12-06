import numpy as np

from timeit import default_timer as timer

a = np.random.randn(1000)
b = np.random.randn(1000)

print(a, b)


A = list(a)
B = list(b)

print(A, B)

T = 1000

def dot1():
    dot = 0
    for i in range(len(a)):
        dot += A[i] * B[i]
    return dot

def dot2():
    return np.dot(a, b)


start = timer()

for t in range(T):
    dot1()
end = timer()
t1 = end - start

start = timer()

for t in range(T):
    dot2()
end = timer()
t2 = end - start

print(t1, t2, t1/t2)