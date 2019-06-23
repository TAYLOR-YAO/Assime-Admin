import React, {Component} from 'react';
import "./StoreRegistration.css";
import Confirmation from "./Confirmation";    
import {Grid, Cell, Textfield, Button} from "react-mdl";
import {Tab, Tabs, Modal} from "react-bootstrap";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import axios from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PhoneInput from 'react-phone-number-input/react-responsive-ui'

class StoreRegistration extends Component {
    state={
        showModal: false,
        confirmSubmit: false,
        displayTextColorPicker: false,
        displayStoreColorPicker: false,
        company: "",
        streetAddress: "",
        city: "",
        countryOrState: "",
        zip: "",
        address: "",
        email: "",
        password: "",
        password2: "",
        errors: {},
        tel: "",
        tel2: "",
        storeColor: "",
        textColor: "",
        // storeID: "",
        tax: "",
        shipping: "",
        express: "",
        deleteStoreId: "",
        color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
        },
        phone: ""
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    handleTextClick = () => {
        this.setState({ displayTextColorPicker: !this.state.displayTextColorPicker })
    };

    handleStoreClick = () => {
    this.setState({ displayStoreColorPicker: !this.state.displayStoreColorPicker })
    };
    
    handleTextColorClose = () => {
    this.setState({ displayTextColorPicker: false })
    };
    handleStoreColorClose = () => {
        this.setState({ displayStoreColorPicker: false })
    };

    handleClose = event => {
        this.setState({ showModal: false });
    }

    ClearStore = event =>{
        const {deleteStoreId} = this.state;
        const data = {
            id: deleteStoreId
        }
        axios.post("api/clearstore",data).then(result=>{
            console.log("Result: ",result)
        });
    }

    
    handleInputsChanges = event => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value });
    }
    handleStoreColorChoice = (color) => {
        this.setState({ storeColor: color.hex });
        // console.log(this.state.storeColor)
    };
    handleTextColorChoice = (color) => {
        this.setState({ textColor: color.hex})
        // console.log(this.state.textColor)
    };
// ------------------------------------
    handleSignUpSubmit = event => {
        event.preventDefault();
        this.setState({ confirmSubmit: true });

    }
    handleClose =(event)=>{
        this.setState({ confirmSubmit: false });
      }

      handleConfirmSubmit =(event)=>{
        event.preventDefault()
        // axios.post("api/store/enroll",this.state).then(res=>{
        //     this.setState({
        //         company: res.data.company,
        //         city: res.data.city,
        //         countryOrState: res.data.country,
        //         email: res.data.email,
        //         tel: res.data.tel,
        //         tel2: res.data.tel2,
        //         zip: res.data.zip,
        //         tax: res.data.tax.$numberDecimal ,
        //         normalShipment: res.data.normalShipment,
        //         express: res.data.express,
        //         streetAddress: res.data.address,
        //         showModal: true,
        //         address: `${res.data.streetAddress} ${res.data.city} ${res.data.countryOrState} ${res.data.zip}`
        //         // storeID: res.data._id,

        //     })
        // console.log("RESPONSE:  ", res.data)
        // localStorage.setItem("createdStore", JSON.stringify(res.data))
        // }); 

        this.setState({ confirmSubmit: false,
                showModal: true
    });
    }

    render () {    
       const  {showModal, company, city, country, email, tel,tel2, address} = this.state;
       if(showModal){
           return   <Confirmation
                company = {company}
                location = {`${city}, ${country}`}
                email = {email}
                tel = {tel}
                tel2 = {tel2}
                address = {address}
            />
        // return <Modal
        //             visible={this.state.showModal}
        //             closemodal={() => this.setState({ showModal: false })}
        //             type="flipInX"
        //         >
        //             Some text or JSX inside modal goes here...
        //     </Modal>
       }


       const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
      });

      

    return(
        <div style={{marginTop:"15px"}}>

            <Tabs justified defaultActiveKey={1} animation={false} id="noanim-tab-example">
                <Tab eventKey={1} title="Store Registration" >
                    
                <div className="marchandises-box" style={{width: '90%', margin: 'auto'}}>
                <Grid className="demo-grid-1">
                    <Cell col={12}>
                        <div style={{textAlign:"center"}}><h5>Store registration</h5></div>    
                        <hr style={{ height:"3px", background:"#000"}}/>                              
                        <Grid className="demo-grid-1">
                            <Cell col={3}>
                                <strong>Company name</strong>
                                <Textfield
                                label="Company & Store Name"
                                floatingLabel
                                style={{width: "100%"}}
                                name="company"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={3}>
                                <strong>Email</strong>
                                <Textfield
                                label="Email"
                                floatingLabel
                                style={{width: '100%'}}
                                name="email"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={2}>
                                <strong>Tel</strong>
                                <PhoneInput
                                    placeholder="Enter Primary phone number"
                                    value={ this.state.tel }
                                    onChange={ tel => this.setState({ tel}) } 
                                />
                            </Cell>
                            <Cell col={2}>
                                <strong>Tel 2</strong>
                                <PhoneInput
                                    placeholder="Enter second phone number"
                                    value={ this.state.tel2 }
                                    onChange={ tel2 => this.setState({ tel2}) } 
                                />
                            </Cell>
                            <Cell col={1}>
                                <strong>Text Color</strong>

                                <div style={ styles.swatch } onClick={ this.handleTextClick }>
                                <div style={ styles.color } />
                                </div>
                                { this.state.displayTextColorPicker ? <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ this.handleTextColorClose }/>
                                <SketchPicker color={ this.state.textColor } onChange={ this.handleTextColorChoice} />
                                </div> : null }
                                <hr/>

                            </Cell>
                            <Cell col={1}>
                                <strong>Store Color</strong>
                                <div style={ styles.swatch } onClick={ this.handleStoreClick }>
                                <div style={ styles.color } />
                                </div>
                                { this.state.displayStoreColorPicker ? <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ this.handleStoreColorClose }/>
                                <SketchPicker color={ this.state.textColor } onChange={ this.handleStoreColorChoice} />
                                </div> : null }
                                <hr/>

                            </Cell>
                        </Grid>
                        <Grid className="demo-grid-1">

                        <Cell col={2}>
                                <strong>Street Address</strong>
                                <Textfield
                                label="Street Address"
                                floatingLabel
                                style={{width: "100%"}}
                                name="streetAddress"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={2}>
                                <strong>City</strong>
                                <Textfield
                                label="city"
                                floatingLabel
                                style={{width: '100%'}}
                                name="city"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={2}>
                                <strong>State & Country</strong>
                                <Textfield
                                label="State & Country"
                                floatingLabel
                                style={{width: '100%'}}
                                name="countryOrState"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={1}>
                                <strong>Zip</strong>
                                <Textfield
                                label="Zip"
                                floatingLabel
                                style={{width: "100%"}}
                                name="zip"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={1}>
                                <strong>Tax Rate</strong>
                                <Textfield
                                label=" Tax Rate"
                                floatingLabel
                                style={{width: '100%'}}
                                name="tax"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>
                            <Cell col={2}>
                                <strong>Shipping & Handling Fees</strong>
                                <Textfield
                                    label="Shipping & Handling Fees"
                                    floatingLabel
                                    style={{width: '100%'}}
                                    name="shipping"
                                    onChange={this.handleInputsChanges}
                                />
                            </Cell>
                            <Cell col={2}>
                                <strong>Express & Handling Fees</strong>
                                <Textfield
                                    label="Express & Handling Fees"
                                    floatingLabel
                                    style={{width: '100%'}}
                                    name="express"
                                    onChange={this.handleInputsChanges}
                                />
                            </Cell>

                        </Grid>

                        <Grid className="demo-grid-1">

                            <Cell col={2}>

                                <strong>Password</strong>
                                <Textfield
                                    label="Password"
                                    floatingLabel
                                    style={{width: '100%'}}
                                    name="password"
                                    onChange={this.handleInputsChanges}
                                />
                         
                            </Cell>
                            <Cell col={2}>

                                <strong>Confirm Password</strong>
                                <Textfield
                                    label="Confirm Password"
                                    floatingLabel
                                    style={{width: '100%'}}
                                    name="password2"
                                    onChange={this.handleInputsChanges}
                                />
                            
                            </Cell>
                            <Cell col={8} style={{textAlign:"right"}}>
                                <Button raised style={{background:"#6351ce", color:"#fff"}} onClick={this.handleSignUpSubmit}>Submit</Button>
                            </Cell >
                        </Grid>
                    </Cell> 
                </Grid>
            </div>

                </Tab>
                <Tab eventKey={2} title="Updates" >
                <div style={{textAlign:"center"}}><h3>Updates</h3></div>                
                    <hr style={{ height:"3px", background:"#000"}}/>
                    <Grid>
                        <Cell col={12}>
                            <h6>Delete store products</h6>  
                            <hr/> 
                            <Textfield
                                label="Insert store ID"
                                floatingLabel
                                style={{width: "100%"}}
                                name="deleteStoreId"
                                onChange={this.handleInputsChanges}
                            />                  
                            <Button raised style={{background:"#6351ce", color:"#fff"}} onClick={this.ClearStoreInventory}>Delete products</Button>
                            <hr/>
                            <Button raised style={{background:"#6351ce", color:"#fff", marginLeft:"0px"}} onClick={this.ClearStore}>Delete Store ?</Button>
                            
                        </Cell>
                    </Grid>
                    <hr style={{ height:"3px", background:"#000"}}/>
                    <Grid>
                        <Cell col={12}>
                            <h6>Delete all products</h6>
                            <hr/>
                            <Button style={{background:"#6351ce", color:"#fff", margin:"10px 20px"}} onClick={this.ClearAllInventory}>Delete</Button>                    
                        </Cell>
                    </Grid>
                </Tab>
            </Tabs>
            <Modal show={this.state.confirmSubmit} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm If The Below Informations Are Correct</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div style={{fontSize:"14px", 
                        textAlign:"center",
                        background:`${this.state.storeColor}`,
                        color:`${this.state.textColor}`,
                        padding: "5px 20px",
                        borderRadius:"10px"
                    }}>
                        {this.state.company}
                    </div>
                    <br/>
                    <Grid >
                        <Cell col={6}> 
                            <p>{`Email: ${this.state.email}`}</p>
                            <p>{`Tel: ${this.state.tel}`}</p>
                            <p>{`Tel2: ${this.state.tel2}`}</p>
                            <p>{`Tax: ${this.state.tax}`}</p>

                        </Cell>
                        <Cell col={6}>
                            <p>{`Shipping: ${this.state.shipping}`}</p>
                            <p>{`Express: ${this.state.express}`}</p>
                            <p> {`Address: ${this.state.streetAddress} ${this.state.city} ${this.state.countryOrState} ${this.state.zip}`}</p>


                        </Cell>
                        
                    </Grid>
               
            </Modal.Body>
            <Modal.Footer>
                <Button style={{background:"red", color:"#fff",  margin:"0 5px"}} onClick={this.handleClose}>
                Edit
                </Button>
                <Button style={{background:"Green", color:"#fff", margin:"0 5px"}} onClick={this.handleConfirmSubmit}>
                Confirm
                </Button>
            </Modal.Footer>
            </Modal>
     
        </div>
        )
    }
}


StoreRegistration.propTypes = {
    adminAuth: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    adminAuth: state.adminAuth,
    errors: state.errors,
    registerStore: state.registerStore
  });
  export default connect(
    mapStateToProps
  )(withRouter(StoreRegistration));