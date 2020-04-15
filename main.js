const inputMovie = document.querySelector('.movie')
const btn = document.querySelector('.btn')
const list = document.querySelector('.list')

btn.addEventListener('click', ()=>{
    const name = inputMovie.value
    let request = new XMLHttpRequest();
    const name2 = name.replace(' ', '+')
    request.open('GET', "http://www.omdbapi.com/?s="+name2+"&apikey=27a2dce7&type=movie")
    request.send();
    request.onload = () =>{
    if (request.status === 200){
        const data = JSON.parse(request.response)
        console.log(data)
        Results(data)
    }
    else{
        list.innerHTML=''
        const p = document.createElement('p')
        p.innerHTML = `Invalid search.` + request.status
        const li = document.createElement('li')
        li.appendChild(p)
        list.appendChild(li)
    }
    
}
})

const Results = (data)=>{
    let titulos = []
    const results = data.Search
    for (result of results){
        const {imdbID} = result
        titulos.push(imdbID)
    }
    console.log(titulos)
    Tratar(titulos)
}

const Tratar = (result)=>{
    let itens = []
   


    for (e of result){
        let request = new XMLHttpRequest();
        request.open('GET', "http://www.omdbapi.com/?i="+e+"&apikey=27a2dce7&type=movie")
        request.send();
        request.onload = () =>{
        if (request.status === 200){
        let tratados = JSON.parse(request.response)
        let {Title, Year, Director, Plot, Poster, Actors} = tratados
        const pos = document.createElement('img')
        pos.setAttribute('src', Poster)
        const t = document.createElement('p')
        t.innerHTML = 'Title: ' + Title
        const a = document.createElement('p')
        a.innerHTML = 'Year: ' +Year
        let li = document.createElement('li')
        const d = document.createElement('p')
        d.innerHTML ='Director: ' + Director
        const pl = document.createElement('p')
        pl.innerHTML ='Plot: ' + Plot
        const act = document.createElement('p')
        act.innerHTML = 'Actors: ' + Actors
        li.setAttribute('class', 'list-group-item')
        li.appendChild(pos)
        li.appendChild(t)
        li.appendChild(a)
        li.appendChild(d)
        li.appendChild(pl)
        li.appendChild(act)
        itens.push(li)
        criarli(itens)
        console.log(tratados)   
    }
    else{
        list.innerHTML=''
        const p = document.createElement('p')
        p.innerHTML = `Invalid search.` + request.status
        const li = document.createElement('li')
        li.appendChild(p)
        list.appendChild(li)
    }
    }}
   
}

const criarli =(itens) =>{
    list.innerHTML=""
    for (i of itens){
        list.appendChild(i)
    }
}