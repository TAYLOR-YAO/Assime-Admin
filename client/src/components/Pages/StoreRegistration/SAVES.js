ClearAllInventory = event =>{
    axios.delete("api/clearallproducts").then(result=>{
    });
}

ClearStoreInventory = event =>{
    const {deleteStoreId} = this.state;
    const data = {
        id: deleteStoreId
    }
axios.post("api/clearstoreproducts",data).then(result=>{
});
}