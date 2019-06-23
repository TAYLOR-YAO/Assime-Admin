import React,{Component} from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {Row, Col} from "react-bootstrap";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./OrderReview.css";
const valide = localStorage.getItem("identifiedSore");
function valideted(){
    if(valide){
       return JSON.parse(valide);
    } else {
        return ""
    }
}

class OrderReview extends Component{
    constructor(props){
        super(props)
        this.state = {
            companyOption: null,
            orders:[],
            companies:[],
            productsValue:"",
            id:"",
            qty:""
        }
    }

    componentDidMount (){
        axios.get(`api/delivered/?storeId=${valideted()._id}`).then(response=>{      
            const ordersValue =[]
            response.data.map(item=>
                ordersValue.push(item.quantity * item.price.$numberDecimal)
            )
            this.setState({
                orders: response.data,
                productsValue: ordersValue.reduce((a, b) => a + b, 0).toFixed(2)
            });
        });
    }

    handleCheck(event) {
        event.preventDefault();
        const item = JSON.parse(event.currentTarget.dataset.item);
        axios.post("api/Delivered", item).then(response=>{
        }).catch(err=>{
            console.log(err.message)
        })
    }

    render(){
        return(<div>
            <div style={{textAlign:"center"}}><h3>Delivered orders</h3> </div>
            <div className="container">
                <h5>{`All Delivered by ${valideted().company}`}</h5>
                {/* <h1>{this.generalInventory}</h1> */}
                <Row className="show-grid">
                    <Col md={6} >
                    <div className="productsvalue">
                    Total Value:
                    </div>                    
                    </Col>
                    <Col md={6}>
                        <div className="productsvalue" style={{textAlign:"right", textDecoration:"underline", fontFamily:"Impact"}}>
                        {this.state.productsValue}
                        </div>
                    </Col>
                </Row>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Item Name</Th>
                            <Th>Brand</Th>                                    
                            <Th>Color</Th>
                            <Th>Qty</Th>                                                   
                            <Th>Both price</Th>                         
                        </Tr>
                    </Thead>
                    <Tbody>
                        { this.state.orders.map(product=>(
                            <Tr key={product._id}>
                                <Td>{product.name}</Td>
                                <Td>{product.brand}</Td>                
                                <Td>{product.color}</Td>
                                <Td>{product.quantity}</Td>                                
                                <Td className="both-price">{(product.price.$numberDecimal * product.quantity).toFixed(2)}</Td>
                            </Tr>
                        ))
                        }
                    </Tbody>
                </Table>
                
            </div>
        </div>            
        )
    }
}

export default OrderReview;
