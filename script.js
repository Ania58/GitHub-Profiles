const APIURL = 'https://api.github.com/users/'
const userInput = document.getElementById('search-user')
const infoContainer = document.getElementById('info-container') 


const fetchUser = async(userName) => {
    userInput.value = '' // limpiamos el input
    try {
        const getUser = await axios(`${APIURL}${userName}`)
        console.log(`${APIURL}${userName}`);
        
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
    const reposSorted = sortRepos([...repositories])

    const repos = reposSorted.slice(repositories.length - 5,repositories.length).map(rep => `<a href="${rep.clone_url}">${rep.name}</a>`).join('') 
    
    dataUser ? infoContainer.classList.add('showInfo-container') : null
     
    
    
    
    const template = `
    <div class="user-details">
        <div class>
            <img src="${image}" class="user-photo" alt="user-photo"/>
        </div>
        <div class="user-info">
            <h1>${name}</h1>
            <p class="user-bio">${bio ? bio : 'Bio'}</p>
            <div class='issue-container'>
            <p class="user-followers">${followers}<span>Followers</span></p>
            <p class="user-following">${following}<span>Following</span></p>
            <p class="user-following">${repositories.length}<span>reps</span></p>
            </div>
            <div class='repos'>
            ${repos}
            </div>
        </div>
    </div>
    `
    
    infoContainer.innerHTML = template
    
    
}

userInput.addEventListener('keyup', (e) => {
    const getUserInput = userInput.value
    
    
    e.key === 'Enter' ? showUserData(getUserInput) : null
    
    
} )

const sortRepos = (repos) => {
     const reposSorted = repos.sort((a,b) => new Date(a.updated_at).getTime()  - new Date(b.updated_at).getTime())
     return reposSorted
    
}

//const data = new Date('2024-06-10T19:29:17Z')
//sconsole.log(data.getTime() / 1000);



// const userData = {
//     name: data.name,
//     bio: data.bio,
//     image: data.avatar_url,
//     followers: data.followers,
//     following: data.following,
//     repositories: data.public_repos
// }
// const template = `
//     <div class="user-details">
//         <img>${image}
//         <h1>${name}</h1>
//         <p>${followers}<span>Followers</span></p>
//         <p>${following}<span>Following</span></p>
//         <p>${repositories}<span>Repos</span></p>
//     </div>
//     `
