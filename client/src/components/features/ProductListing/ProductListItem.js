import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import RemoveBtn from "./RemoveBtn";
import ItemDetails from "./ItemDetails";
import "./ProductListItem.css";

export default function ProductListItem(props){
    return  <div className="productCard">
            <div style={{background:`${props.storeColor}`, color:`${props.textColor}`}}>{props.company}</div>
            <div className="imagebox">
                <img src={props.image} alt="prodict View"/> 
            </div>
            <div>
                <p >{props.name}</p>
                <div style={{padding: "5px"}} >
                    <p style={{color:"#000", float:"left"}} className="item-information">Price: <span style={{color:"red"}}>{`$${props.price}`}</span></p>
                    <p style={{color:"#333"}} className="item-information"> { props.size ? `size: ${props.size}`  : " "} </p>
                </div>
                <ItemDetails details={props.details}/>
            </div> 
                <div className="addToCart">
                <AddToCartBtn 
                cartItem ={props.cartItem}
                product={props.product}
                addToCart ={props.addToCart}
                storeColor={props.storeColor}
                textColor={props.textColor}
                />

                {
                    props.cartItem
                    ? <RemoveBtn 
                    cartItem ={props.cartItem}
                    product={props.product}
                    removeFromCart ={props.removeFromCart}
                    storeColor={props.storeColor}
                    textColor={props.textColor}
                    />
                    : null
                }
            
            </div>  
        </div>
    }