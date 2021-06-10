export const preload = function() {
    window.addEventListener('load', function() {
        const body = document.querySelector('body');
        body.classList.remove('preload');
    });
} 

const link = document.querySelector(".icon-container");

const smoothScroll = function(e) {
    e.preventDefault();
    const href = this.querySelector(".scrollTo").getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
 
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}

link.addEventListener("click", smoothScroll);

//Gallery
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');
let initial = 20;
const amount = 4;
const imagePaths = [
    'image-01.jpg', 'image-02.jpg', 'image-03.jpg', 'image-04.jpg', 'image-05.jpg',
    'image-06.jpg', 'image-07.jpg', 'image-08.jpg', 'image-09.jpg', 'image-10.jpg',
    'image-11.jpg', 'image-12.jpg', 'image-13.jpg', 'image-14.jpg', 'image-15.jpg',
    'image-16.jpg', 'image-17.jpg', 'image-18.jpg', 'image-19.jpg', 'image-20.jpg',
    'image-21.jpg', 'image-22.jpg', 'image-23.jpg', 'image-24.jpg', 'image-25.jpg',
    'image-26.jpg', 'image-27.jpg', 'image-28.jpg', 'image-29.jpg', 'image-30.jpg',
    'image-31.jpg', 'image-32.jpg', 'image-33.jpg', 'image-34.jpg', 'image-35.jpg',
    'image-36.jpg', 'image-37.jpg', 'image-38.jpg', 'image-39.jpg', 'image-40.jpg',
    'image-41.jpg', 'image-42.jpg', 'image-43.jpg', 'image-44.jpg', 'image-45.jpg',
    'image-46.jpg', 'image-47.jpg', 'image-48.jpg', 'image-49.jpg', 'image-50.jpg',
    'image-51.jpg', 'image-52.jpg', 'image-53.jpg', 'image-54.jpg', 'image-55.jpg',
    'image-56.jpg', 'image-57.jpg', 'image-58.jpg', 'image-59.jpg', 'image-60.jpg',
    'image-61.jpg', 'image-62.jpg', 'image-63.jpg', 'image-64.jpg', 'image-65.jpg',
    'image-66.jpg', 'image-67.jpg', 'image-68.jpg', 'image-69.jpg', 'image-70.jpg',
    'image-71.jpg', 'image-72.jpg', 'image-73.jpg', 'image-74.jpg', 'image-75.jpg',
    'image-76.jpg', 'image-77.jpg', 'image-78.jpg', 'image-79.jpg', 'image-80.jpg',
    'image-81.jpg', 'image-82.jpg', 'image-83.jpg', 'image-84.jpg', 'image-85.jpg',
    'image-86.jpg',
];

const getHTML = () => {
    const imagesArray = imagePaths.map((path) => {
        try {
            const image = require(`../../images/${path}`);
            return image;
        } catch(error) {
            return null;
        }
    })

    const html = imagesArray.map(image => {
        if(!image) return ""
        return `
            <a class="image-container slideIn" href="${image}" data-lightbox="gallery">
                <img src="${image}" alt="Image">
                <i class="fas image-icon fa-search-plus"></i>
            </a>
        `        
    });

    return html
}

const getInitialAmount = () => {

    const htmlArray = getHTML();

    const initialHTML = htmlArray.filter((imageHTML, index) => index < initial);
    
    return initialHTML;
}

const render = (getImages) => {
    const images  = getImages();

    if(!images) return;

    images.forEach(image => {
        gallery.insertAdjacentHTML('beforeend', image);
    })
}

const removeButton = () => {
    loadMoreButton.classList.add('hide');
}

const loadMore = function() {    
    const htmlArray = getHTML();
    // console.log("🚀 ~ file: preload.js ~ line 90 ~ loadMore ~ htmlArray", htmlArray)
    if(initial >= htmlArray.length) return;

    let currentAmount = initial + amount; // 15
    
    const html = htmlArray.filter((imageHTML, index) => {
        // console.log("🚀 ~ file: preload.js ~ line 95 ~ html ~ imageHTML", imageHTML, index + 1)
        
        if(index > initial && index <= currentAmount) return imageHTML
    });

    // console.log("🚀 ~ file: preload.js ~ line 84 ~ html ~ html", html, initial, currentAmount, htmlArray.length)
    
    
    initial = currentAmount;

    if(currentAmount >= htmlArray.length) {
        removeButton()
    }; 
    
    // console.log("🚀 ~ file: preload.js ~ line 95 ~ loadMore ~ currentAmount", currentAmount)
    // console.log("🚀 ~ file: preload.js ~ line 94 ~ loadMore ~ initial", initial)
    

    return html 
}

const renderOnScroll = () => {
    if(loadMoreButton.getBoundingClientRect().y + 100 < window.innerHeight) render(loadMore);
}

const debounce = (callback) => {
    window.requestAnimationFrame(function() {
        callback()
    });
}

// const hideBody = (e) => {
//     console.log("🚀 ~ file: preload.js ~ line 131 ~ hideBody ~ e.target.closest('image-container')", e.target.closest('.image-container'))
//     if(e.target.closest('.image-container')) {
//         document.body.classList.add("active")
//         console.log("hello");
//     };
// }
// gallery.addEventListener('click', hideBody);

window.addEventListener('load', render(getInitialAmount));
window.addEventListener('scroll', function() {
    debounce(renderOnScroll);
});
loadMoreButton.addEventListener('click', function(e) {
    e.preventDefault();
    render(loadMore);
});








