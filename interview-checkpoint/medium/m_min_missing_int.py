import unittest

def solution(A):
    N = len(A)
    counter = [False] * N
    for num in A:
        if 1 <= num <= N:
            counter[num - 1] = True
    
    for i in range(N):
        if not counter[i]:
            return i + 1
    
    return N + 1

class TestSolution(unittest.TestCase):
    def test_example_case(self):
        self.assertEqual(solution([1, 2, 3, 4]), 5)

    def test_empty_array(self):
        self.assertEqual(solution([]), 1)

    def test_negative_numbers(self):
        self.assertEqual(solution([-1, -3, 0, -2]), 1)

    def test_mixed_numbers(self):
        self.assertEqual(solution([1, 3, 6, 4, 1, 2]), 5)

    def test_single_number(self):
        self.assertEqual(solution([2]), 1)

    def test_consecutive_numbers(self):
        self.assertEqual(solution([2, 3, 4, 5]), 1)

    def test_large_numbers(self):
        self.assertEqual(solution([1000, 2000, 3000]), 1)

if __name__ == "__main__":
    print("Example run:", solution([1, 2, 3, 4]))  
    unittest.main(argv=[''], exit=False)
