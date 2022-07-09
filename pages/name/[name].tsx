
import { GetStaticProps, NextPage } from 'next';
import pokeApi from '../../api/pokeApi';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';


import { Layout } from "../../components/layouts"
import { Pokemon, pokemonListResponse } from '../../interfaces';
import { GetStaticPaths } from 'next'
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
    pokemon : Pokemon
}

const PokemonName:NextPage<Props> = ({pokemon}) => {
    const[isInFavorite,setInFavorite] = useState(localFavorites.existFavorite(pokemon.id))
  
console.log(pokemon)
  
    const ontoggleFavorite = (id:number)=>{
      
      localFavorites.toggleFavorite(pokemon.id)
  
        setInFavorite(!isInFavorite)
  
        if(isInFavorite) return
  
          confetti({
            zIndex:999,
            particleCount:100,
            spread:160 ,
            angle:-100 ,
            origin:{
              x : 1 ,
              y : 0 ,
            }
          })
         
    }
  return (
<Layout>
<Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4} >
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button
                color="gradient"
                ghost={!isInFavorite}
                onClick={()=>ontoggleFavorite(pokemon.id)}
              >

                {isInFavorite? "En Favoritos":"Guardar en favoritos"}
                
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

              </Container>


            </Card.Body>


          </Card>
        </Grid>

      </Grid.Container>
  
</Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const {data} = await pokeApi.get<pokemonListResponse>("/pokemon?limit=151")
    const pokemonNames:string[] = data.results.map(pokemon=>pokemon.name)
    return {
        paths: pokemonNames.map(name=>(
            {
            params : {name}
        }
        ))             
        ,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {name} = params as {name: string}

    const pokemon = await  getPokemonInfo(name.toLowerCase())

    if(!pokemon){
      return{
        redirect:{
          destination:"/" ,
          permanent: false 
        }
      }
    } 

    return {
        props: {
          pokemon 
        }
    }
}

export default PokemonName