window.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".lds-wrapper");
    loader.className += " active"; // class "loader hidden"
});
let headerContent = document.querySelector(".header__content");
$(window).scroll(() => {
    if ($("body,html").scrollTop() > 40) {
        headerContent.classList.add("active-mobile");
    } else {
        headerContent.classList.remove("active-mobile");
    }
})
const getEle = (selector) => {
    return document.querySelector(selector);
}
const fomatVnd = (price) => {
    return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}
const setLocalStorage = (arr) => {
    localStorage.setItem("shopping-cart", JSON.stringify(arr));
}
const getLocalStorage = (name) => {
    if (localStorage.getItem(name) && localStorage.getItem(name) != "undefined") {
        return JSON.parse(localStorage.getItem(name));
    } else {
        return [];
    }
}