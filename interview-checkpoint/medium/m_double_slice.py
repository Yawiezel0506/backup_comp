import unittest
from typing import List

def solution(A: List[int]):
    N = len(A)
    if N < 3:
        return 0
    
    # יצירת שני מערכים לסכומים חלקיים
    max_ending_here = [0] * N
    max_starting_here = [0] * N

    # מעבר קדימה: סכום מצטבר מ-0 עד Y-1
    for i in range(1, N - 1):
        max_ending_here[i] = max(0, max_ending_here[i - 1] + A[i])

    # מעבר אחורה: סכום מצטבר מ-N-1 עד Y+1
    for i in range(N - 2, 0, -1):
        max_starting_here[i] = max(0, max_starting_here[i + 1] + A[i])

    # חישוב מקסימום סכום של Double Slice
    max_double_slice = 0
    for Y in range(1, N - 1):
        max_double_slice = max(max_double_slice, max_ending_here[Y - 1] + max_starting_here[Y + 1])

    return max_double_slice

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([3, 2, 6, -1, 4, 5, -1, 2]), 17)

    def test_small_array(self):
        self.assertEqual(solution([1, 2]), 0)

    def test_negative_values(self):
        self.assertEqual(solution([-1, -2, -3, -4]), 0)

    def test_large_values(self):
        self.assertEqual(solution([1000, 1000, 1000, 1000]), 3000)

    def test_large_values(self):
        self.assertEqual(solution([1000, 1000, 1000, 1000]), 3000)




# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution())  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
