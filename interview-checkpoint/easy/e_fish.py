import unittest


def solution(A, B):
    N = len(A)

    max_ltr = float('-inf')
    alive_rtl = 0

    for i in range(N):
        if B[i] == 0:
            if A[i] > max_ltr:
                max_ltr = float('-inf')
                alive_rtl += 1
        else:
            max_ltr = max(max_ltr, A[i])
    
    max_rtl = float('-inf')
    alive_ltr = 0

    for i in range(N-1, -1, -1):
        if B[i] == 1:
            if A[i] > max_rtl:
                max_rtl = float('-inf')
                alive_ltr += 1
        else:
            max_rtl = max(max_rtl, A[i])
    
    return alive_ltr + alive_rtl

    

def solution_b(A, B):
    stack = []
    alive = 0

    for i in range(len(A)):
        if B[i] == 1:
            stack.append(A[i])
        else:
            while stack and stack[-1] < A[i]:
                stack.pop()
            if not stack:
                alive += 1
    
    return alive + len(stack)

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([6, 4, 5, 3], [1, 1, 0, 0]), 1)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([6, 4, 5, 3], [1, 1, 0, 0]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
