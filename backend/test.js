const calculateWinnings = (wager, odds) => {
  if (odds > 0) {
    const winnings = ((wager * odds) / 100).toFixed(2);
    const x = (parseFloat(winnings) + wager).toFixed(2);
    console.log(x);
  } else if (odds < 0) {
    const winnings = ((wager * 100) / Math.abs(odds)).toFixed(2);
    const x = (parseFloat(winnings) + wager).toFixed(2);
    console.log(x);
  } else {
    return 0; // No profit or loss with even odds (odds = 0)
  }
};

calculateWinnings(20, -120);
