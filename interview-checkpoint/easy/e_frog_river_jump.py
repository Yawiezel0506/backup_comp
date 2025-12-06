import unittest

def solution(X, A):
    positions = set()
    
    for i, leaf_pos in enumerate(A):
        if 1 <= leaf_pos <= X:
            positions.add(leaf_pos)
            if len(positions) == X:
                return i
                
    return -1


def solution_b(X, A):
    seen = [False] * (X + 1)  
    uncovered = X  

    for i, pos in enumerate(A):
        if 1 <= pos <= X and not seen[pos]:
            seen[pos] = True
            uncovered -= 1
            if uncovered == 0:
                return i
    return -1


# class TestSolution(unittest.TestCase):

#     def test_example_case(self):
#         self.assertEqual(solution(), None)

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
    print("Example run:", solution([1, 2, 3, 4], 4)) 
    print("Example run:", solution([1, 2, 3, 3], 4))  
    print("Example run:", solution([1, 2, 3, 1, 1, 4, 2, 3], 4))   

    # הרצת טסטים
    # unittest.main(argv=[''], exit=False)