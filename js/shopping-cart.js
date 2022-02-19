
const countOrder = () => {
    let length = "";
    if (getLocalStorage("shopping-cart")) {
        length = getLocalStorage("shopping-cart").length
    }
    getEle(".header__shopping--count").innerHTML = length;
}
const addShoppingCart = (event, data) => {
    const idProduct = event.target.parentElement.dataset.id;
    const findID = data.find(item => item.id == idProduct);
    const status = localStorage.getItem("shopping-cart");
    const arrId = getLocalStorage("shopping-cart");
    if (findID) {
        const newItem = { id: findID.id, quantity: 1 };
        if (!status || status == "undefined") {
            arrId.push(newItem);
            setLocalStorage(arrId);
        } else {
            let statusId = arrId.findIndex(item => item.id == idProduct);
            if (statusId != -1) {
                arrId[statusId].quantity++;
                setLocalStorage(arrId);
            } else {
                arrId.push(newItem);
                setLocalStorage(arrId);
            }
        }
        renderShoppingCart(data);
    } else {
        console.log("lỗi không tìm thấy id trên hệ thống");
    }
    countOrder();
}
const renderShoppingCart = (data) => {
    const dataLocalStorage = getLocalStorage("shopping-cart");
    const productsCart = getEle(".shopping__products");
    let total = 0;
    if (dataLocalStorage.length > 0) {
        const content = dataLocalStorage.map((item) => {
            const itemProduct = data.find(product => item.id == product.id);
            const discount = itemProduct.price * item.quantity * ((100 - itemProduct.promotion) / 100);
            total += discount;
            return `<div class="shopping__item">
            <div class="shopping__item--left">
                <div class="shopping__item--img">
                    <img src="${itemProduct.imageThumb}" alt="">
                </div>
                <div class="shopping__item--intro">
                    <div class="shopping__item--name">${itemProduct.name}</div>
                    <div class="shopping__item--price"><span>${item.quantity} x </span>${fomatVnd(discount)}</div>
                </div>
            </div>
            <div class="shopping__item--right">
                <i class="fa fa-trash-alt delete-cart" data-id="${itemProduct.id}"></i>
            </div>
        </div>`;
        }).join("");
        productsCart.innerHTML = content;
    } else {
        productsCart.innerHTML = `Không tìm thấy sản phẩm nào!`;
    }
    getEle(".shopping__total span").innerHTML = fomatVnd(total);
    const deleteCart = document.querySelectorAll(".delete-cart");
    deleteCart.forEach((item) => {
        item.addEventListener("click", (event) => { removeShoppingCart(event, data) });
    });
}
const removeShoppingCart = (event, data) => {
    const id = event.target.dataset.id;
    let dataLocalStorage = getLocalStorage("shopping-cart");
    const indexDel = dataLocalStorage.findIndex(item => item.id == id);
    dataLocalStorage.splice(indexDel, 1);
    setLocalStorage(dataLocalStorage);
    renderShoppingCart(data);
    countOrder();
}
const changeActiveCart = () => {
    const statusCart = getEle(".shopping");
    statusCart.classList.toggle("active");
}
const mainShopping = async () => {
    const post = await fetch("http://127.0.0.1:5501/Eproject_Group01/js/data/data.json");
    const data = await post.json();
    renderShoppingCart(data.products);
    countOrder();
    const buttonViewCart = getEle("#view-cart");
    buttonViewCart.addEventListener("click", changeActiveCart);
    const closeButtonViewCart = document.querySelectorAll("#closeCart, .shopping__black");
    closeButtonViewCart.forEach(item => item.addEventListener("click", changeActiveCart));
}
mainShopping();