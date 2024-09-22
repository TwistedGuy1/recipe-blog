const gInput=document.querySelector("#cInput")
const gButton=document.querySelector("#click")
const cockTailList=document.querySelector('.cocktail-list')
const closeBtn=document.querySelector('.closeBtn')
const details=document.querySelector('.details-content')
const detailsContainer=document.querySelector('.sContainer')



gButton.addEventListener('click',async()=>{
    const cocktailName=gInput.value.trim()
    if(cocktailName){
        const drinks=await searchByCocktailName(cocktailName)
        displayCocktails(drinks)
    }
})

cockTailList.addEventListener('click',async(e)=>{
    const getClass=e.target.closest(".cocktail-item")
    if(getClass){
        const cocktailID=getClass.dataset.id
        const cocktail=await getCocktailDetails(cocktailID)
        if(cocktail){
            showCocktailDetails(cocktail)
        }
    }
})

async function searchByCocktailName(cocktailName){
    // const drink='margarita'
    const api=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    try{
    const fetchUrl= await fetch(api)
    const res=await fetchUrl.json()
    return res.drinks||[]
    // console.log(res)
    }
    catch(error){
        console.log(error)
        return []
    }
}

async function getCocktailDetails(cocktailID){
    try{
    const api=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`
    const fetchUrl=await fetch(api)
    const res=await fetchUrl.json()
    return res.drinks[0]
    }
    catch(error){
        console.log("Error is: ",error)
    }

}

function displayCocktails(drinks){
    cockTailList.innerHTML=''
    // if(meals){                           //if(arr of obj of api){}
    //     meals.forEach((meal)=>{
    if(drinks){
        drinks.map(val=>{
        
        const newDrink=document.createElement('div')
        newDrink.classList.add('cocktail-item')
        newDrink.dataset.id=val.idDrink
        newDrink.innerHTML=`
        <img src=${val.strDrinkThumb}>
        <h3>${val.strDrink}</h3>
        <h4>${val.strAlcoholic}</h4>
        `
        cockTailList.appendChild(newDrink)
    })
}


else{
    cockTailList.innerHTML=`<p>No cocktails for your input has been found! Please try other names</p>`
}
}

function showCocktailDetails(val){
    console.log(val)

    details.innerHTML=`
    <img src="${val.strDrinkThumb}">
    <h3>${val.strDrink}</h3>

    <h4>${val.strInstructions}</h4>
    <h5>${val.strCategory}</h5>
    `
    detailsContainer.style.display='flex'

    
}

closeBtn.addEventListener('click',()=>{
    detailsContainer.style.display='none'
})



gInput.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        e.preventDefault()
        performSearch()
    }
})

async function performSearch(){
    const cocktail = gInput.value.trim()
    if(cocktail){
        const getCocktail=await searchByCocktailName(cocktail)
        displayCocktails(getCocktail)
    }
}


