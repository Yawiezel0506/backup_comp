import unittest

def solution(A):
    N = len(A)
    min_avg = float('inf')
    min_avg_index = 0

    for i in range(N - 1):
        temp_sum = A[i] + A[i + 1]
        temp_avg = temp_sum / 2
        if temp_avg < min_avg:
            min_avg = temp_avg
            min_avg_index = i
        
        if i < N - 2:
            temp_sum = temp_sum + A[i + 2]
            temp_avg = temp_sum / 3
            if temp_avg < min_avg:
                min_avg = temp_avg
                min_avg_index = i

    return min_avg_index

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([4, 2, 2, 5, 1, 5, 8]), 1)

    def test_single_element(self):
        self.assertEqual(solution([10]), 0)

    def test_negative_numbers(self):
        self.assertEqual(solution([-1, -2, -3, -4]), 2)

    def test_large_numbers(self):
        self.assertEqual(solution([1000000, 1000000]), 0)

    def test_large_array(self):
        self.assertEqual(solution([1] * 100000), 0)
        



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([4, 2, 2, 5, 1, 5, 8]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
