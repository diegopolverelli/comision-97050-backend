const tickets=[]

export class MemoryTicketsDAO{
    get(){
        return tickets
    }

    save(ticket){
        let id=1
        if(tickets.length>0){
            id=Math.max(...tickets.map(d=>d.id))+1
        }
        
        let newTicket={id, ...ticket}
        tickets.push(newTicket)
        return newTicket
    }
}