import unittest

# The way to find the minimal difference between the sum of the two parts of the array

def solution(a):
    if not a or len(a) <= 1:
        return None
    full_sum = sum(a)
    left = 0
    min_dif = float('inf')
    
    for i in range(len(a)-1):
        num = a[i]
        left += num
        right = full_sum - left
        dif = abs(right - left)
        min_dif = min(min_dif, dif)
    
    return min_dif

def solution_b(A):
    total = sum(A)
    left_sum = 0
    min_diff = float('inf')

    for i, val in enumerate(A[:-1]): 
        left_sum += val
        right_sum = total - left_sum
        diff = abs(left_sum - right_sum)
        min_diff = min(min_diff, diff)

    return min_diff

from functools import reduce

def solution_c(A):
    total = sum(A)
    left_sum = 0

    def reducer(acc, val):
        nonlocal left_sum
        left_sum += val
        right_sum = total - left_sum
        diff = abs(left_sum - right_sum)
        return min(acc, diff)

    return reduce(reducer, A[:-1], float('inf'))

        
# class TestSolution(unittest.TestCase):

#     def test_example_case(self):
#         self.assertEqual(solution(), None)

    # def test_edge_case_empty(self):
    #     self.assertEqual(solution(), None)

    # def test_edge_case_large(self):
    #     self.assertEqual(solution(), None)

    # תוסיף עוד בדיקות לפי מקרי קצה


# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([3, 1, 2, 4, 3]))  
    print("Example run:", solution([1])) 
    print("Example run:", solution([1, 2])) 


    # הרצת טסטים
    # unittest.main(argv=[''], exit=False)
