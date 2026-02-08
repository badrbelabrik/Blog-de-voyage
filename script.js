function getCards() {
    return JSON.parse(localStorage.getItem("cards")) || []
}
function setCards(cards) {
    localStorage.setItem("cards", JSON.stringify(cards))
}

function createCard() {

}

// Open card creation modal
function openModal() {
    const modal = document.getElementById("crud-modal")
    modal.classList.remove("hidden")
}
function closeModal() {
    const modal = document.getElementById("crud-modal")
    modal.classList.add("hidden")
}
function closeEditModal() {
    const editModal = document.getElementById("edit-modal")
    editModal.classList.add("hidden")
}
function closeDeleteModal() {
    const modal = document.getElementById("delete-modal")
    modal.classList.add("hidden")
}

// Open Edit Card Menu
// const editBtn = document.getElementById("openModal")

// editBtn.addEventListener("click", ()=>{
//     const menu = document.getElementById("drop-menu")
//     menu.classList.toggle("hidden")
// })


function saveCard() {
    const cards = getCards()

    const title = document.getElementById("inputTitle")
    const author = document.getElementById("inputAuthor")
    const location = document.getElementById("inputLocation")
    const readingTime = document.getElementById("inputTime")
    const category = document.getElementById("inputCategory")
    const image = document.getElementById("inputImage")
    const description = document.getElementById("inputDescription")

    let newId = cards.length > 0 ? cards[cards.length - 1].id + 1 : 1;
    const newCard = {id:newId,title: title.value, author: author.value, location: location.value, readingTime: readingTime.value, views: 0, category: category.value, image: image.value, description: description.value }
    cards.push(newCard)
    setCards(cards)
    fillCardsContainer()
    closeModal()
    showAddMessage("Card created successfully !!!")
    title.value = ""
    author.value = ""
    location.value = ""
    readingTime.value = ""
    category.value = ""
    image.value = ""
    description.value = ""
}

function editCard(id){
    const cards = getCards()
    const currentCard = cards.find(item => item.id === id)
    console.log(currentCard)
    // Informations display in the form
    document.getElementById("editTitle").value = currentCard.title
    document.getElementById("editAuthor").value = currentCard.author
    document.getElementById("editLocation").value = currentCard.location
    document.getElementById("editTime").value = currentCard.readingTime
    document.getElementById("editCategory").value = currentCard.category
    document.getElementById("editImage").value = currentCard.image
    document.getElementById("editDescription").value = currentCard.description

    const saveBtn = document.getElementById("saveEditedCard")
    saveBtn.addEventListener("click", function (e){
        e.preventDefault()
    // Save the last updated Informations
    currentCard.title = document.getElementById("editTitle").value
    currentCard.author = document.getElementById("editAuthor").value
    currentCard.location = document.getElementById("editLocation").value
    currentCard.readingTime = document.getElementById("editTime").value
    currentCard.category = document.getElementById("editCategory").value
    currentCard.image = document.getElementById("editImage").value
    currentCard.description = document.getElementById("editDescription").value
    setCards(cards)
    showAddMessage("Card updated successfully !!!")
    fillCardsContainer()
    closeEditModal()
    })

}


function showAddMessage(message, duration = 5000) {
    const toast = document.getElementById("message");

    toast.textContent = message;
    toast.classList.add("bg-emerald-700")
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, duration);
}
function showDeleteMessage(message, duration = 5000) {
    const toast = document.getElementById("message");

    toast.textContent = message;
    toast.classList.add("bg-red-600")
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, duration);
}

function fillCardsContainer() {
    const cardsContainer = document.getElementById("cardsContainer")
    cardsContainer.innerHTML = ""
    const cards = getCards()

    for(card of cards) {
        const cardDiv = document.createElement("div")
        cardDiv.className = "card max-w-sm rounded-2xl items-center  object-cover bg-white shadow-lg my-2 md:w-md"
        cardDiv.innerHTML = `<a href="details.html">
                        <img src="${card.image}" alt="${card.title}" class="w-full h-48 rounded-t-2xl object-cover" />
                        <!-- Content -->
                        <div class="p-4">
                            <h2 class="font-bold text-lg">${card.title}</h2>
                            <p class="text-sm text-gray-500">by ${card.author}</p>                      
                    </a>
                    <div class="flex justify-between">
                        <div class="flex items-center gap-4 text-sm text-gray-500 mt-2">
                            <div class="flex items-center gap-1">
                                <i class="fa-solid fa-location-crosshairs"></i> <span>${card.location}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <i class="fa-regular fa-clock"></i> <span>${card.readingTime} min</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <i class="fa-regular fa-eye"></i> <span>${card.views}</span>
                            </div>
                        </div>
                        <div class="relative">
                            <button class="menu-btn rounded-full size-5 cursor-pointer"> ⋮ </button>
                                <div class="menu hidden absolute right-0 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 md:mb-0 w-28 bg-white rounded-lg shadow-lg z-50">
                                    <button class="edit block w-full text-left px-3 py-2 rounded-t-lg hover:bg-gray-100">Edit</button>
                                    <button class="delete block w-full text-left px-3 py-2 rounded-b-lg hover:bg-gray-100 text-red-500">Delete</button>
                                </div>
                        </div>
                    </div>`
        cardDiv.dataset.id = card.id;
        cardsContainer.appendChild(cardDiv)
    }
}

// Drop down menus function
const cardsContainer = document.getElementById("cardsContainer")
cardsContainer.addEventListener("click", function (event) {
    const menus = cardsContainer.getElementsByClassName("menu")

    let currentElement = event.target
    let found = false
    while (currentElement !== cardsContainer) {
        if (currentElement.classList.contains("menu-btn")) {
            found = true
            if (currentElement.nextElementSibling.classList.contains("hidden")) {
                for (menu of menus) {
                    menu.classList.add("hidden")
                }
                currentElement.nextElementSibling.classList.remove("hidden")
            } else {
                currentElement.nextElementSibling.classList.add("hidden")
            }
            break
        } else if (currentElement.classList.contains("edit")) {
            const editModal = document.querySelector("#edit-modal")
            let editEl = currentElement.parentElement
            while (editEl && !editEl.classList.contains("card")) {
                editEl = editEl.parentElement
            } if (!editEl) {
                return
            } else {
                editModal.dataset.id = editEl.dataset.id;
                editModal.classList.remove("hidden")
                const id = Number(editModal.dataset.id)
                editCard(id)
            }
            break
        } else if (currentElement.classList.contains("delete")) {
            const deleteModal = document.querySelector("#delete-modal")
            let delEl = currentElement.parentElement
            while (delEl && !delEl.classList.contains("card")) {
                delEl = delEl.parentElement
            } if (!delEl) {
                return
            } else {
                deleteModal.dataset.id = delEl.dataset.id;
                deleteModal.classList.remove("hidden")
            }

            break
        }
        else {
            currentElement = currentElement.parentElement
        }

    }
    if (!found) {
        for (let menu of menus) {
            menu.classList.add("hidden")
        }
    }
})
// Delete card function
const deleteModal = document.getElementById("delete-modal")
deleteModal.addEventListener("click", function (event) {
    if (event.target.id === "deleteButton") {
        const cardId = Number(deleteModal.dataset.id)
        const cards = getCards()
        const selectedCard = cards.findIndex(item => item.id === cardId)
        console.log(selectedCard)
        cards.splice(selectedCard,1)
        setCards(cards)
        fillCardsContainer()
        closeDeleteModal()
        showDeleteMessage("Card deleted successfully !!!")
    } else {
        return
    }
})

// Filter by category
const categories = document.getElementById("categories")
categories.addEventListener("click", function(event){
    if(event.target.matches("button[data-cat]")){
        const filter = event.target.dataset.cat
        const cardsContainer = document.getElementById("cardsContainer")
        if(filter === "all"){
            fillCardsContainer()
        } else{
                    cardsContainer.innerHTML = ""
        const cards = getCards()
        const filteredCards = cards.filter(item => item.category === filter)
        for(card of filteredCards){
            const cardDiv = document.createElement("div")
        cardDiv.className = "card max-w-sm rounded-2xl items-center  object-cover bg-white shadow-lg my-2 md:w-md"
        cardDiv.innerHTML = `<a href="details.html">
                        <img src="${card.image}" alt="${card.title}" class="w-full h-48 rounded-t-2xl object-cover" />
                        <!-- Content -->
                        <div class="p-4">
                            <h2 class="font-bold text-lg">${card.title}</h2>
                            <p class="text-sm text-gray-500">by ${card.author}</p>                      
                    </a>
                    <div class="flex justify-between">
                        <div class="flex items-center gap-4 text-sm text-gray-500 mt-2">
                            <div class="flex items-center gap-1">
                                <i class="fa-solid fa-location-crosshairs"></i> <span>${card.location}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <i class="fa-regular fa-clock"></i> <span>${card.readingTime} min</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <i class="fa-regular fa-eye"></i> <span>${card.views}</span>
                            </div>
                        </div>
                        <div class="relative">
                            <button class="menu-btn rounded-full size-5 cursor-pointer"> ⋮ </button>
                                <div class="menu hidden absolute right-0 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 md:mb-0 w-28 bg-white rounded-lg shadow-lg z-50">
                                    <button class="edit block w-full text-left px-3 py-2 rounded-t-lg hover:bg-gray-100">Edit</button>
                                    <button class="delete block w-full text-left px-3 py-2 rounded-b-lg hover:bg-gray-100 text-red-500">Delete</button>
                                </div>
                        </div>
                    </div>`
        cardDiv.dataset.id = card.id;
        cardsContainer.appendChild(cardDiv)
        }
        }

    }
})

document.addEventListener("DOMContentLoaded", () => {
    fillCardsContainer()
})