// Load All Catagories
const loadAllCatagories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
// set catagories items
const displayCatagories = async () => {
    const data = await loadAllCatagories();
    const categoryItems = data.data.news_category;
    for (const item of categoryItems) {
        const AllItemsEl = document.getElementById('catagories-items');
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <button class="btn btn-outline-warning fw-semibold" onclick="loadAllBlogs('${ item.category_id }','${ item.category_name }')">
        ${ item.category_name }
        </button>`;

        AllItemsEl.appendChild(li);
    }

}

// Show all Catagories
displayCatagories();

