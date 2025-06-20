    const submitButton = document.getElementById("submit");
    const outputElement = document.getElementById("output");
    const inputElement = document.querySelector("input");
    const buttonElement = document.querySelector("button");
    
    async function getGeminiResponse(userInput) {
      var dots = "."
      var interval = setInterval(() => {outputElement.innerHTML = dots; if (dots.length < 3) {dots += "."} else {dots = "."} }, 200)
      try {
        let question = "You are a disaster manager. You can always response to greetings nicely. If it is not related to disasters then say that you don't know the answer. Give the proper answer to the following question in 100 words: " + inputElement.value
        inputElement.value = ""
        const result = await fetch("/.netlify/functions/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: question }),
        });
        
        const data = await result.json();
        clearInterval(interval);
        
        // 👇 Properly access the Gemini response text
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        outputElement.innerHTML = text || "No response from Gemini.";

        
    

        
      } catch (e) {
        inputElement.value = ""
        clearInterval(interval)
        console.log(e)
        outputElement.innerHTML = "I failed to load a response for you right now..."
        }
    }
    submitButton.addEventListener("click", getGeminiResponse);
    const header = document.querySelector("header");
    const menuBtn = document.querySelector("#menu-btn");
    const closeMenuBtn = document.querySelector("#close-menu-btn");

    menuBtn.addEventListener("click", () => {
      header.classList.toggle("show-mobile-menu");
    })

    closeMenuBtn.addEventListener("click", () => {
      menuBtn.click()
    })
