import React from "react";
export default function AddAndRemoveBtn(props){
    return <button style={{background:`${props.storeColor}`, color:`${props.textColor}`}} className="button" onClick={()=>props.addToCart(props.product)} >
        Add to cart({
        (props.cartItem && props.cartItem.quantity) || 0
        })
    </button>
}