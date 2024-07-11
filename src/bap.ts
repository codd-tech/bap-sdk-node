import { createSocket } from 'node:dgram'
import { Buffer } from 'node:buffer'

type TClient = 'node'

enum Method {
    Activity = 'activity',
    Advertisement = 'advertisement',
}

interface MessageInterface {
    api_key: string
    client: TClient
    version: number
    method: Method
    update: object
}

export class BAP {
    private readonly API_VERSION = 3
    private readonly API_CLIENT: TClient = 'node'
    private readonly BAP_PREFIX = '/__bap'

    private readonly API_PORT = 8080
    private readonly API_HOST = 'api.production.bap.codd.io'

    private readonly socket = createSocket('udp4')

    constructor(
        private readonly apiKey: string
    ) {}

    handleTelegramUpdates(update): boolean {
        this.send({
            api_key: this.apiKey,
            client: this.API_CLIENT,
            version: this.API_VERSION,
            method: Method.Activity,
            update,
        })

        return !this.isBAPUpdate(update)
    }

    advertisement(update): void {
        if (!this.isBAPUpdate(update)) {
            this.send({
                api_key: this.apiKey,
                client: this.API_CLIENT,
                version: this.API_VERSION,
                method: Method.Advertisement,
                update,
            })
        }
    }

    private send(message: MessageInterface): void {
        const buffer = Buffer.from(JSON.stringify(message))
        this.socket.send(buffer, 0, buffer.length, this.API_PORT, this.API_HOST)
    }

    private isBAPUpdate(update): boolean {
        const data = update.callback_query
        if (data) {
            return (data as string).startsWith(this.BAP_PREFIX)
        }

        return false
    }
}
