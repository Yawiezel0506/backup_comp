const solution = (CARDS: string[]) => {
    const suits = {"W": 0, "E": 1, "R": 2, "T": 3}
    const ranks = {
        "2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "10": 8, "J": 9, 
        "Q": 10, "K": 11, "A": 12
    }

    const suitsCounter: string[][] = Array(4).fill(null).map(() => []);
    const ranksCounter: string[][] = Array(13).fill(null).map(() => []);
    
    CARDS.forEach((card: string) => {
        const suit = card.slice(-1);             // Last character is suit
        const rank = card.slice(0, -1);          // Rest is rank

        const suitIDX = suits[suit];
        const rankIDX = ranks[rank];
        suitsCounter[suitIDX].push(card);
        ranksCounter[rankIDX].push(card);
    })

    let tripleIdx = -1
    let pairIdx = -1;

    for (let i = 12; i >= 0; i--) {
        if (ranksCounter[i].length >= 3) {
            tripleIdx = i;
            break;
        }
    }
    for (let i = 12; i >= 0; i--) {
        if (ranksCounter[i].length >= 2) {
            if (i === tripleIdx) continue; 
            pairIdx = i;
            break;
        }
    }

    if (tripleIdx !== -1 && pairIdx !== -1) {
        return {
            "type": "Full House",
            "cards": [...ranksCounter[tripleIdx].slice(0, 3), ...ranksCounter[pairIdx].slice(0, 2)]
        }
    }

    for (let i = 3; i >= 0; i--) {
        if (suitsCounter[i].length >= 5) {
            return {
                "type": "Flush",
                "cards": suitsCounter[i].slice(0, 5)
            }
        }
    
    let counterRow = 0;
    for (let i = 12; i >= 0; i--) {
        if (ranksCounter[i].length > 0) {
            counterRow++;
        } else {
            counterRow = 0;
        }
        if (counterRow >= 5) {
            const startIdx = i + 1;
            return {
                "type": "Straight",
                "cards": ranksCounter.slice(startIdx, startIdx + 5).flat()
            }
        }
    }

    if (tripleIdx !== -1) {
        return {
            "type": "Three of a Kind",
            "cards": ranksCounter[tripleIdx].slice(0, 3)
        }
    }
    if (pairIdx !== -1) {
        return {
            "type": "Pair",
            "cards": ranksCounter[pairIdx].slice(0, 2)
        }
    }

    for (let i = 12; i >= 0; i--) {
        if (ranksCounter[i].length > 0) {
            return {
                "type": "High Card",
                "cards": ranksCounter[i].slice(0, 1)
            }
        }
    }
    }
}

solution(["2W", "3E", "4R", "5T", "6W", "7E", "8R", "9T", "10W", "JW", "QW", "KW", "AW"]);