import unittest

def solution(arr):
    n = len(arr)
    counter = [0] * (n + 1)
    for num in arr:
        counter[num - 1] = 1
    miss_num = counter.index(0) + 1
    
    return miss_num

def solution_b(arr):
    n = len(arr) + 1
    full_sum = n * (n + 1) // 2
    arr_sum = sum(arr)
    miss_num = full_sum - arr_sum
    return miss_num

def solution_c(A):
    n = len(A)
    full_set = set(range(n + 2))  # כל המספרים מ-1 עד N+1
    return (full_set - set(A)).pop()

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
    print("Example run:", solution([2, 3, 1, 5]))  # תחליף בקלטים רלוונטיים
    print("Example run:", solution([2, 3, 1, 4]))  
    
    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
