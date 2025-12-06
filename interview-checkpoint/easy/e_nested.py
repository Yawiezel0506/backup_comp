import unittest

def solution(S):
    if len(S) == 0:
        return 1
    counter = 0
    for ch in S:
        if ch == "(":
            counter += 1
        elif ch == ")":
            counter -= 1
            if counter < 0:
                return 0
    
    return int(counter == 0)
    
class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution("()"), 1)

    def test_empty_string(self):
        self.assertEqual(solution(""), 1)

    def test_nested_string(self):
        self.assertEqual(solution("(())"), 1)

    def test_unbalanced_string(self):
        self.assertEqual(solution("(()"), 0)

    def test_unbalanced_string_2(self):
        self.assertEqual(solution(")("), 0)




# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution("()"))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
