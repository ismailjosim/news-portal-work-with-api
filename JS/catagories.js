// load All Blogs data
const loadAllBlogs = (id, name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${ id }`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBlogPost(data.data, name));


}

// display all blog
const displayBlogPost = (data, name) => {

    let countPost = [];
    const newsBox = document.getElementById('news-box');
    const categoryName = document.getElementById('categories-name');
    categoryName.textContent = name;


    newsBox.innerHTML = '';
    data.forEach(news => {
        // push new items
        countPost.push(news);

        // Destructure
        const { author, _id, details, image_url, thumbnail_url, title, total_view } = news;
        const { img, name, published_date } = author;
        const col = document.createElement('div');
        col.classList.add('col-md-12');
        col.innerHTML = `
                    <div
                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col-auto d-lg-block">
                            <img src="${ thumbnail_url }" class="card-img-top" alt="">
                        </div>
                        <div class="col p-4 d-flex flex-column position-static">
                            <h3 class="mb-0">${ title.length > 50 ? title.slice(0, 48) + '...' : title }</h3>
                            <div class="mb-1 text-muted">${ published_date }</div>
                            <p class="card-text mb-auto">${ details.length > 300 ? details.slice(0, 250) + '...' : details }</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="stretched-link">
                                    <img width="50" class="rounded-circle d-inline-block"
                                        src="${ img }">
                                    <span class="fs-6 fw-semibold ms-2">${ name }</span>
                                </div>
                                <div>
                                    <img src="images/eye.svg" width="25">
                                    <span class="fs-6 ms-1">${ total_view }</span>
                                </div>
                                <div>
                                    <a class="stretched-link" onclick="detailsNews('${ _id }')" data-bs-toggle="modal" data-bs-target="#blogModal">Continue reading</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
        newsBox.appendChild(col);
    })
    // show categories item and categories name
    const itemNumberEl = document.getElementById('items-number');
    itemNumberEl.textContent = countPost.length;
}

const detailsNews = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${ newsId }`;
    const res = await fetch(url);
    const data = await res.json();
    loadBlogs(data.data[0]);
};

const loadBlogs = (newDetails) => {
    const modalTitle = document.getElementById('modalLabel');
    modalTitle.innerText = ``;
    modalTitle.innerText = newDetails.title;
    const modalBody = document.getElementById('modal-body-content');
    modalBody.innerHTML = `
        <p>${ newDetails.details }</p>
    `;
};

