import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import {Modal,Button} from "react-bootstrap";
import {Grid, Cell, Textfield} from "react-mdl";

function sessionValidation(){
    axios.get("api/storeIdentification").then(res=>{
        if (res.data === undefined || res.data.length === 0) {
            function removeFromStorage(){
                localStorage.removeItem("createdStore");
                <Redirect to='/office' />
            }
            return removeFromStorage();
        }    
    });
}
sessionValidation();

class StoreIdentification extends Component {
    state = {
        showModal: true,
        storeID: "",
        errMessage:""
    }

    handleInputsChanges = event => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value });
    }

    handleSignUpSubmit = event => {
        event.preventDefault();       
        axios.post("api/storeIdentification", this.state).then(res=>{
            console.log(res.data)
            if(!res.data){
                this.setState({errMessage: "Err: Invalide ID"})
            }
            localStorage.setItem("identifiedSore", JSON.stringify(res.data));

            const value = localStorage.getItem("identifiedSore");
            const validated = JSON.parse(value);
            if(validated){
                this.setState({
                    showModal: false,
                });
                window.location.reload()
            } 
        });
    } 

    render(){
        if(this.state.showModal){
        return(<div className="static-modal" style={{minHeight:"400px"}} >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title style={{color:"maroon"}}>Store Identification</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Grid className="demo-grid-1">
                    <h5>Identify your company & store</h5>
                    <Cell col={12}>
                        <p style={{color:"red", fontSize:"10px"}}>{this.state.errMessage}</p>
                        <Textfield
                            label="Insert store ID"
                            floatingLabel
                            style={{width: "100%"}}
                            name="storeID"
                            onChange={this.handleInputsChanges}
                        />
                    </Cell>
                            
                </Grid>
                
            </Modal.Body>
        
            <Modal.Footer>
            <Button onClick={this.handleSignUpSubmit} style={{background:"maroon", color:"#fff"}}>Submit</Button>
            </Modal.Footer>
            </Modal.Dialog>
        </div>)
        } else {
            return <Redirect to='/dashboard' />
        }
    }
}

export default StoreIdentification;

 