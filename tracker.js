let tabActive = ['bg-[#1447e6]', 'text-[#FFFFFF]'];
let tabInActive = ['bg-[#FFFFFF]', 'text-black']

let loadingSpinner = document.getElementById('loading_spinner');
let allContainer = document.getElementById('all_container')
let openContainer = document.getElementById('open_container')
let closedContainer = document.getElementById('closed_container')

function switchTab(tab) {
    let tabs = ['all', 'open', 'closed'];

    for (let tabb of tabs) {
        let tabName = document.getElementById('tab_' + tabb);
        if (tabb == tab) {
            tabName.classList.remove(...tabInActive);
            tabName.classList.add(...tabActive);
        }
        else {
            tabName.classList.add(...tabInActive);
            tabName.classList.remove(...tabActive);
        }
    }

    let sections = [allContainer, openContainer, closedContainer];

    for (let section of sections) {
        section.classList.add('hidden');
    }

    if (tab == 'all') {
        allContainer.classList.remove('hidden');
        openContainer.classList.add('hidden')
        closedContainer.classList.add('hidden')
        displayAllData()

    }
    else if (tab == 'open') {
        openContainer.classList.remove('hidden');
        allContainer.classList.add('hidden');
        closedContainer.classList.add('hidden')
        displayOpenData();
    }
    else if (tab == 'closed') {
        closedContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        allContainer.classList.add('hidden');
        displayClosedData();
    }
}

const loadCardDetails = (id) => {
    let url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCardDetails(data.data));
}

const displayCardDetails = (card) => {
    document.getElementById('card_details').showModal()
    let detailsConatiner = document.getElementById('details_cointainer')

    detailsConatiner.innerHTML = `
    <div class="space-y-5">
        <h2>${card.title}</h2>
        <div class="flex justify-between items-center">
            <p class="text-sm">${card.status}</p>
            <p class="text-sm">${card.status} By ${card.author}</p>
            <p class="text-sm">${card.createdAt}</p>
        </div>
        <div class="flex items-center gap-2">
            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${card.labels[0]}</button>
            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${card.labels[1]}</button>
        </div>
        <p class="text-sm font-normal text-[#6f6f79]">${card.description}</p>
        <section class="flex justify-center items-center">
            <div class="w-[100%] bg-[#f5f7f8] shadow-sm p-5 space-x-2 flex justify-between items-center">
                <div class="">
                    <p class="text-sm">Assignee</p>
                    <h2 class="text-lg font-medium">${card.author}</h2>
                </div>
                <div>
                    <p class="text-sm">Priority</p>
                    <button class="btn btn-xs text-lg font-normal px-5 py-3 rounded-2xl">${card.priority}</button>
                </div>
            </div>
        </section>
    </div>
    `
}




const loadData = async (searchText = "") => {

    loadingSpinner.classList.remove('hidden');

    let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues?title=${searchText}`);
    const data = await res.json();
    loadingSpinner.classList.add('hidden');
    displayAllData(data.data)
    displayOpenData(data.data)
    displayClosedData(data.data)

}

const displayAllData = (items) => {



    items.forEach(item => {

        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-base-100 w-[100%] h-81 shadow-sm">
                <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="assets/Open-Status.png" alt="">
                        <button onclick="loadCardDetails(${item.id})" class="btn btn-xs text-lg font-normal px-5 py-3 rounded-2xl">${item.priority}</button>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <h3 class="text-base font-semibold">${item.title}</h3>
                            <p class="text-sm font-normal text-[#6f6f79]">${item.description}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${item.labels[0]}</button>
                            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${item.labels[1]}</button>
                        </div>
                    </div>
                    
                    <hr class="text-gray-300">
                    <div class="">
                        <p class="text-sm font-normal text-[#6f6f79]">${item.author}</p>
                        <p class="text-sm font-normal text-[#6f6f79]">${item.createdAt}</p>
                    </div>
                </div>
            </div>
        
        `
        allContainer.appendChild(card)
    });
}


function displayOpenData(items) {


    items.forEach(item => {

        if (item.status == 'open') {
            allContainer.classList.add('hidden')
            const card = document.createElement('div');
            card.innerHTML = `
        <div class="card bg-base-100 w-[100%] h-81 shadow-sm">
                <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="assets/Open-Status.png" alt="">
                        <button class="btn btn-xs text-lg font-normal px-5 py-3 rounded-2xl">${item.priority}</button>
                    </div>
                    <div class="space-y-2">
                        <h3 class="text-base font-semibold">${item.title}</h3>
                        <p class="text-sm font-normal text-[#6f6f79]">${item.description}</p>
                        <div class="flex items-center gap-2">
                            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${item.labels[0]}</button>
                            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${item.labels[1]}</button>
                        </div>
                    </div>
                    
                    <hr class="text-gray-300">
                    <div class="">
                        <p class="text-sm font-normal text-[#6f6f79]">${item.author}</p>
                        <p class="text-sm font-normal text-[#6f6f79]">${item.createdAt}</p>
                    </div>
                </div>
            </div>
        
        `
            openContainer.appendChild(card)
        }

    })
}


function displayClosedData(items) {


    items.forEach(item => {

        if (item.status == 'closed') {
            const card = document.createElement('div');
            card.innerHTML = `
        <div class="card bg-base-100 w-[100%] h-81 shadow-sm">
                <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="assets/Open-Status.png" alt="">
                        <button class="btn btn-xs text-lg font-normal px-5 py-3 rounded-2xl">${item.priority}</button>
                    </div>
                    <div class="space-y-2">
                        <h3 class="text-base font-semibold">${item.title}</h3>
                        <p class="text-sm font-normal text-[#6f6f79]">${item.description}</p>
                        <div class="flex items-center gap-2">
                            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${item.labels[0]}</button>
                            <button class="btn btn-xs bg-[#FDE68A] text-base font-normal p-3 rounded-2xl">${item.labels[1]}</button>
                        </div>
                    </div>
                    
                    <hr class="text-gray-300">
                    <div class="">
                        <p class="text-sm font-normal text-[#6f6f79]">${item.author}</p>
                        <p class="text-sm font-normal text-[#6f6f79]">${item.createdAt}</p>
                    </div>
                </div>
            </div>
        
        `
            openContainer.appendChild(card)
        }
    })
}











document.getElementById('search_input').addEventListener('keyup', (event) => {

    let input = event.target.value;
    loadData(input)
})


loadData()

