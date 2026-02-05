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

    const newCard = { title: title.value, author: author.value, location: location.value, readingTime: readingTime.value, views: 0, category: category.value, image: image.value, description: description.value }
    cards.push(newCard)
    setCards(cards)
    fillCardsContainer()
    closeModal()
    showAddMessage("Card created successfully !!!")
}

function editCard(index){
    const cards = getCards()
    // Informations display in the form
    document.getElementById("editTitle").value = cards[index].title
    document.getElementById("editAuthor").value = cards[index].author
    document.getElementById("editLocation").value = cards[index].location
    document.getElementById("editTime").value = cards[index].readingTime
    document.getElementById("editCategory").value = cards[index].category
    document.getElementById("editImage").value = cards[index].image
    document.getElementById("editDescription").value = cards[index].description

    const saveBtn = document.getElementById("saveEditedCard")
    saveBtn.addEventListener("click", function (e){
        e.preventDefault()
    // Save the last updated Informations
    cards[index].title = document.getElementById("editTitle").value
    cards[index].author = document.getElementById("editAuthor").value
    cards[index].location = document.getElementById("editLocation").value
    cards[index].readingTime = document.getElementById("editTime").value
    cards[index].category = document.getElementById("editCategory").value
    cards[index].image = document.getElementById("editImage").value
    cards[index].description = document.getElementById("editDescription").value
    setCards(cards)
    showAddMessage("Card updated successfully !!!")
    fillCardsContainer()
    closeEditModal()
    })

}


function showAddMessage(message, duration = 5000) {
    const toast = document.getElementById("add-message");

    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, duration);
}
function showDeleteMessage(message, duration = 5000) {
    const toast = document.getElementById("delete-message");

    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, duration);
}

function fillCardsContainer() {
    const cardsContainer = document.getElementById("cardsContainer")
    cardsContainer.innerHTML = ""
    const cards = getCards()

    cards.forEach((card, index) => {
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
        cardDiv.dataset.index = index;
        cardsContainer.appendChild(cardDiv)
    })
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
                editModal.dataset.index = editEl.dataset.index;
                editModal.classList.remove("hidden")
                const index = editModal.dataset.index
                console.log(index)
                editCard(index)
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
                deleteModal.dataset.index = delEl.dataset.index;
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

const deleteModal = document.getElementById("delete-modal")
deleteModal.addEventListener("click", function (event) {
    if (event.target.id === "deleteButton") {
        const index = deleteModal.dataset.index
        const cards = getCards()
        cards.splice(index, 1)
        setCards(cards)
        fillCardsContainer()
        closeDeleteModal()
        showDeleteMessage("Card deleted successfully !!!")
    } else {
        return
    }
})



document.addEventListener("DOMContentLoaded", () => {
    fillCardsContainer()
})