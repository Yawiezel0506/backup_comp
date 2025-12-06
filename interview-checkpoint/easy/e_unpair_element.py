from typing import List
import unittest

def solution(arr: List[int]) -> int:
    pairs_counter = {}
    for num in arr:
        str_num = str(num)
        if str_num in pairs_counter:
            del pairs_counter[str_num]
        else:
            pairs_counter[str_num] = num
    
    return next(iter(pairs_counter.values()), None)

def solution_b(arr: List[int]) -> int:
    result = 0
    for num in arr:
        result ^= num
    
    return result

def solution_c(arr: List[int]) -> int:
    seen = set() 
    for num in arr:
        if num in seen:
            seen.remove(num) 
        else:
            seen.add(num)
    return seen.pop()  

from collections import Counter

def solution_d(arr):
    count = Counter(arr)
    for num, freq in count.items():
        if freq == 1:
            return num

# class TestSolution(unittest.TestCase):

    # def test_example_case(self):
    #     self.assertEqual(solution([1, 3, 5, 3, 1, 5, 7, 9, 9]), 7)

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
    print("Example run:", solution([1, 3, 5, 3, 1, 5, 7, 9, 9]))  # תחליף בקלטים רלוונטיים

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)