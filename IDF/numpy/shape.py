import numpy as np

a = np.array([[1, 2], [3, 4]])

print(a.shape)
print(a)
print(a[0, 1])
print(a[:, 1])
print(a[1, :])
print(a.T)
a_inv = np.linalg.inv(a)
print(a_inv)
identity = np.dot(a, a_inv)
print(identity)

print(np.diag(a))
