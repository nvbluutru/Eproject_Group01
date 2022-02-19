window.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".lds-wrapper");
    loader.className += " active"; // class "loader hidden"
});

// let contact = document.querySelector(".contact");
// const contactToggle = document.querySelector(".contact__toggle");
// let toggleIcon = contactToggle.querySelector("i");
// contactToggle.addEventListener("click", function () {
//     toggleIcon.classList = toggleIcon.classList == "fas fa-angle-double-right" ? "fas fa-angle-double-left" : "fas fa-angle-double-right";
//     contact.classList.toggle("active");
// })
let headerContent = document.querySelector(".header__content");
$(window).scroll(() => {
    if ($("body,html").scrollTop() > 40) {
        headerContent.classList.add("active-mobile");
    } else {
        headerContent.classList.remove("active-mobile");
    }
})