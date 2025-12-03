document.addEventListener('DOMContentLoaded', () => {
    console.log("Головний скрипт завантажено!");

    const paragraphs = document.querySelectorAll('p');
    console.log('Кількість параграфів <p>:', paragraphs.length);

    const headersH2 = document.querySelectorAll('h2');
    console.log('Кількість заголовків <h2>:', headersH2.length);

    const bodyStyle = getComputedStyle(document.body);
    console.log('Body background-color:', bodyStyle.backgroundColor);

    const headerH1 = document.querySelector('h1');
    if (headerH1) {
        const h1Style = getComputedStyle(headerH1);
        console.log('H1 font-size:', h1Style.fontSize);
    }

    const interactiveElements = document.querySelectorAll('p, h2');
    
    interactiveElements.forEach(element => {
        let originalColor = ''; 

        element.addEventListener('mouseenter', () => {
   
            originalColor = getComputedStyle(element).backgroundColor;
  
            element.style.backgroundColor = 'red';
       
            element.style.transition = 'background-color 0.3s';
        });

        element.addEventListener('mouseleave', () => {
        
            element.style.backgroundColor = originalColor;
        });
    });

    // ==========================================
    // ЗАВДАННЯ: Галерея (через 5 секунд)
    // ==========================================
    setTimeout(() => {
        console.log("5 секунд пройшло, починаємо створювати галерею...");
        addImagesToGallery();
    }, 5000);

    function addImagesToGallery() {
    
        const galleryContainer = document.querySelector('.gallery');
        
        if (!galleryContainer) {
            console.error("Помилка: Елемент .gallery не знайдено в HTML!");
            return;
        }

   
        let imagesUrl = [
            "https://picsum.photos/200/300?random=1",
            "https://picsum.photos/200/300?random=2",
            "https://picsum.photos/200/300?random=3",
            "https://picsum.photos/200/300?random=4"
        ];

  
        const fragment = document.createDocumentFragment();

        imagesUrl.forEach((url, index) => {
           setTimeout(() => {
                const imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.alt = "Картинка " + (index + 1);
                
               imgElement.style.margin = "10px";
                imgElement.style.width = "150px"; 
                imgElement.style.borderRadius = "8px";
                imgElement.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

                galleryContainer.appendChild(imgElement);
                
            }, index * 1000); // 0с, 1с, 2с, 3с...
        });
    }

    // ==========================================
    // ЗАВДАННЯ: Set (Пошук спільних слів)
    // ==========================================
    let previousSet = null; 

    const checkBtn = document.getElementById('check-btn');
    const wordInput = document.getElementById('word-input');
    const prevTextSpan = document.getElementById('prev-text');
    const commonWordsSpan = document.getElementById('common-words');

    if (checkBtn && wordInput) {
        checkBtn.addEventListener('click', () => {
            const text = wordInput.value.trim();
            
            if (!text) {
                alert("Будь ласка, введіть текст!");
                return; 
            }

            const wordsArray = text.toLowerCase()
                                   .replace(/[.,!?;:"()]/g, '') 
                                   .split(/\s+/)
                                   .filter(word => word.length > 0);

            const currentSet = new Set(wordsArray);

            if (previousSet === null) {
                commonWordsSpan.textContent = "Введіть наступну фразу для порівняння...";
                commonWordsSpan.style.color = "orange";
                prevTextSpan.textContent = `[${Array.from(currentSet).join(', ')}]`;
            } else {
                const commonElements = [...currentSet].filter(word => previousSet.has(word));

                if (commonElements.length > 0) {
                    commonWordsSpan.textContent = commonElements.join(', ');
                    commonWordsSpan.style.color = "green";
                } else {
                    commonWordsSpan.textContent = "Спільних слів не знайдено";
                    commonWordsSpan.style.color = "red";
                }
                
                prevTextSpan.textContent = `[${Array.from(previousSet).join(', ')}] (порівнювали з: ${Array.from(currentSet).join(', ')})`;
            }

            previousSet = currentSet;
            
            wordInput.value = '';
        });
    } else {
        console.error("Елементи для завдання Set не знайдені (check-btn або word-input)!");
    }
});


// ЗАВДАННЯ: Fetch API (APIs.guru)

const apiBtn = document.getElementById('load-api-btn');
const apiListContainer = document.getElementById('api-list');

if (apiBtn) {
    apiBtn.addEventListener('click', loadAPIs);
}


async function loadAPIs() {
    apiListContainer.innerHTML = '<p>Завантаження даних...</p>';

    try {
        const response = await fetch('https://api.apis.guru/v2/list.json');

        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        const data = await response.json();

        apiListContainer.innerHTML = '';

        const apis = Object.values(data).slice(0, 12);

        apis.forEach(apiData => {
           const version = apiData.versions[apiData.preferred];
            const info = version.info;

            const logoUrl = info['x-logo'] ? info['x-logo'].url : 'https://via.placeholder.com/64?text=No+Img';
            
            const card = document.createElement('div');
            card.className = 'api-card';
            
            card.innerHTML = `
                <img src="${logoUrl}" alt="${info.title}" onerror="this.src='https://via.placeholder.com/64?text=Error'">
                <h4>${info.title}</h4>
                <p style="font-size: 12px; color: gray;">Ver: ${version.info.version}</p>
                <a href="${info.contact ? info.contact.url : '#'}" target="_blank" style="font-size: 12px;">Детальніше</a>
            `;

            apiListContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Помилка при отриманні API:', error);
        apiListContainer.innerHTML = `<p style="color: red;">Не вдалося завантажити дані: ${error.message}</p>`;
    }
}