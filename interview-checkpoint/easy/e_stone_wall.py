import unittest

def solution(H):
    stack = []
    blocks = 0

    for num in H:
        while stack and stack[-1] > num:
            stack.pop()
            blocks += 1
        if not stack or stack[-1] != num:
            stack.append(num)
    
    blocks += len(stack)
    return blocks

# class TestSolution(unittest.TestCase):

#     def test_example_case(self):
#         self.assertEqual(solution(), None)



# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution([8,8,5,7,9,8,7,4,8]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
