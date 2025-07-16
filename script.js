// Definirea datelor pentru categorii si imaginile aferente
// Asigura-te ca numele folderelor din 'assets/' se potrivesc cu 'id'-urile categoriilor
const categories = [
    {
        id: 'nature',
        name: 'C O L O R',
        description: 'a study of color’s depth and nuance',
        thumbnail: './assets/color/color9.jpeg',
        images: [
            './assets/color/color1.jpeg',
            './assets/color/color2.jpeg',
            './assets/color/color3.jpeg',
            './assets/color/color4.jpeg',
            './assets/color/color5.jpeg',
            './assets/color/color6.jpeg',
            './assets/color/color7.jpeg',
            './assets/color/color8.jpeg',
            './assets/color/color9.jpeg',
            './assets/color/color10.jpeg',
            './assets/color/color11.jpeg',
            './assets/color/color12.jpeg',
            './assets/color/color13.jpeg',
            './assets/color/color14.jpeg',
            './assets/color/color15.jpeg',
            './assets/color/color16.jpeg',
            // Adauga mai multe imagini aici
            // './assets/natura/natura3.jpg',
        ]
    },
    {
        id: 'people',
        name: 'M O N O C H R O M E',
        description: 'timeless studies in light, shadow, and form',
        thumbnail: './assets/monochrome/mono1.jpeg',
        images: [
            './assets/monochrome/mono1.jpeg',
            './assets/monochrome/mono2.jpeg',
            './assets/monochrome/mono3.jpeg',
            './assets/monochrome/mono4.jpeg',
            './assets/monochrome/mono5.jpeg',
            './assets/monochrome/mono6.jpeg',
            './assets/monochrome/mono7.jpeg',
            './assets/monochrome/mono8.jpeg',
            './assets/monochrome/mono9.jpeg',
            './assets/monochrome/mono10.jpeg',
            './assets/monochrome/mono11.jpeg',
            './assets/monochrome/mono12.jpeg',
            './assets/monochrome/mono13.jpeg',
            './assets/monochrome/mono14.jpeg',
            './assets/monochrome/mono15.jpeg',
            './assets/monochrome/mono16.jpeg',
            './assets/monochrome/mono17.jpeg',
            './assets/monochrome/mono18.jpeg',
            './assets/monochrome/mono19.jpeg',
            './assets/monochrome/mono20.jpeg',
            './assets/monochrome/mono21.jpeg',
            './assets/monochrome/mono22.jpeg',
            './assets/monochrome/mono23.jpeg',
            './assets/monochrome/mono24.jpeg',
            './assets/monochrome/mono25.jpeg',
            './assets/monochrome/mono26.jpeg',
            './assets/monochrome/mono27.jpeg',
            // Adauga mai multe imagini aici
            // './assets/oameni/oameni3.jpg',
        ]
    }
    // Poti adauga mai multe categorii aici
    // {
    //     id: 'portrete',
    //     name: 'Portrete',
    //     description: 'Sedinte foto individuale si de grup.',
    //     thumbnail: './assets/portrete/portret1.jpg',
    //     images: [
    //         './assets/portrete/portret1.jpg',
    //         './assets/portrete/portret2.jpg',
    //     ]
    // }
];

// ... (existing categories array) ...

// Obtine referinte la elementele DOM
const contentArea = document.getElementById('content-area');
const mainTitle = document.getElementById('main-title');
const backButton = document.getElementById('back-button');

/**
 * Functie pentru a afisa cardurile de categorie.
 */
function displayCategories() {
    contentArea.innerHTML = ''; // Goleste zona de continut
    mainTitle.textContent = ''; // Adaugă această linie pentru a goli titlul principal
    backButton.classList.add('hidden'); // Ascunde butonul de intoarcere

    // Seteaza layout-ul pentru categorii sa fie una sub alta
    contentArea.className = 'flex flex-col items-center gap-6'; // This remains for category cards

    categories.forEach(category => {
        const card = document.createElement('div');
        card.classList.add(
            'category-card',
            'relative',
            'bg-white',
            'shadow-md',
            'cursor-pointer',
            'hover:shadow-xl',
            'overflow-hidden',
            'w-full',
            'max-w-5xl',
            'min-w-80',
            'mx-auto'
        );
        card.dataset.categoryId = category.id;

        const img = document.createElement('img');
        img.src = category.thumbnail;
        img.alt = `Imagine ${category.name}`;
        img.classList.add('w-full', 'h-72', 'object-cover'); // These classes are fine for thumbnails
        img.onerror = function() {
            this.src = 'https://placehold.co/600x400/cccccc/333333?text=Imagine lipsa';
        };

        const textOverlay = document.createElement('div');
        textOverlay.classList.add(
            'absolute',
            'bottom-0',
            'inset-x-0',
            'bg-opacity-60',
            'p-4',
            'text-overlay'
        );

        const title = document.createElement('h3');
        title.classList.add('text-xl', 'font-semibold', 'mb-1');
        title.textContent = category.name;

        const description = document.createElement('p');
        description.classList.add('text-sm');
        description.textContent = category.description;

        textOverlay.appendChild(title);
        textOverlay.appendChild(description);

        card.appendChild(img);
        card.appendChild(textOverlay);

        card.addEventListener('click', () => displayCategoryPhotos(category.id));
        contentArea.appendChild(card);
    });
}

/**
 * Functie pentru a afisa pozele dintr-o categorie specifica.
 * @param {string} categoryId - ID-ul categoriei de afisat.
 */
function displayCategoryPhotos(categoryId) {
    const selectedCategory = categories.find(cat => cat.id === categoryId);

    if (selectedCategory) {
        contentArea.innerHTML = ''; // Goleste zona de continut
        mainTitle.textContent = `${selectedCategory.name}`; // Actualizeaza titlul
        backButton.classList.remove('hidden'); // Afiseaza butonul de intoarcere

        // *** MODIFICATION START ***
        // Remove existing Tailwind grid classes to allow CSS columns to take over
        // and add a specific class for photo galleries
        contentArea.className = 'photo-gallery-columns';
        // *** MODIFICATION END ***

        selectedCategory.images.forEach(imagePath => {
            const imgContainer = document.createElement('div');
            // *** MODIFICATION START ***
            // Add 'photo-item' class for CSS styling
            imgContainer.classList.add('photo-item', 'shadow-md', 'overflow-hidden');
            // *** MODIFICATION END ***

            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Imagine din categoria ${selectedCategory.name}`;
            // *** MODIFICATION START ***
            // Remove 'w-full', 'h-64', 'object-cover' to allow images to size naturally within columns
            img.classList.add('w-full', 'h-auto', 'block'); // w-full ensures it takes full width of its column
            // *** MODIFICATION END ***
            img.onerror = function() {
                this.src = 'https://placehold.co/600x400/cccccc/333333?text=Imagine lipsa';
            };

            imgContainer.appendChild(img);
            contentArea.appendChild(imgContainer);
        });
    } else {
        contentArea.innerHTML = '<p class="text-red-500 text-center">Categoria nu a fost gasita.</p>';
    }
}

// Adauga event listener pentru butonul de intoarcere
backButton.addEventListener('click', displayCategories);

// La incarcarea paginii, afiseaza categoriile
document.addEventListener('DOMContentLoaded', displayCategories);