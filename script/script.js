// data load here ------------------

function loadData(all) {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools, all))
        .catch(err => console.log(err))
}
loadData(false);

// asynchronus data fatching 
async function loadDetails(id) {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    let res = await fetch(url)
    let data = await res.json()
    showModal(data)
}

// functionality here --------------

function itemAdding(data) {
    document.getElementById('sortByDate').addEventListener('click', (e) => {
        sortingdata(data)
    })

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    for (const item of data) {
        let card = document.createElement('div')
        card.innerHTML = `
            <div class="rounded-lg border border-gray-300 p-5">
                <div class="">
                    <img class="rounded-lg" src="${item.image}"
                        alt="image">
                </div>
                <div class="py-3">
                    <p class="text-2xl font-semibold pb-2">Features</p>
                    <p>1. Natural language processing</p>
                    <p>2. Contextual understanding</p>
                    <p>3. Text generation</p>
                </div>
                <hr>
                <div class="flex justify-between items-center pt-2">
                    <div class="">
                        <p class="text-2xl font-semibold">${item.name}</p>
                        <p><i class="far fa-calendar-alt mr-3"></i>${item.published_in}</p>
                    </div>
                    <div class="">
                        <button onclick="loadDetails('${item.id}')" data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                            <i class="fas fa-arrow-right text-rose-600"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(card)
        // console.log(item)
    }
}

function showData(data, all, srt) {
    // console.log(data)
    let data6 = data.slice(0, 6)
    if (all) {
        itemAdding(data)
    } else {
        itemAdding(data6)
    }
}

function sortingdata(data) {
    // sorting by date
    data = data.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateA - dateB;
    });
    itemAdding(data)
}

function showModal(data) {
    let item = data.data
    const modal = document.getElementById('modal')
    let div = document.createElement('div');
    // div.setAttribute("class", "overflow-auto")
    div.innerHTML = `
        <div class="fixed top-0 md:top-9 ">
            <div class="w-9/12 mx-auto rounded-xl shadow-2xl drop-shadow-2xl bbackdrop-brightness-125 bg-white py-14 px-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="rounded-lg border border-red-300 p-2 md:p-5">
                    <div class="">
                        <p class="text-xl font-semibold my-3">${item.description}</p>
                    </div>
                    <div id="parent" class="flex justify-around items-center flex-wrap my-5">
                        <div class="px-3 text-green-500">
                            <p>${item.pricing[0].price}</p>
                            <p>${item.pricing[0].plan}</p>
                        </div>
                        <div class="px-3 text-yellow-500">
                            <p>${item.pricing[1].price}</p>
                            <p>${item.pricing[1].plan}</p>
                        </div>
                        <div class="px-3 text-red-500">
                            <p>${item.pricing[2].price}</p>
                            <p>${item.pricing[2].plan}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="">
                            <p class="text-xl font-semibold my-3">features</p>
                            <ul>
                                <li>${item.features['1'].feature_name}</li>
                                <li>${item.features['2'].feature_name}</li>
                                <li>${item.features['3'].feature_name}</li>
                            </ul>
                        </div>
                        <div class="">
                            <p class="text-xl font-semibold my-3">integrations</p>
                            <ul>
                                <li>${item.integrations[0]}</li>
                                <li>${item.integrations[1]}</li>
                                <li>${item.integrations[2]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="rounded-lg border border-gray-300 p-5">
                    <div class="">
                        <img class="rounded-lg"
                            src="https://ideascale.com/wp-content/uploads/2023/03/ChatGPT1-600x338.jpeg" alt="gpt4">
                    </div>
                    <div class="text-justify px-10">
                        <p class="text-xl font-semibold my-3">Hi, how are you doing today?</p>
                        <p>I'm doing well, thank you for asking. How can I assist you today?</p>
                    </div>
                </div>
                <button id="closeBtn" onclick="closeBtn()" class="absolute py-3 px-5 bg-red-600 text-white text-lg font-bold rounded-full -right-4 -top-4">
                Close
                </button>
            </div>
        </div>
    `
    modal.appendChild(div)
    // console.log(item)
}

function closeBtn() {
    const modal = document.getElementById('modal')
    modal.innerHTML = '';
}
