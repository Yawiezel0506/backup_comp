import unittest

def solution(A):
    distinct = set(A)
    count_distinct = len(distinct)
    return count_distinct

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([1, 2, 3]), 3)
        self.assertEqual(solution([1, 2, 2, 3]), 3)
        self.assertEqual(solution([1, 2, 2, 3, 3, 3]), 3)       



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([1, 2, 3]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)