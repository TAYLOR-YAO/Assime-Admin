import React, {Component } from "react";
import {Button,  Collapse, Well, Panel} from "react-bootstrap";
import "./ItemDetails.css";
export default class ItemDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }
    
    render(){
        return(
            <div className="itemDetailsWell">
                <Button
                    className="item-details-button"
                    bsStyle="link"
                    onClick={()=>this.setState({
                        open: !this.state.open
                    })}
                >
                    {this.state.open === false ? `See `:`Hide `} Item details
                    {this.state.open === false ? ` +` : ` -`}
                </Button>
                <Collapse in={this.state.open}>
                    <div>
                        <Well >
                            <Panel >
                                <Panel.Body>{this.props.details}</Panel.Body>
                            </Panel>
                        </Well>
                    </div>
                </Collapse>
            </div>
        )
    }
}