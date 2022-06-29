async function getAllUsers() {
    try {
        //UPDATE WITH SERVER LINK
        const options = {headers: new Headers({'Authorization': localStorage.getItem('token')})}
        const response = await fetch('https://callback-cats-server.herokuapp.com/users', options);
        const data = await response.json();
        return data;
    
    } catch (err) {
        console.warn(err);
    }
}
