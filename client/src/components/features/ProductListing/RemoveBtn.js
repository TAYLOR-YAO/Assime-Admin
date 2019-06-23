import React from "react";
export default function RemoveBtn(props){
    return <button style={{background:`${props.storeColor}`, color:`${props.textColor}`}} onClick={()=>props.removeFromCart(props.cartItem)} className="button">
        Remove
    </button>
}