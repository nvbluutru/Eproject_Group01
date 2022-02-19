
const overFolow = (content, length) => {
    if (content.length > length) {
        content = content.substring(0, length) + "...";
    }
    return content;
}
const renderProducts = (data, element) => {
    if (data.length > 0) {
        const contentHTML = data.reduce((content, item) => {
            const discount = item.price * ((100 - item.promotion) / 100);
            content += `<div class="products__item">
        <div class="products__discount">
            Giảm ${item.promotion}%
        </div>
        <div class="products__img">
            <a href="./page/view_detail.html?id=${item.id}">
                <img src=" ${item.imageThumb}" alt="">
            </a>
        </div>
        <h3 class="products__title"><a href="#">${overFolow(item.name, 29)}</a></h3>
        <div class="products__price">
            <span>${fomatVnd(discount)}</span>
            <span>${fomatVnd(item.price)}</span>
        </div>
        <div class="products__note">${overFolow(item.specifications.material, 30)}</div>
        <div class="products__evaluate">
            <div class="products__star">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <span>${item.evaluate.length} đánh giá</span>
            <div class="products__add" data-id="${item.id}"><i class="fa fa-cart-plus"></i></div>
        </div>
    </div>`
            return content;
        }, "")
        element.innerHTML = contentHTML;
    }
}
const productsFlashSale = (data) => {
    const newData = data.filter((item) => { return item.promotion >= 50 }).slice(0, 5);
    renderProducts(newData, getEle("#flashSale"));
}
const findSearchProducts = (data, value) => {
    return data.filter((item) => {
        const name = item.name.toUpperCase();
        return name.includes(value);
    });
}
const renderSearch = (event, data) => {
    const valueSearch = event.target.value.toUpperCase();
    let newData = findSearchProducts(data, valueSearch);
    if (valueSearch.trim() == "") {
        newData = [];
    }
    let printSeach = getEle("#search");
    if (newData.length > 0) {
        const resultHTML = newData.reduce((content, item) => {
            const discount = item.price * ((100 - item.promotion) / 100);
            content += `
            <a href="./page/view_detail.html" class="header__search--item">
                <img src="${item.imageThumb}"
                    alt="">
                <div class="header__search--content">
                    <p class="header__search--name">${item.name}</p>
                    <div>
                        <p class="header__search--price">${fomatVnd(discount)}</p>
                        <p class="header__search--discount">${fomatVnd(item.price)}</p>
                    </div>
                </div>
            </a>`
            return content
        }, "")
        printSeach.innerHTML = resultHTML;
    } else {
        printSeach.innerHTML = "";
    }
}

const main = async () => {
    const post = await fetch("http://127.0.0.1:5501/Eproject_Group01/js/data/data.json");
    const data = await post.json();
    renderProducts(data.products, getEle("#products"));
    productsFlashSale(data.products);
    const inputSearch = getEle("#search-products");
    inputSearch.addEventListener("keyup", (event) => { renderSearch(event, data.products) });
    const buttonAddCart = document.querySelectorAll(".products__add");
    buttonAddCart.forEach(item => item.addEventListener("click", (event) => { addShoppingCart(event, data.products) }));
}
main();
