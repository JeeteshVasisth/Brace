
const updates = [
    {
        title: "Landslide Alert",
        content: "A landslide has occurred in the area of Wayanad, Kerala. Number of dead rises to 288, rescue ops on war footing.",
        timestamp: "Updated 1 day ago",
    },
    {
        title: "Flood Warning",
        content: "Heavy rains have caused flooding in parts of Delhi. Schools closed, major.",
        timestamp: "Updated 20 hours ago"
    }
];

function addUpdates() {
    const updatesContainer = document.querySelector('.updates');
    updates.forEach(update => {
        const updateDiv = document.createElement('div');
        updateDiv.className = 'update';
        updateDiv.innerHTML = `
            <h3>${update.title}</h3>
            <p>${update.content}</p>
            <span class="timestamp">${update.timestamp}</span>
        `;
        updatesContainer.prepend(updateDiv);
    });
}
addUpdates();


const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("show-mobile-menu");
})

closeMenuBtn.addEventListener("click", () => {
  menuBtn.click()
})