
export interface fakutureData {
brojFakture: string,
datum: string,
partner:string,
postoRabata: number,
artikli:artikliData[]
}

export interface artikliData {
    nazivArtikla: string,
    kolicina: number,
    cijena: number,
    postoRabataArtikla: number
}

export interface artikliDataUpdate {
    artikalId:number
    nazivArtikla: string,
    kolicina: number,
    cijena: number,
    postoRabataArtikla: number
}

export interface fakutureDataUpdate {
    fakturaId:number,
    brojFakture: string,
    datum: string,
    partner:string,
    postoRabata: number,
    
}



