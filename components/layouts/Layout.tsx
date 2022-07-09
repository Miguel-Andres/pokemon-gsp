
import  Head from 'next/head'
import { Navbar } from "../ui"


interface layout {
  title ?: string
  children ?: React.ReactNode
}

const origin = (typeof window ==="undefined") ? "": window.location.origin

export const Layout= ({children,title}:layout) => {

  
  return (
      <>    

      <Head>
         <title>{title ||"Pokemon App"}</title>
         <meta name="author" content="Miguel Andres" />
         <meta name="description" content="Informacion sobre el Pokemon XXXXX"/>
         <meta name="keywords" content={`${title},XXXX,Pokemon`}/>
         {/**/}
         <meta property="og:title" content={`Informacon sobre ${title}`} />
         <meta property="og:description" content={` Esta es la Pagina sobre ${title}`} />
         <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />
      <main style={{
        padding:"0px 20px"
      }}>
        {children}
      </main>
      </>
  )
}

