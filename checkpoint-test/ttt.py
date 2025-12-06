import asyncio
import edge_tts

VOICE = "he-IL-AviNeural"
OUTPUT_PATH = "output.mp3"

TEXT = """
אלתר ספרים שלום.
שעות פעילות החנות בימים א׳ עד ה׳ בין השעות 9:00 עד 23:00 בלילה.
ביום ו׳ בין השעות 9:00 עד 13:00.
לחנות הקש 1.
למשרד והזמנות, מענה בין השעות 10:00 עד 17:00 – הקש 2.
להנהלת חשבונות ומוסדות, מענה בין השעות 9:00 עד 14:00 – הקש 3.
"""

async def generate_tts(text, output_path, voice):
    communicate = edge_tts.Communicate(text=text, voice=voice)
    await communicate.save(output_path)

if __name__ == "__main__":
    asyncio.run(generate_tts(TEXT, OUTPUT_PATH, VOICE))
