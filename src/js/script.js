


movies.splice(100);  /// slice 100 elements from db


/////////////  Normalize all movies  /////////////////////////////////
const allMovies = movies.map((el) => {
    return {
        title: el.title,
        year: el.year,
        categories: el.categories,
        lang: el.language,
        time: `${Math.round(el.runtime/60)}h ${el.runtime%60}m`,
        link: `https://youtube.com/embed/${el.youtubeId}`,
        summary: el.summary,
        rating: el.imdbRating,
        id: el.imdbId,
        minImg: el.smallThumbnail,
        maxImg: el.bigThumbnail
    }
})


/////////////  Render all movies  ////////////////////////


function renderAllMovies(data){
    if(data.length){
        $('#res').textContent = data.length;
        data.forEach((e) => {

            const div = createElement('div', 'card bg-white shadow w-[290px] rounded-lg overflow-hidden', `
                <img class="h-[250px] w-full object-cover object-center" src="${e.minImg}" alt="image">
                <div class="card-body p-4">
                    <h2 class="text-lg font-bold">${e.title}</h2>
                    <ul>
                        <li class="text-yellow-400"><strong class="text-black">Rating:</strong>
                            ${"<i class='bx bxs-star'></i>".repeat(Math.ceil(e.rating/2))};
                            
                        </li>
                        <li><strong>Year:</strong> ${e.year}</li>
                        <li><strong>Language:</strong> ${e.lang}</li>
                        <li><strong>Runtime:</strong> ${e.time}</li>
                        <li><strong>Category:</strong> ${e.categories}</li>
                    </ul>
                    <button class="bg-cyan-700 text-white rounded-xl mt-4 me-3 focus:ring-2 ring-cyan-500 px-3 py-1">Details</button>
                    <a href="${e.link}" target="_blank" class="bg-red-700 text-white rounded-xl mt-4 me-3 focus:ring-2 ring-red-500 px-3 py-1">Details</a>
                </div>
            `)

            $(".film-wrapper").append(div);
        })
    }else {
        $(".film-wrapper").innerHTML = "<h1 class='text-2xl text-red-500'>Sorry! The film is not available!</h1>"
    }
}

renderAllMovies(allMovies)



/////////////  Render all categories  ////////////////////////

let category = [];
function getCategory(data){
    if(data.length > 0){
        data.forEach((el) => {
            el.categories.forEach((item) => {
                category.push(item)
            })
        })
    }
}

getCategory(allMovies)
const uniqueCategory = Array.from(new Set(category));

uniqueCategory.sort().forEach((el) => {
    let option = createElement('option', 'item', el);
    $("#category").append(option)
})

/////////////  Global search  ////////////////////////

$('#global_search').addEventListener('keyup', (e) => {
    $('#res_block').classList.remove('hidden');
    $(".film-wrapper").innerHTML = "";

    if(!e.target.value.length){
        $('#res_block').classList.add('hidden');
    }
    const filterFilm = allMovies.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase())
    })

    renderAllMovies(filterFilm);
})

/////////////  Filter search  ////////////////////////

function findMovies(title, rating, category){

    if(!(title || rating || category)){
        $('#res_block').classList.add('hidden');
    }
    
    const filterFilm = allMovies.filter((item) => {
        return item.title.toLowerCase().includes(title.toLowerCase()) && item.rating >= rating && item.categories.includes(category);
    })

   
    renderAllMovies(filterFilm)
}

$('#search_btn').addEventListener('click', () => {
    
    $(".film-wrapper").innerHTML = "";
    const searchStr = $('#title').value;
    const rating = $('#rating').value;
    const category = $('#category').value;

    findMovies(searchStr, rating, category);
})