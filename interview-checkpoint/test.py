from typing import List
import unittest

# =========================================
# 🔧 הפונקציה הראשית שאתה צריך לממש
# =========================================

CARDS_CONVERT = {
    "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7,
    "9": 8, "10": 9, "J": 10, "Q": 11, "K": 12, "A": 13
}

VAL_CONVERT = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

SYMBOL_CONVERT = {
    "B": 1, "C": 2, "D": 3, "E": 4
}

SYM_VAL_CONVERT = ["B", "C", "D", "E"]
def solution(cards):
    """
    פתרון לשאלה:
    [הכנס כאן תיאור קצר של הבעיה אם צריך]

    :param input_data: [תיאור סוג הקלט]
    :return: [תיאור הפלט הנדרש]
    """
    
    # שלב 1: ניתוח הקלט
    # [לדוגמה: בדיקה אם הקלט ריק, או הכנת מבנים מתאימים]

    # שלב 2: פסאודו-קוד או לוגיקה
    # - [שלב א]
    # - [שלב ב]
    # - [שלב ג]

    # שלב 3: החזרת תוצאה
    result = []
    type = 5
    
    two = []
    three = []
    val_five = []
    shape_five = []
    
    converted_cards = [(CARDS_CONVERT[card[0]], SYMBOL_CONVERT[card[1]]) for card in cards]
    sorted_cards = sorted(converted_cards, key=lambda card: card[0], reverse=True)

    single = VAL_CONVERT[sorted_cards[0][0]-1]+SYM_VAL_CONVERT[sorted_cards[0][1]-1]
    
    print(sorted_cards)
    print(single)
    for card in converted_cards:
        val, shape = card
        
        if val_five and val_five[-1][0] - val == 1:
            val_five.append(card)
            type = 1
            result = val_five
            break
        val_five = []
        if not len(val_five) == 5:
            if not shape_five or shape_five[-1][1] == shape:
                shape_five.append(card)
                if len(shape_five) == 5:
                    type = 2
                    result = shape_five
            else:
                shape_five = []
        if not len(val_five) >= 5:
            if len(three) == 3:
                pass
                # if 
                
        
        
        
        
        
    
    return None


# =========================================
# 🧪 בדיקות עם unittest (לא חובה אבל מומלץ)
# =========================================
class TestSolution(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(solution(["2C", "AB", "QD"]), None)

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
    print("Example run:", solution(["2C", "AB", "QD"]))  # תחליף בקלטים רלוונטיים

    # הרצת טסטים
    unittest.main(argv=[''], exit=False)
