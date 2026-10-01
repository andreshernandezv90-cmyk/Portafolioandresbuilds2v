// GAME OVER page: CONTINUE? countdown + jokes when you keep pressing NO.
(function () {
  var jokes = [
    'ARE YOU SURE?',
    'REALLY SURE?',
    'THE PRINCESS IS NOT HERE EITHER.',
    'OK... BUT THE ARCADE MISSES YOU.',
    'YOU CAN\'T SAY NO FOREVER.',
    'FINE. THE YES BUTTON IS RIGHT THERE.',
    'INSERT COIN TO KEEP SAYING NO.'
  ];
  var n = 0, c = 9, joke = document.getElementById('joke'), count = document.getElementById('count');
  document.getElementById('no').addEventListener('click', function () {
    joke.textContent = jokes[Math.min(n, jokes.length - 1)];
    n++;
    if (n >= jokes.length) { document.getElementById('no').textContent = 'NO (?)'; }
  });
  var t = setInterval(function () {
    c--; count.textContent = c;
    if (c <= 0) { clearInterval(t); count.textContent = '0'; joke.textContent = 'CONTINUE? ...STILL HERE. PRESS YES.'; }
  }, 1000);
})();
