import unittest
from typing import List

def solution(A: List[int]):
    max_profit = 0
    min_price = float('inf')
    
    for price in A:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([23171, 21011, 21123, 21366, 21013, 21367]), 356)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([23171, 21011, 21123, 21366, 21013, 21367]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
