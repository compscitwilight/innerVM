const windowLayer = document.getElementById("window-layer");

/**
 * The Window is a class that is used to create windows using the I Window System
 * 
 * @param title - The title of the window
 * @param width - The width of the window (px)
 * @param height - The height of the window (px)
 * @param max - Show maximize button
 * @param min - Show minimize button
 * @param close - Show close button
 */
export class Window {
    constructor(title, width, height, max, min, close) {
        const frame = document.createElement("div");
        frame.style.width = width;
        frame.style.height = height;
        frame.classList.add("window-frame");
        windowLayer.append(frame);

        const tb = document.createElement("div");
        const tbText = document.createElement("p");
        tbText.innerText = title;
        tb.append(tbText);
        tb.classList.add("window-titlebar");

        if (close) {
            const closeBtn = document.createElement("label");
            closeBtn.innerText = "[X]";
            closeBtn.title = "close";
            closeBtn.classList.add("window-titlebar-btn", "window-titlebar-close");
            tb.append(closeBtn);
        }

        if (min) {
            const minimize = document.createElement("label");
            minimize.innerText = "_";
            minimize.title = "minimize"
            minimize.classList.add("window-titlebar-btn");
            tb.append(minimize);
        }

        if (max) {
            const maximize = document.createElement("label");
            maximize.innerText = "[=]";
            maximize.title = "maximize";
            maximize.classList.add("window-titlebar-btn");
            tb.append(maximize);
        }

        frame.append(tb);
        this.frameElement = frame;
    }

    setInnerHTML(html) {
        this.frameElement.innerHTML = html;
    }
}