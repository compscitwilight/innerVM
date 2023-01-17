import { Key } from "../data/Keys";
export { Key };

export type keyPressCallback = (key: string, close: Function, ctrl?: boolean) => void;
export class Keyboard {
    public static onKeyPress(key: Key, callback?: keyPressCallback) {
        let event = process.stdin.on("keypress", (ch: string, k) => {
            let keyString: string = k.name;
            let lowered = keyString.toLowerCase();

            if (lowered == key && callback)
                callback(lowered, closeEvent);
        })

        function closeEvent() {
            event.pause();
        }
    }
}

export class Mouse {

}