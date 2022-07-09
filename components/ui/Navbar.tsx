import { useTheme ,Text, Spacer,Image,Link  } from '@nextui-org/react'
import NextLink from 'next/link'

export const Navbar = () => {

  const {theme}= useTheme()


  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0x 50px',
      backgroundColor: theme?.colors.gray300.value
    }}>
      <Image
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
      alt = "Icono de la App"
      width={70} 
      height={50}
      />  
      <NextLink href="/" passHref>
        <Link >
            <Text h2 color='white'>P</Text>
            <Text h3>okemon</Text>
        </Link>

      </NextLink>


        <Spacer css={{flex:1}}/>

    <NextLink href="/favorites" passHref>
    <Link css={{marginRight :"20px"}}>
        <Text h3 >Favoritos</Text>
    </Link>
    </NextLink>

        
    </div>
  )
}

