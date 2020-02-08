function CheckSessionStorage(state) {
    if(sessionStorage.getItem("userData")){
        console.log("Call user feed");
    }
    else{
        state({redirect: true});
    }
}

export default CheckSessionStorage;
