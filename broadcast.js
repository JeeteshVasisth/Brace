const updates = [];
async function fetchDisasterNews() {
  const keyword = "natural disaster";

  const res = await fetch("/.netlify/functions/disasterNews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword }),
  });
  const data = await res.json();
  console.log(data)
  
  if (data.articles?.length) {
    data.articles.forEach(article => {
      updates.push({
          title: article.title,
          content: article.description,
          timestamp: article.publishedAt,
          link: article.link
    })
    })
    }  else {
    list.innerHTML = "<li>No recent disaster news found.</li>";
  }
  console.log(updates)
  addUpdates();
}
fetchDisasterNews();


function addUpdates() {
    const updatesContainer = document.querySelector('.updates');
    updates.forEach(update => {
        const updateDiv = document.createElement('div');
        updateDiv.className = 'update';
        updateDiv.innerHTML = `
            <a href=${update.link} target="_blank">${update.title}</a>
            <p>${update.content}</p>
            <span class="timestamp">${update.timestamp}</span>
        `;
        updatesContainer.prepend(updateDiv);
    });
}



const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("show-mobile-menu");
})

closeMenuBtn.addEventListener("click", () => {
  menuBtn.click()
})
