from typing import List
import unittest


def solution(arr: List[int], k: int) -> List[int]:
    arr_length = len(arr)
    opt_k = k % arr_length
    
    first_part, second_part = arr[:-opt_k], arr[-opt_k:]
    combined_arrays = second_part + first_part
    
    return combined_arrays

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([1, 2, 3, 4], 1), [4, 1, 2, 3])

    def test_edge_case_empty(self):
        self.assertEqual(solution([1, 2, 3, 4], 5), [4, 1, 2, 3])

    # def test_edge_case_large(self):
    #     self.assertEqual(solution(), None)

    # תוסיף עוד בדיקות לפי מקרי קצה


# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([1, 2, 3, 4], 1))  # תחליף בקלטים רלוונטיים

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
