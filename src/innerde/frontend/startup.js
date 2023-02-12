import { Window } from "/windows.js";
import { Desktop } from "/desktop.js";

const topbarTime = document.getElementById("topbar-time");

/**
 * A function that is invokved on the start of InnerDE
 */
export function startup() {
    //const welcome = new Window("About InnerDE", 256, 500, false, true, true);
    const authenticate = new Window("Login", 512, 512, false, false, false);
    authenticate.setInnerHTML(`
        <form>
            <label>Username: root</label>
            <input name="password" type="password" placeholder="Password" />
        </form>
    `)

    function updateTBTime() {
        let date = new Date();
        let minutes = date.getMinutes();
        if (String(minutes).length === 1)
            minutes = Number(`0${minutes}`);
        
        topbarTime.innerText = `${date.getHours()}:${minutes}`;
        setTimeout(updateTBTime, 1000);
    }

    updateTBTime();
    Desktop.setWallpaper("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4fUrkc8h3Ccaho6Ls28lYEsiuIAkUFMMWJNlJiSWox13Ax7elps64tE20hVNfzf7MDYPomnOvV8JA6ieKq-q9PjMfeadNVxV6B2Dn2VqNDPmGD2RgFh8gQw12pZpk5X5QrbOCa63sPWj3lR5MTxuLRpvU1Gdsn_SBPX-UvrnEU1lQpy5Yiayx4swtZA/s1332/Capture.PNG");
    Desktop.load();
}