import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/"
import { useCheckAuth } from "../hooks"


export const AppRouter = () => {

  const { status } = useCheckAuth();

  if( status === 'checking' ){
    return <CheckingAuth/> //Loading
  }

  return (
    <>
        <Routes>

            {
              (status === 'authenticated') 
              ? <Route path="/*" element={<JournalRoutes/>}/> // *Rutas Usuarios Auntenticados
              : <Route path="/auth/*" element={<AuthRoutes/>}/> // !Rutas Usuarios NO Auntenticados
            }
            
            //? Cualquier path diferente redireccionara a login
            <Route path="/*" element={ <Navigate to={"/auth/login"}/>}/> 
            {/* Login y registro */}
            {/* <Route path="/auth/*" element={<AuthRoutes/>}/> */}

            {/* Journal App */}
            {/* <Route path="/*" element={<JournalRoutes/>}/> */}

        </Routes>
    </>
  )
}
