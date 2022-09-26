import * as C from './styles'
import { Theme } from '../../components/Theme/intex'
import {useForm, FormActions} from '../../context/FormContext'
import { useEffect, useState} from 'react'
import {ReactComponent as CheckIcon} from '../../svgs/check.svg'
import {ReactComponent as Failed} from '../../svgs/failed.svg'
import {ReactComponent as Waiting} from '../../svgs/waiting.svg'
import {useHistory} from 'react-router-dom'
import { APY_URL, } from '../../config'


type user={
   
    name: string;
    email: string;
    level: string;
    github: string;
    number: string;
    team:string;

}

const teams={
    '1':'Formation team ', 
    '2':'Organization  team ', 
    '3':'Media  team', 
    '4':'Design  team', 
}

export const FormStep5 = () => {
    const [hasEror, sethasEror] = useState(false)
    const [iswaiting,setiswaiting]=useState(false)
    
        const {state, dispatch} = useForm()
        const history = useHistory()

        async function FetchUser(data:user){
            try{
                setiswaiting(true)
               await fetch(APY_URL,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data) 
                }
                )
                setiswaiting(false)
        sethasEror(false);
            }
            catch(e){
        sethasEror(true);
        setiswaiting(false)
        throw new Error();
            }
        
            }
        

   
    useEffect(()=>{
         if (state.email==='' || state.github==='' ||!state.number){
            history.push('/step3')
        }    
        else{
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 5
            })
          
                 
            FetchUser({
                name:state.name,
                email:state.email,
                level:state.level===1?'débutant':'programmeur',
                github:state.github,
                number: `0+${state.number}`,
                team:teams[state.team|| 1]
            });
            //use an api to send the infos            
  


        }
        

    },[])


    return(
        <Theme>
            <C.Container>
            { !hasEror && !iswaiting && <><h2>Toutes nos félicitations</h2><p>Inscription envoyée avec succès !</p></>}
            { hasEror && <><h2>OOOOPS </h2><p> Une erreur est survenue !</p></>} 
            { iswaiting && <><h2>pourriez-vous s'il vous plaît </h2><p>votre demande est en cours d'exécution</p></>}

                <C.IconArea>
                  { !hasEror && !iswaiting && <CheckIcon fill="rgb(91, 24, 153)" width={120} height={120}/>}
                  { hasEror && <Failed fill="rgb(91, 24, 153)" width={120} height={120}/>}
                  { iswaiting && <Waiting fill="rgb(91, 24, 153)" width={120} height={120}/>}
                </C.IconArea>

                <p className='check-email'> <b>{state.name}</b> nous avons bien reçu votre email et vos informations, restez en contact!!!</p>
                

            </C.Container>
        </Theme>
    )
}