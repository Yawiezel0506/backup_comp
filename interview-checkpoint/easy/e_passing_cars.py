import unittest

def solution(A):
    total = 0
    ratio = 0
    for num in A:
        if num == 0:
            ratio += 1
        else:
            total += ratio
            if total > 1_000_000_000:
                return -1
    
    return total

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([0, 1, 0, 1, 1]), 5)

    def test_large_numbers(self):
        self.assertEqual(solution([0] * 100_000), 0)
        self.assertEqual(solution([1] * 100_000), 0)

    def test_single_zero(self):
        self.assertEqual(solution([0]), 0)

    def test_single_one(self):
        self.assertEqual(solution([1]), 0)




# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([0, 1, 0, 1, 1]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)