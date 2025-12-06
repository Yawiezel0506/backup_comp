import unittest

def solution(S):
    if len(S) == 0:
        return 1
    stack = []

    starts = '({['
    ends = ')}]'

    pairs = {'}': '{', ')': '(', ']': '['}

    for char in S:
        if char in starts:
            stack.append(char)
        elif char in ends:
            if not stack or stack[-1] != pairs[char]:
                return 0
            stack.pop()
    
    return 1 if not stack else 0

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution("([)()]"), 0)
        self.assertEqual(solution("{[()()]}"), 1)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution("([)()]")) 
    print("Example run:", solution("{[()()]}"))   

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
