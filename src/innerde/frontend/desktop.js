export class Desktop {
    static load() {
        let url = localStorage.getItem("wallpaper");
        this.setWallpaper(url);
    };

    static setWallpaper(url) {
        document.body.style.backgroundImage = url;
        localStorage.setItem("wallpaper", url);
    };
}