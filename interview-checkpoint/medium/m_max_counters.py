import unittest

def solution(A, N):
    counters = [0] * N
    current_max = 0
    last_update = 0     

    for num in A:
        if 1 <= num <= N:
            if counters[num - 1] < last_update:
                counters[num - 1] = last_update
            counters[num - 1] += 1
            current_max = max(current_max, counters[num - 1])
        else:
            last_update = current_max
        
    counters = [max(last_update, counter) for counter in counters]

    return counters

def solution_b(A, N):
    counters = [0] * N
    max_counter = 0
    for num in A:
        if num > N:
            counters = [max_counter] * N
        else:
            counters[num - 1] += 1
            max_counter = max(max_counter, counters[num - 1])
    return counters

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([3, 4, 4, 6, 1, 4, 4], 5), [3, 2, 2, 4, 2])

    def test_large_numbers(self):
        self.assertEqual(solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10), [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])

    def test_empty_array(self):
        self.assertEqual(solution([], 5), [0, 0, 0, 0, 0])




# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([3, 4, 4, 6, 1, 4, 4], 5))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)