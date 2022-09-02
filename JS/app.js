// Load All Catagories
const loadAllCatagories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
// load all blog post
const loadBlogPosts = async () => {
    const url = "https://openapi.programming-hero.com/api/news/category/02";
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// set catagories items
const displayLoadCatagories = async () => {

    const data = await loadAllCatagories();
    const categoryItems = data.data.news_category;

    for (const item of categoryItems) {
        const AllItemsEl = document.getElementById('catagories-items');
        const li = document.createElement('li');

        li.classList.add('nav-item');
        li.innerHTML = `<a class="nav-link" href="${ item.category_id }">${ item.category_name }</a>`;

        AllItemsEl.appendChild(li);
    }

}

// display all blog
const displayBlogPost = async () => {

    const data = await loadBlogPosts();
    const allPost = data.data;

    let countPost = [];
    for (const post of allPost) {

        countPost.push(post);

        // Destructure
        const { author, category_id, details, image_url, others_info, rating, thumbnail_url, title, total_view } = post;
        const { img, name, published_date } = author;

        console.log(post);
        const newsBox = document.getElementById('news-box');
        const col = document.createElement('div');
        col.classList.add('col-md-12');
        col.innerHTML = `
                    <div
                        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col-auto d-lg-block">
                            <img src="${ thumbnail_url }" class="card-img-top"
                                alt="">
                        </div>
                        <div class="col p-4 d-flex flex-column position-static">
                            <strong class="d-inline-block mb-2 text-primary">World</strong>
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
                                    <a href="#" class="stretched-link">Continue reading</a>
                                </div>
                            </div>
                        </div>
                    </div>`;

        newsBox.appendChild(col);

    }
    // show categories item and categories name
    const itemNumberEl = document.getElementById('items-number');
    const categoryNameEl = document.getElementById("categories-name");
    itemNumberEl.textContent = countPost.length;
}

// Show all Catagories
displayLoadCatagories();

displayBlogPost();


