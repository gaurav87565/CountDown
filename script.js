const JSONBIN_API_KEY = "$2a$10$H3NJAZGCNj9t0l/Wz4IZVOUWviXLrYjHod96jTZMMbU5Gf4zdzv0W";
const JSONBIN_URL = "https://api.jsonbin.io/v3/b";

// Function to fetch and display countdown
async function displayCountdown() {
		const urlParams = new URLSearchParams(window.location.search);
		const countdownId = urlParams.get("id");

		if (!countdownId) {
				showInvalidCountdown();
				return;
		}

		try {
				console.log("Fetching countdown with ID:", countdownId);

				const response = await fetch(`${JSONBIN_URL}/${countdownId}`, {
						headers: {
								"X-Master-Key": JSONBIN_API_KEY,
						},
				});

				if (!response.ok) {
						throw new Error("Countdown not found.");
				}

				const data = await response.json();
				console.log("Fetched countdown data:", data);

				const countdownData = data.record;

				if (!countdownData || !countdownData.name || isNaN(countdownData.date)) {
						showInvalidCountdown();
						return;
				}

				// Set event name
				document.getElementById("countdown-title").innerText = `⏳ ${countdownData.name}`;

				function updateTimer() {
						let now = new Date().getTime();
						let distance = countdownData.date - now;

						if (distance <= 0) {
								document.getElementById("timer").innerText = "🎉 Event Started!";
								clearInterval(countdownInterval);
								return;
						}

						let days = Math.floor(distance / (1000 * 60 * 60 * 24));
						let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						let seconds = Math.floor((distance % (1000 * 60)) / 1000);

						document.getElementById("timer").innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
				}

				// Run every second
				let countdownInterval = setInterval(updateTimer, 1000);
				updateTimer();

		} catch (error) {
				console.error("Error fetching countdown:", error);
				showInvalidCountdown();
		}
}

// Function to show invalid countdown message
function showInvalidCountdown() {
		document.getElementById("countdown-title").innerText = "❌ Invalid Countdown";
		document.getElementById("timer").innerText = "⏳ No valid event found!";
}

// Run displayCountdown only if we are on countdown.html
if (window.location.pathname.includes("countdown.html")) {
		document.addEventListener("DOMContentLoaded", displayCountdown);
}

document.addEventListener("DOMContentLoaded", () => {
		const burger = document.querySelector(".burger-menu");
		const mobileNav = document.getElementById("mobileNav");

		if (burger && mobileNav) {
				burger.addEventListener("click", () => {
						mobileNav.classList.toggle("show");
				});
		} else {
				console.error("Error: Burger menu or mobile navigation not found.");
		}
});

function toggleMenu() {
		const mobileNav = document.querySelector(".mobile-nav");
		if (mobileNav) {
				mobileNav.classList.toggle("show");
		} else {
				console.error("Error: Mobile navigation not found.");
		}
}

