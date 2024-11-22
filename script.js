const dice = document.getElementById("dice");
const adviceNum = document.getElementById("advice-number");
const adviceText = document.querySelector(".advice-text");

window.onload = showQuote;

dice.addEventListener("click", showQuote);

function showQuote() {
    fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then((data) => data.slip)
        .then((data) => {
            adviceNum.textContent = data.id;
            adviceText.textContent = data.advice;
        })
        .catch((error) => {
            console.error(`Error fetching advice: ${error}`); // Log error for debugging
            alert("Failed to retrieve advice. Please check your internet connection."); // User-friendly message
        });
}

setInterval(() => {
    // Target date
    const targetDate = new Date(2024, 4, 5); // Month is 0-indexed, so 4 for May

    // Calculate time difference
    const now = new Date();
    const difference = targetDate - now;

    // Get time components in a user-friendly format
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Set time and labels (using correct IDs from the HTML)
    document.getElementById('days').innerHTML = days + ' Days';
    document.getElementById('hours').innerHTML = hours + ' Hours';
    document.getElementById('minutes').innerHTML = minutes + ' Minutes';
    document.getElementById('seconds').innerHTML = seconds + ' Seconds';

    // Update circular indicators and dots (using correct IDs from the HTML)
    const dd = document.getElementById('dd');
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');
    const dotD = document.querySelector('.h_dot'); // Assuming a single class for days dots

    dd.style.strokeDashoffset = 440 - (440 * days) / 30; // Adjust for 30 days in a month
    hh.style.strokeDashoffset = 440 - (440 * hours) / 12;
    mm.style.strokeDashoffset = 440 - (440 * minutes) / 60;
    ss.style.strokeDashoffset = 440 - (440 * seconds) / 60;

    dotD.style.transform = `rotate(${days * 12}deg)`; // Adjust rotation for days
}, 1000);
