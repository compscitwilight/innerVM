/**
 * (C) Copyright 2023 - Devrusty
 * This file is under the GNU General Public License.
 * 
 * InnerDE is a free and open-source desktop enviornment that is compatbile with InnerOS
 * operating systems.
 * 
 * InnerDE creates an Express.js server that is used to render the desktop enviornment. It is similar to
 * GNOME.
 * 
 * InnerDE uses Socket.io to communicate with the kernel and the user from the browser.
 */

import * as express from "express";
import * as socketio from "socket.io";
import * as http from "http";
import * as path from "path";
import CPU, { CPUProcess } from "../../hardware/CPU";
import Memory from "../../hardware/Memory";

let port = 12500;

export function loadDesktopEnviornment(os: CPUProcess) {
    os.write("loading innerDE...");
    os.writeOut();
    
    Memory.allocate(0x16f, 10000000);
    CPU.executeProcess(0x16f, (de: CPUProcess) => {
        const deApp = express();
        const httpServer = http.createServer(deApp);
        const socketServer = new socketio.Server(httpServer);

        const root = path.join(__dirname, "frontend");
        deApp.use(express.static(root));

        deApp.get("/", (req: express.Request, res: express.Response) => {
            res.sendFile("./frontend/index.html", { root: __dirname });
        });

        deApp.listen(port);
        de.write(`innerDE has started @ localhost:${port}`);
        de.writeOut();
    })
}