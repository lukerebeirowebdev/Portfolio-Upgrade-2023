// Countdown timer
const countdown = () => {
    const launchDate = new Date("December 31st , 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = Math.floor(hours).toString().padStart(2, "0");
    document.getElementById("minutes").innerText = Math.floor(minutes).toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
};

setInterval(countdown, 1000);

// Create more floating pixels dynamically
for (let i = 0; i < 20; i++) {
    const pixel = document.createElement("div");
    pixel.className = "floating-pixel";
    pixel.style.left = Math.random() * 100 + "%";
    pixel.style.animationDelay = Math.random() * 20 + "s";
    pixel.style.animationDuration = 10 + Math.random() * 20 + "s";
    pixel.style.width = 5 + Math.random() * 10 + "px";
    pixel.style.height = 5 + Math.random() * 10 + "px";
    document.body.appendChild(pixel);
}