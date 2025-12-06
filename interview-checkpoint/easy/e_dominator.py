import unittest

def solution(A):
    N = len(A)
    if N == 0:
        return -1

    candidate, count = None, 0

    for num in A:
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count += 1
        else:
            count -= 1
    
    occurrence = 0
    for num in A:
        if num == candidate:
            occurrence += 1

    if occurrence > N // 2:
        return A.index(candidate)
    
    return -1

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([3,4,3,2,3,-1,3,3]), 0)

    def test_empty_array(self):
        self.assertEqual(solution([]), -1)

    def test_no_dominator(self):
        self.assertEqual(solution([1,2,3,4,5]), -1)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([3,4,3,2,3,-1,3,3]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
