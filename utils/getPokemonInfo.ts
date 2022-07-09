import pokeApi from "../api/pokeApi"
import { Pokemon } from "../interfaces"


export const getPokemonInfo = async (params:string) =>{

 try{

     const { data } = await pokeApi.get<Pokemon>(`/pokemon/${params}`)
      
     const pokemon ={
         id : data.id ,
         name: data.name ,
         sprites : data.sprites,
         }
         return pokemon
 }
 catch(error){
    return null
 }
    
}
