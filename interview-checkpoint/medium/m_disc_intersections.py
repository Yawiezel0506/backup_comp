import unittest

def solution(A):
    N = len(A)
    start = [i - A[i] for i in range(N)]
    end = [i + A[i] for i in range(N)]

    start.sort()
    end.sort()

    intersections = 0
    j = 0 
    
    for i in range(N):
        while j < N and start[j] <= end[i]:
            j += 1
        intersections += j - i - 1
        if intersections > 10_000_000:
            return -1

    return intersections

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([1, 5, 2, 1, 4, 0]), 11)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([1, 5, 2, 1, 4, 0]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
