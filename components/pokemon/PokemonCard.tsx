import { Text,  Grid, Card, Row } from '@nextui-org/react';
import { FC } from 'react';
import { smallPokemon } from '../../interfaces/index';
import { useRouter } from 'next/router';

interface Props{
    pokemon: smallPokemon   
}

export const PokemonCard:FC<Props> = (props) => {
  
  const {id,name,image}= props.pokemon
  
  const router = useRouter()

  const detail =(name:string) =>{
   router.push(`/name/${name}`)
  }



  return (
    <Grid key={id} xs={6} sm={3} md={2} xl={1}>

    <Card isHoverable isPressable onClick={()=>detail(name)}>
      <Card.Body css={{p:1}} >
        <Card.Image
         src={image}         
        width="100%"
        height={ 140 }
                />
      </Card.Body>

      <Card.Footer>
        <Row justify="space-between">
          <Text transform="capitalize">{name}</Text>
          <Text>#{id}</Text>
        </Row>
      </Card.Footer>
    </Card>

  </Grid>
  )
}

