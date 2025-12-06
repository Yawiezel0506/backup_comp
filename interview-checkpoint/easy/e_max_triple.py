import unittest
import heapq

def solution(A):
    max_a = max_b = max_c = float('-inf')
    min_a = min_b = float('inf')
    
    for num in A:
        if num > max_a:
            max_c = max_b
            max_b = max_a
            max_a = num
        elif num > max_b:
            max_c = max_b
            max_b = num
        elif num > max_c:
            max_c = num
        
        if num < min_a:
            min_b = min_a
            min_a = num
        elif num < min_b:
            min_b = num

    fisrt_option = max_a * max_b * max_c
    second_option = min_a * min_b * max_a
    absolute_max = max(fisrt_option, second_option)
    return absolute_max

def solution(A):
    top3 = heapq.nlargest(3, A) 
    bottom2 = heapq.nsmallest(2, A) 

    fisrt_option = top3[0] * top3[1] * top3[2]
    second_option = bottom2[0] * bottom2[1] * top3[0]

    result = max(fisrt_option, second_option)
    return result

class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution([-3, 1, 2, -2, 5, 6]), 60)
        self.assertEqual(solution([-3, 1, 2, -2, 5, 6, -1]), 60)

    def test_negative_numbers(self):
        self.assertEqual(solution([-3, -1, -2, -2, -5, -6]), -4)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([-3, 1, 2, -2, 5, 6]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
