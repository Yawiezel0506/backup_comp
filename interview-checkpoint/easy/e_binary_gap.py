import unittest

def solution(N):
    if not isinstance(N, int): 
        return
    # Implement your solution here
    binary = bin(N)[2:]
    max_gap = 0
    current_gap = 0
    active = False

    for digit in binary:
        if digit == '1':
            if active:
                max_gap = max(max_gap, current_gap)
                current_gap = 0
            else:
                active = True
        elif active:
            current_gap += 1
    
    return max_gap

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution(2), 0)

    # def test_edge_case_empty(self):
    #     self.assertEqual(solution(), None)

    # def test_edge_case_large(self):
    #     self.assertEqual(solution(), None)

    # תוסיף עוד בדיקות לפי מקרי קצה


# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution(10))  # תחליף בקלטים רלוונטיים

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
