import React, {Component } from "react";
import {Button,  Collapse, Well, Media, Row, Col} from "react-bootstrap";

export default class CustomerInfos extends Component{
    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }
    
    render(){
        return(
            <div style={{color: "#000"}}>
                <Button
                    className="item-details-button"
                    bsStyle="link"
                    onClick={()=>this.setState({
                        open: !this.state.open
                    })}
                >
                    {this.state.open === false ? `See `:`Hide `} customer Infos
                    {this.state.open === false ? ` +` : ` -`}
                </Button>
                <Collapse in={this.state.open}>
                    <div>
                        <Well>
                            <Row >
                                {this.props.customerName}
                            </Row> 
                            <Row >
                               <Col mr={12} >  {this.props.address} </Col>
                            </Row> 
                            <Row >
                            
                            <Media>
                                <Media>
                                    <img width={100}
                                    height={100}
                                    src={this.props.image}
                                    alt="Item"
                                    />
                                    </Media>
                                    <Media.Body>
                                        <h4 style={{textAlign:"center"}}>Item details</h4>
                                        <hr/>
                                        <Row className="show-grid">
                                            <Col md={6}>
                                                <strong>{`Color: ${this.props.color}`}</strong>
                                                <br/>
                                                <strong >{`Size: ${this.props.size}`}</strong>                                            
                                            </Col>
                                            <Col md={6}>
                                            <strong>Qty: {this.props.quantity}</strong>
                                            </Col>
                                        </Row>                               
                                    </Media.Body>
                                </Media>
                            </Row>
                        </Well>
                    </div>
                </Collapse>
            </div>
        )
    }
}