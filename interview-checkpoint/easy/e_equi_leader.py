import unittest
from typing import List

def solution(A: List[int]) -> int:
    N = len(A)
    if N <= 1:
        return 0

    # שלב 1: מציאת מועמד פוטנציאלי
    candidate, count = None, 0
    for num in A:
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count += 1
        else:
            count -= 1
    
    # שלב 2: אימות - בדיקה אם הוא באמת דומינייטור
    total_count = A.count(candidate)
    if total_count <= N // 2:
        return 0
    
    # שלב 3: חישוב Equi Leaders
    equi_count = 0
    left_count = 0
    
    for i, num in enumerate(A):
        if num == candidate:
            left_count += 1
        
        left_size = i + 1
        right_size = N - left_size

        if left_count > left_size // 2 and (total_count - left_count) > right_size // 2:
            equi_count += 1
    
    return equi_count


class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([4,3,4,4,4,2]), 2)





# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([4,3,4,4,4,2])) 
    print("Example run:", solution([1,2,3,4,5]))
    print("Example run:", solution([0]))
    print("Example run:", solution([1, 1]))
    print("Example run:", solution([1,1, 1, 1, 1]))
    print("Example run:", solution([1,2, 3, 4, 4, 4, 4]))
    print("Example run:", solution([1,2, 3, 4, 4, 4, 4, 4]))

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
