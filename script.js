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

/*

const userData = {
    name: data.name,
    bio: data.bio,
    image: data.avatar_url,
    followers: data.followers,
    following: data.following,
    repositories: data.public_repos
}
const template = `
    <div class="user-details">
        <img>${image}
        <h1>${name}</h1>
        <p>${followers}<strong>Followers</strong></p>
        <p>${following}<strong>Following</strong></p>
        <p>${repositories}<strong>Repos</strong></p>
    </div>
    `
*/