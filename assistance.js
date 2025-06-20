import {GoogleGenerativeAI} from "@google/generative-ai";
    const keys = ["AIzaSyC34ozdKiz-8OOyge6RGHerVyk2qWdRX4U", "AIzaSyAcd06hFcMMqpJU1fQDWKS4jhwE6LUvN48", "AIzaSyD1XZBwlBBt9xwa3KhLQvXRSdyfdR_iY94", "AIzaSyA9HHeiJPbi_cMaCqe5Knwckq5xtfuXFAY"]
    const submitButton = document.getElementById("submit");
    const outputElement = document.getElementById("output");
    const inputElement = document.querySelector("input");
    const buttonElement = document.querySelector("button");
    var indice = 0
    async function run() {
      const API_KEY = keys[indice]
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});
      var dots = "."
      var interval = setInterval(() => {outputElement.innerHTML = dots; if (dots.length < 3) {dots += "."} else {dots = "."} }, 200)
      try {
        var question = "You are a disaster manager. You can always response to greetings nicely. If it is not related to disasters then say that you don't know the answer. Give the proper answer to the following question in 100 words: " + inputElement.value
        inputElement.value = ""
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = response.text();
        clearInterval(interval)
        outputElement.innerHTML = text
        if (indice < 3) {
          indice += 1;
        } else {
          indice = 0
        }
      } catch (e) {
        inputElement.value = ""
        clearInterval(interval)
        console.log(e)
        outputElement.innerHTML = "I failed to load a response for you right now..."
        if (indice < 3) {
          indice += 1;
        } else {
          indice = 0
        }
      }
    }
    submitButton.addEventListener("click", run);
    const header = document.querySelector("header");
    const menuBtn = document.querySelector("#menu-btn");
    const closeMenuBtn = document.querySelector("#close-menu-btn");

    menuBtn.addEventListener("click", () => {
      header.classList.toggle("show-mobile-menu");
    })

    closeMenuBtn.addEventListener("click", () => {
      menuBtn.click()
    })
