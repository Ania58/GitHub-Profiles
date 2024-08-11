const APIURL = 'https://api.github.com/users/'
const userInput = document.getElementById('search-user')
const infoContainer = document.getElementById('info-container') 


const fetchUser = async(userName) => {
    try {
        const getUser = await axios(`${APIURL}${userName}`)
    
        const repositories = await  fetchProjects(userName)
        
        const userData = {
            name: getUser.data.name,
            bio: getUser.data.bio,
            image: getUser.data.avatar_url,
            followers: getUser.data.followers,
            following: getUser.data.following,
            repositories: repositories.data
        }
        return userData
        
    } catch (error) {
        console.log('Error fetching data ', error.message)
    }
}
const fetchProjects = async (userName) => {
    const getUser2 = await axios(`${APIURL}${userName}/repos`)
    return getUser2
}
const showUserData = async (userInput) => {
    
    const dataUser = await fetchUser(userInput)
    const {name,bio,image,followers,following,repositories} = dataUser
    // console.log(repositories);
    const repos = repositories.slice(repositories.length - 5,repositories.length).map(rep => `<a href="${rep.clone_url}">${rep.name}</a>`).join('') //LUEGO OTRO DIA CUANDO ESTES MAS FRESH LO VAMOS A EXPLICAR
    console.log(repositories[0]);
    
    
    
    const template = `
    <div class="user-details">
        <img src="${image}"/>
        <h1>${name}</h1>
        <p>${bio}</p>
        <p>${followers}<span>Followers</span></p>
        <p>${following}<span>Following</span></p>
        <div class='repos'>
        ${repos}
        </div>
    </div>
    `
    
    infoContainer.innerHTML = template
    
    
}

userInput.addEventListener('change', () => {
    const getUserInput = userInput.value
    
    showUserData(getUserInput) 
} )



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
        <p>${followers}<span>Followers</span></p>
        <p>${following}<span>Following</span></p>
        <p>${repositories}<span>Repos</span></p>
    </div>
    `
*/