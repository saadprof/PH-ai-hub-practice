// Load data
const loadTool = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const tools = data.data.tools;
    displayData(tools);
}

// Display data
const displayData = (tools) =>{
    // console.log(tools);

    const cardsContainer = document.getElementById("cards-container");

    tools.forEach(tool =>{
        console.log(tool);

        const cardDiv = document.createElement("div");
        cardDiv.classList = "bg-white drop-shadow-lg border rounded-lg";
        cardDiv.innerHTML = `
            <div class="p-4">
                <div>
                    <img class="mx-auto rounded-lg" src="${tool.image}" alt="Ai tool image" />
                </div>
                <h3 class="text-2xl font-semibold mt-3">Features</h3>
                <ol id="features-container" class="list-decimal ml-4">
                    
                </ol>
                <hr class="my-3" />

                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-semibold mb-1">${tool.name}</h3>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-calendar-days opacity-70"></i>
                            <p>${tool.published_in}</p>
                        </div>
                    </div>
                    <i class="fa-solid fa-arrow-right p-3 bg-sky-100 text-sky-500 rounded-full cursor-pointer"></i>
                </div>
            </div>
        `;

        cardsContainer.appendChild(cardDiv);
    });
}


loadTool();