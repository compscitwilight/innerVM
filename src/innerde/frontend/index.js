import { startup } from "/startup.js";
startup();

document.addEventListener("mousemove", (event) => {
    console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
})