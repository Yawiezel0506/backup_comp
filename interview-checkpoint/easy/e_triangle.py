import unittest

def solution(A):
    length = len(A)
    if length < 3:
        return 0
    A.sort()
    
    for i in range(length - 2):
        a, b, c = A[i], A[i+1], A[i+2]
        if a + b > c:
            return 1
    
    return 0

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([10, 2, 5, 1, 8, 20]), 1)

    def test_negative_numbers(self):
        self.assertEqual(solution([-3, -1, -2, -2, -5, -6]), 0)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([10, 2, 5, 1, 8, 20]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
