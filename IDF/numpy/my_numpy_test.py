import numpy as np

a = np.array([1, 2, 3, 4])

print(a) 
print(a.shape) 
print(a.dtype)
print(a.ndim)
print(a.size)
print(a.itemsize)

print(a[3])

a[0] = 10

print(a)

b = a * np.array([2,0,2,2])
print(b)

l = [1,2,3]
npa = np.array([1,2,3])

print(l, npa)

l.append(1)
print(l)

l = l + [1,2,3]
print(l)

npa = npa + np.array([4]) #np.broadcast
print(npa)

npa = npa * 2 #np.broadcast
print(npa)

npa = np.sqrt(npa)
print(npa)
