import { useContext } from "react";
import { popupContext } from "../provider/popupContext";

export function UsePopup(){

    const {pop, setPop} = useContext(popupContext)
    
    function openPopUp(){
        
        setPop('else');
    }

    function removePop() {

        setPop('none');
    }

    function openForm() {

        setPop('submit');
    }

    return {

        pop, 
        setPop,
        openPopUp, 
        removePop,
        openForm
    }
}