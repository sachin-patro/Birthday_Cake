document.getElementById('show-cake-button').addEventListener('click', function() {
    this.style.display = 'none'; // Hide the button after it's clicked
    document.getElementById('birthday-cake').classList.remove('hidden');
    document.getElementById('confetti-canvas').classList.remove('hidden');

    const confettiCanvas = document.getElementById('confetti-canvas');
    const myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

    const duration = 15 * 1000; // Duration of confetti in milliseconds
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 100; // Increased particle count for more confetti

        // Generate confetti from random positions across the entire screen
        myConfetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) }
        }));
    }, 250);

    // Stop the confetti and hide the canvas when clicked
    confettiCanvas.addEventListener('click', function() {
        clearInterval(interval);
        myConfetti.reset();
        confettiCanvas.classList.add('hidden');
    });

    setTimeout(function() {
        document.getElementById('birthday-cake').classList.add('show-cake');
    }, 100);
});
