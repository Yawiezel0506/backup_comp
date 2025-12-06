import unittest

def solution(X: int, Y: int, D: int):
    distance = Y - X
    ratio = distance // D
    rest = distance % D
    jumps = ratio if rest == 0 else ratio + 1 
    return jumps

import math

def solution_b(X: int, Y: int, D: int) -> int:
    return math.ceil((Y - X) / D)

def solution_c(X: int, Y: int, D: int) -> int:
    return (Y - X + D - 1) // D

# class TestSolution(unittest.TestCase):

    # def test_example_case(self):
    #     self.assertEqual(solution(), None)

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
    print("Example run:", solution(10, 101, 30))  # תחליף בקלטים רלוונטיים

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
