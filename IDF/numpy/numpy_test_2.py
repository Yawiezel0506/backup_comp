import numpy as np

l1 = [1,2,3]
l2 = [4,5,6]

a1 = np.array(l1)
a2 = np.array(l2)

dot = 0

for i in range(len(l1)):
    dot += l1[i] * l2[i]

print(dot)

dot2 = np.dot(a1, a2)

print(dot2)

dot3 = a1 * a2
print(np.sum(dot3))
print(dot3.sum())
print(a1 @ a2)

