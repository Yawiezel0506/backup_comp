import unittest

def solution(S, P, Q):
    N = len(S)
    M = len(P)
    CONVERT = {'A': 1, 'C': 2, 'G': 3, 'T': 4}

    a_sum = [0] * (N + 1)
    c_sum = [0] * (N + 1)
    g_sum = [0] * (N + 1)

    a_count = 0
    c_count = 0
    g_count = 0

    for i in range(N):
        if S[i] == 'A':
            a_count += 1
        elif S[i] == 'C':
            c_count += 1
        elif S[i] == 'G':
            g_count += 1


        a_sum[i + 1] = a_count
        c_sum[i + 1] = c_count
        g_sum[i + 1] = g_count
    
    result = [0] * M
    for i in range(M):
        start, end = P[i], Q[i]
        has_a = CONVERT['A'] if a_sum[end +1] - a_sum[start] > 0 else CONVERT['T']
        has_c = CONVERT['C'] if c_sum[end +1] - c_sum[start] > 0 else CONVERT['T']
        has_g = CONVERT['G'] if g_sum[end +1] - g_sum[start] > 0 else CONVERT['T']

        min_include = min(has_a, has_c, has_g)
        result[i] = min_include
    
    return result

class TestSolution(unittest.TestCase):
    def test_example_case(self):        
        self.assertEqual(solution("CAGCCTA", [2, 5, 0], [4, 5, 6]), [2, 4, 1])

    def test_empty_string(self):
        self.assertEqual(solution("", [0], [0]), [])

    def test_no_changes(self):
        self.assertEqual(solution("AAAA", [0, 1, 2, 3], [0, 1, 2, 3]), [1, 1, 1, 1])




# =========================================
# 🚀 הרצה ידנית עם דוגמאות
# =========================================
if __name__ == "__main__":
    # ניתן לבדוק כאן דוגמאות במהירות
    print("Example run:", solution("CAGCCTA", [2, 5, 0], [4, 5, 6]))  

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
