function start() {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'

    //---電影分類---

    const movieGenres = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
    }
    const data = []
    const movieClass = document.getElementById('movieClass')
    const dataDisplay = document.getElementById('dataDisplay')
    let nowClassNum = 1
    let movieGenreData = []







    //---印資料---

    axios.get(INDEX_URL).then((response) => {
        data.push(...response.data.results)
        displayMovieClass(movieGenres)
        changeMovieClassList(data, 'genres', nowClassNum)
        console.log(data)

    }).catch((err) => console.log(err))

    movieClass.addEventListener('click', (event) => {
        let nowMovieClass = event.target.textContent
        nowClassNum = Object.values(movieGenres).indexOf(nowMovieClass) + 1
        changeMovieClassList(data, 'genres', nowClassNum)
    })

    //---印電影分類列表---

    function displayMovieClass(movieGenres) {
        let html = ''
        for (let key in movieGenres) {
            html += `
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-light btn-block">${movieGenres[key]}</button>
                
            </div>`
            movieClass.innerHTML = html
        }
    }

    //---改變電影類別
    //data為api拿到的資料 prop為資料裡要拿的屬性 nowClassNum為當前使用者選擇的電影類別
    function changeMovieClassList(data, prop, nowClassNum) {
        let result = []

        data.map((el) => {
            //el[prop]是因為el出來的東西是一個物件 再把prop當作索引去拿物件的值
            //而剛好那個值又是陣列所以須要再使用includes去處理
            if (el[prop].includes(nowClassNum)) {
                result.push(el);
            }
        })

        movieDisplay(result)

    }


    //---電影資料渲染---
    function movieDisplay(data) {
        let html = ''
        data.forEach(item => {

            movieGenreData = item['genres']
            console.log(movieGenreData)


            html += `
            <div class="col-sm-3">
              <div class="card mb-2">
                <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
                <div class="card-body movie-item-body">
                  <h6 class="card-title">${item.title}</h5>
                </div>
                 
               
                <div  id="classTag">
                    ${MovieClassHTML(movieGenreData)}
                </div>
              </div>
              
            </div>
          `
            dataDisplay.innerHTML = html
        })
    }
    //---電影分類標籤---
    function MovieClassHTML(data) {
        let classhtml = ''
        // for (i = 0; i < data.length; i++) {
        //     classhrml += '<button type="button" class="btn btn-success">aaa</button>'
        // }
        data.forEach((el) => {
            let movieClassName = Object.values(movieGenres)[el - 1]

            classhtml += `<h6 style='margin:4% ;background-color:honeydew'>${movieClassName}</h6>`
        })

        return classhtml
    }



}


start()