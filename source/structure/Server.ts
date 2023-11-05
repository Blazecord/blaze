import ws, { WebSocketServer } from 'ws';

import os from 'os';

export class Server extends WebSocketServer {
    constructor() {
        super(
            {
                port: 8080,
                perMessageDeflate: {
                    zlibDeflateOptions: {
                        chunkSize: 1024,
                        memLevel: 7,
                        level: 3
                    },
                    zlibInflateOptions: {
                        chunkSize: 10 * 1024
                    },
                }
            }
        )
    }

    private connection() {
        this.on('connection', (ws: ws) => {
            setInterval(() => {
                ws.send(`${Math.round(os.freemem() / 1024 / 1024)}`) // Send the free memory to the clients  
            }, 5000)
            // TODO: Add a way to send the CPU usage to the clients
        })
    }

    public send(data: any) {
        // Goes through all the clients and sends the data to them
        this.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(data)
            }
        });

    }
    
    public run() {
        this.connection()
    }

}
export default Server;