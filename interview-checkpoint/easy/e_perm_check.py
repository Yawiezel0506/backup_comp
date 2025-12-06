import unittest

def solution(A):
    N = len(A)
    seen = [False] * N
    
    for num in A:
        if num < 1 or num > N:
            return 0
        if seen[num - 1]:
            return 0
        seen[num - 1] = True
        
    return 1

def solution_b(A):
    N = len(A)
    return 1 if set(A) == set(range(1, N + 1)) else 0

def solution_c(A):
    return int(set(A) == set(range(1, len(A) + 1)))

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([4, 1, 3, 2]), 1)
        self.assertEqual(solution([4, 1, 3]), 0)
        self.assertEqual(solution([1, 4, 1]), 0)
        self.assertEqual(solution([1]), 1)
        self.assertEqual(solution([2]), 0)
        self.assertEqual(solution([1, 2, 3, 4, 5]), 1)
        self.assertEqual(solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 1)


# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([4, 1, 3, 2]))
    print("Example run:", solution([4, 1, 3]))
    print("Example run:", solution([1, 4, 1]))
    print("Example run:", solution([1]))
    print("Example run:", solution([2]))
    print("Example run:", solution([1, 2, 3, 4, 5]))
    print("Example run:", solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
      

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)