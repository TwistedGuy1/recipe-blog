

const api='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007'


 fetch(api).then(response=>response.json()).then(data=>{console.log(data)})
.catch(error=>console.log(error))


