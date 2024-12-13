export type Character = {
    id: string,
    name: string,
    gender: string,
    affiliation: string,
    devilfruit: string,
    haki: string,
    lastbounty: number,
    height: number,
    origin: string,
    firstarc: string,
    imageurl: string
}

export type Arc = {
    name: string,
    arc_order: number
}

export type User = {
    id: string,
    email: string,
    score: number
}