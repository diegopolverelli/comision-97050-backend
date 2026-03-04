export class TicketsRepo{
    #ticketDAO
    constructor(ticketDao){
        this.#ticketDAO=ticketDao
    }

    async createTicket(ticket){
        return this.#ticketDAO.save(ticket)
    }
}