import unittest

def solution(blocks):
    if not blocks:
        return 0

    n = len(blocks)

    # Step 1: חישוב קפיצות ימינה
    right_jumps = [0] * n
    for i in range(n - 2, -1, -1):
        if blocks[i] >= blocks[i + 1]:
            right_jumps[i] = right_jumps[i + 1] + 1

    # Step 2: חישוב קפיצות שמאלה
    left_jumps = [0] * n
    for i in range(1, n):
        if blocks[i] >= blocks[i - 1]:
            left_jumps[i] = left_jumps[i - 1] + 1

    # Step 3: מציאת המרחק המקסימלי
    max_distance = max(left_jumps[i] + right_jumps[i] + 1 for i in range(n))

    return max_distance

class TestSolution(unittest.TestCase):
    def test_empty_input(self):
        self.assertEqual(solution([]), 0)
        
    def test_single_block(self):
        self.assertEqual(solution([1]), 1)
        
    def test_increasing_blocks(self):
        self.assertEqual(solution([1, 2, 3, 4, 5]), 5)
        
    def test_decreasing_blocks(self):
        self.assertEqual(solution([5, 4, 3, 2, 1]), 5)
        
    def test_mixed_blocks(self):
        self.assertEqual(solution([2, 6, 8, 5]), 3)
        
    def test_equal_blocks(self):
        self.assertEqual(solution([1, 1, 1, 1]), 4)

# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # Example runs
    print("Empty input:", solution([]))
    print("Single block:", solution([1]))
    print("Increasing blocks:", solution([1, 2, 3, 4, 5]))
    print("Decreasing blocks:", solution([5, 4, 3, 2, 1]))
    print("Mixed blocks:", solution([2, 6, 8, 5]))
    print("Equal blocks:", solution([1, 1, 1, 1]))

    # Run tests
    unittest.main(argv=[''], exit=False)