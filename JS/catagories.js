// load All Blogs data
const loadAllBlogs = async (id, name) => {
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${ id }`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayBlogPost(data.data, name);
    }
    catch (error) {
        console.log('Error');
    }
    toggleLoader(false);
}

// display all blog
const displayBlogPost = (data, name) => {

    let countPost = [];
    const newsBox = document.getElementById('news-box');
    const categoryName = document.getElementById('categories-name');
    categoryName.textContent = name;

    newsBox.innerHTML = '';
    data.sort((s1, s2) => s2.total_view - s1.total_view).forEach(news => {
        // push new items
        countPost.push(news);

        // Destructure
        const { author, _id, details, image_url, thumbnail_url, title, total_view } = news;
        const { img, name, published_date } = author;
        const publishedDay = new Date(published_date);;
        let day = publishedDay.getDay();

        const col = document.createElement('div');
        col.classList.add('col-md-12');
        col.innerHTML = `<div class="row g-0 border rounded flex-md-row mb-4 shadow-sm h-md-250">
                        <div class="col-auto d-block">
                            <img src="${ thumbnail_url }" class="img-fluid" id="thumbnail_image">
                        </div>
                        <div class="col p-4 d-flex flex-column position-static">
                            <h3 class="mb-0">${ title.length > 50 ? title.slice(0, 48) + '...' : title }</h3>
                            <div class="my-2 text-muted">0${ day } Days Ago</div>
                            <p class="card-text mb-auto">${ details.length > 300 ? details.slice(0, 250) + '...' : details }</p>
                            <div class="d-flex justify-content-between align-items-center gx-md-5">
                                <div>
                                    <img width="50" class="rounded-circle d-inline-block"
                                        src="${ img }">
                                    <span class="fs-6 fw-semibold ms-2">${ name ? name : "Name not Found!" }</span>
                                </div>
                                <div>
                                    <img src="images/eye.svg" width="25">
                                    <span class="fs-6 ms-1">${ total_view ? total_view : "No View" }</span>
                                </div>
                                <div>
                                    <button onclick="detailsNews('${ _id }')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">learn More</button>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;

        newsBox.appendChild(col);
    })
    toggleLoader(false);
    // show categories item and categories name
    const itemNumberEl = document.getElementById('items-number');
    itemNumberEl.textContent = countPost.length;
}

//=====> Modal Data API ID
const detailsNews = async newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${ newsId }`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        loadBlogs(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}



const loadBlogs = (newDetails) => {
    const { author, details, image_url, title, total_view } = newDetails;
    const { img, name, published_date } = author;

    const publishedDay = new Date(published_date);;
    let day = publishedDay.getDay();

    const modalBody = document.getElementById('modal-inner-body');
    const card = document.createElement('div');
    modalBody.innerHTML = '';
    card.classList.add('card');
    card.innerHTML = `
        <img src="${ image_url ? image_url : "Image not Found!" }" class="card-img-top" alt="...">
        <div class="d-flex justify-content-around align-items-center gx-md-5 py-3">
                <p class="m-2 text-muted">0${ day } Days Ago</p>
                <div>
                    <img width="50" class="rounded-circle d-inline-block" src="${ img }">
                    <span class="fw-semibold ms-2">${ name ? name : "Name not Found!" }</span>
                </div>
                <div>
                    <img src="images/eye.svg" width="25">
                    <span class="fs-6 ms-1">${ total_view ? total_view : "No View" }</span>
                </div>

            </div>
        <div class="card-body">
            <h5 class="card-title fw-semibold py-2">${ title ? title : "title not Found!" }</h5>
            <p class="card-text">${ details ? details : "Details not Found!" }</p>
        </div>
        `;
    modalBody.appendChild(card);
};

//====> add / remove spinner class function
const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('display-loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

//=======> Default Display
loadAllBlogs('01');
