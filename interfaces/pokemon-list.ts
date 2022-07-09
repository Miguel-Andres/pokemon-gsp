
export interface pokemonListResponse {
    count : number
    next : string
    previous : string
    results : smallPokemon[]
}

export interface smallPokemon{
    name : string
    url : string
    id : number
    image : string
}