// Load All Catagories
const loadAllCatagories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


// set catagories items
const displayLoadCatagories = async () => {
    const data = await loadAllCatagories();
    const categoryItems = data.data.news_category;
    for (const item of categoryItems) {
        // console.log(item);

        const AllItemsEl = document.getElementById('catagories-items');
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `<a class="nav-link" href="${ item.category_id }">${ item.category_name }</a>`;

        AllItemsEl.appendChild(li);
    }

}


displayLoadCatagories();


/*{
    "status": true,
    "data": {
        "news_category": [
            {
                "category_id": "01",
                "category_name": "Breaking News"
            },
            {
                "category_id": "02",
                "category_name": "Regular News"
            },
            {
                "category_id": "03",
                "category_name": "International News"
            },
            {
                "category_id": "04",
                "category_name": "Sports"
            },
            {
                "category_id": "05",
                "category_name": "Entertainment"
            },
            {
                "category_id": "06",
                "category_name": "Culture"
            },
            {
                "category_id": "07",
                "category_name": "Arts"
            },
            {
                "category_id": "08",
                "category_name": "All News"
            }
        ]
    }
} */
