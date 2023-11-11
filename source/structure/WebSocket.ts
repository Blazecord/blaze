import ws, { WebSocketServer } from 'ws';
import os from 'os';

import { Logger } from '../lib';

export class WSServer extends WebSocketServer {
    private logger: Logger;
    constructor() {
        super(
            {
                port: 4021, // the port to listen on, default is 4021, can be changed.
                perMessageDeflate: {
                    zlibDeflateOptions: {
                        chunkSize: 1024,
                        memLevel: 7,
                        level: 3
                    },
                    zlibInflateOptions: {
                        chunkSize: 10 * 1024
                    },
                },
            }
        )

        this.logger = new Logger({ prefix: 'WebSocketServer' });
    }

    /**
     * This function is called when a client connects to the server
     * @since 0.9.3
     */
    private connection(): void {
        this.on('connection', (ws: ws) => {
            setInterval(() => {
                ws.send(`${Math.round(os.freemem() / 1024 / 1024)}`) // Send the free memory to the clients  
            }, 5000)
            // TODO: Add a way to send the CPU usage to the clients
        })
    }
    
    /**
     * This function is called when a client disconnects from the server
     * @param data The data to send to the clients
     * @since 0.9.3
     */
    public send(data: any): void {
        // Goes through all the clients and sends the data to them
        this.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(data)
            }
        });

    }

    /**
     * This function is called when a client sends a message to the server
     * @since 0.9.13
     */
    public message(): void {
        this.on('connection', (ws: ws) => {
            ws.on('message', (message: string) => {
                // Commands for the ws Server
                const data = Buffer
                    .from(message)
                    .toString('utf-8')

                if (data === 'ping') {
                    ws.send('pong')
                }

                else if (data === 'close') {
                    this.close()
                }

                else if (data === 'latency') {
                    ws.send(`${ws.ping()}`)
                } 

                else if (data === "keksbot") {
                    return ws.send("KeksBot is cool!")
                }

                else { 
                    ws.send(`Unknown command: ${data}`)
                }
            });
        });
    }
    
    /**
     * This function is called when a client pings the server
     * @since 0.9.13
     */
    public ping(): void {
        this.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.ping()
            }
        });
    }

    /**
     * This function is called when a client closes the connection
     * @since 0.9.13
     */ 
    public override close(): void {
        this.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.close()
            }
        });
    }

    /**
     * This function is called when the server is started
     * @since 0.9.3
     */
    public run(): void {
        this.connection()
        this.logger.info('WebSocketServer started on port 4021')
        this.message()
    }

}
export default WSServer; // Export the class as default
