import React from "react";
import {Modal} from "react-bootstrap";

import "./Confirmation.css"
export default  props =>
<div className="static-modal" >
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title style={{color:"green", textAlign:"center"}}>Succesfully Registred!</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{textAlign:"left", marginLeft:" 20px 5px"}}>
      <div style={{textAlignLast:"center"}}>

            <div>
                Check Your Email For Your Confirmation Message
            </div>
            <div className="access-dashboard">
              <a href="/dashboard">Access Your Dashboard Here </a>
            </div>
      </div>
      <div style={{textAlign:"right"}}>
        <a style={{color:"#000"}} href="/dashboard" ><button>OK!</button></a>
      </div>

    </Modal.Body>
  </Modal.Dialog>
</div>;