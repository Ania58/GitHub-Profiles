const APIURL = 'https://api.github.com/users/'


const fetchUser = async() => {
    try {
        const getUser = await axios(`${APIURL}ania58`)
        console.log(getUser);
        const user = 'ania58'
        const getUser2 = await axios(`${APIURL}${user}/repos`)
        console.log(getUser2);
        
    } catch (error) {
        console.log('Error fetching data ', error.message)
    }
}

fetchUser()