
const paragraphs = document.querySelectorAll('p');
console.log('Кількість параграфів <p>:', paragraphs.length);


const headersH2 = document.querySelectorAll('h2');
console.log('Кількість заголовків <h2>:', headersH2.length);


const bodyElement = document.body;
const bodyStyle = getComputedStyle(bodyElement);
console.log('Body background-color:', bodyStyle.backgroundColor);


const headerH1 = document.querySelector('h1');

if (headerH1) {
    const h1Style = getComputedStyle(headerH1);
    console.log('H1 font-size:', h1Style.fontSize);
} else {
    console.log('Тег <h1> не знайдено на сторінці.');
}

const interactiveElements = document.querySelectorAll('p, h2');

interactiveElements.forEach(element => {
    let originalColor = ''; 


    element.addEventListener('mouseenter', () => {
        
        originalColor = getComputedStyle(element).backgroundColor;
  
        element.style.backgroundColor = 'red';
    });


    element.addEventListener('mouseleave', () => {
       
        element.style.backgroundColor = originalColor;
   
    });
});

// Ждем загрузку страницы
window.addEventListener('load', () => {
    
    // Запускаем таймер на 5 секунд (5000 мс)
    setTimeout(() => {
        addImagesToGallery();
    }, 5000);

});

function addImagesToGallery() {
    let imagesUrl = [
        "https://picsum.photos/200/300?random=1",
        "https://picsum.photos/200/300?random=2",
        "https://picsum.photos/200/300?random=3",
        "https://picsum.photos/200/300?random=4"
    ];

   const galleryContainer = document.querySelector('.gallery');

    const fragment = document.createDocumentFragment();


    imagesUrl.forEach((url, index) => {

        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = "Image " + (index + 1);
        
  
        imgElement.style.margin = "10px";
        imgElement.style.width = "150px"; 

   
        
        setTimeout(() => {
            
            galleryContainer.appendChild(imgElement);
            
        }, index * 1000);
    });

    
    console.log("Функція створення галереї запущена!");
}