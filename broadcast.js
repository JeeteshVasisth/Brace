const updates = [];

async function fetchDisasterNews() {
  const keywords = [
    "natural disaster",
    "disaster management",
    "earthquake",
    "flood",
    "landslide",
    "hurricane",
    "wildfire"
  ];

  const keyword = keywords.join(" OR "); // Creates a search string like: "earthquake OR flood OR wildfire"

  try {
    const res = await fetch("/.netlify/functions/disasterNews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });

    if (!res.ok) {
      console.error("Error fetching news:", res.status);
      document.querySelector(".updates").innerHTML = "<p>Failed to load news updates.</p>";
      return;
    }

    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      document.querySelector(".updates").innerHTML = "<p>No recent disaster news found.</p>";
      return;
    }

    data.articles.forEach(article => {
      updates.push({
        title: article.title,
        content: article.description || "No description available.",
        timestamp: article.publishedAt,
        link: article.url
      });
    });

    addUpdates();
  } catch (err) {
    console.error("Fetch error:", err);
    document.querySelector(".updates").innerHTML = "<p>Error loading disaster updates.</p>";
  }
}

function addUpdates() {
  const updatesContainer = document.querySelector('.updates');
  updatesContainer.innerHTML = ""; // Clear previous results

  updates.forEach(update => {
    const updateDiv = document.createElement('div');
    updateDiv.className = 'update';
    updateDiv.innerHTML = `
      <a href="${update.link}" target="_blank"><strong>${update.title}</strong></a>
      <p>${update.content}</p>
      <span class="timestamp">${update.timestamp}</span>
    `;
    updatesContainer.appendChild(updateDiv);
  });
}

fetchDisasterNews();

// Mobile menu toggle
const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("show-mobile-menu");
});

closeMenuBtn.addEventListener("click", () => {
  menuBtn.click();
});
