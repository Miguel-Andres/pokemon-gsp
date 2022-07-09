import type { NextPage,  GetStaticProps} from 'next'
import {  Grid} from '@nextui-org/react';


import pokeApi from '../api/pokeApi';
import { Layout } from '../components/layouts'
import { pokemonListResponse, smallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons : smallPokemon[]
}

const Home: NextPage <Props> = ({pokemons}) => {



   return (
    
    <Layout title="listado de Pokemon">

    <Grid.Container gap={2} justify="flex-start">
      
     {pokemons.map((data,i)=><PokemonCard key={i} pokemon={data} />)}

      
    </Grid.Container>


    
    </Layout>
    
   
  )
}


export const getStaticProps: GetStaticProps= async (ctx) => {
  //estoy en backend 

  console.log("Mickey server")

  const {data} = await pokeApi.get <pokemonListResponse>("/pokemon?limit=151")

  const pokemons:smallPokemon[] = data.results.map((data,i)=>({
   ...data ,
      id: i+1 ,
      image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg `

  }))
    
  

  return {
    props: {
     pokemons 
    }
  }
}

export default Home
