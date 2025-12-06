import unittest

def solution(A, B, K):
    all_div = B // K
    non_relevant_div = (A - 1) // K
    return all_div - non_relevant_div

    

    

class TestSolution(unittest.TestCase):
    def test_example_case(self):
        self.assertEqual(solution(6, 11, 2), 3)

    def test_large_numbers(self):
        self.assertEqual(solution(1, 1000000000, 1), 1000000000)

    def test_single_number(self):
        self.assertEqual(solution(1, 1, 1), 1)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution(6, 11, 2))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)