
function loadData(all){
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools, all))
        .catch(err=>console.log(err))
}

loadData(false);

function itemAdding(data) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML =  '';
    // data = sorting by date
    for (const item of data) {
        let card = document.createElement('div')
        card.innerHTML = `
            <div class="rounded-lg border border-gray-300 p-5">
                <div class="">
                    <img class="rounded-lg" src="${item?.image}"
                        alt="gpt4">
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
                        <button id="detailsBtn">
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

function showData(data, all) {
    // console.log(data)
    let data6 = data.slice(0,6)
    if(all){
        itemAdding(data)
    } else{
        itemAdding(data6)
    }
}
