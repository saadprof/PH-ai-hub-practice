// Load data
const loadTool = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const tools = data.data.tools;
  displayData(tools);
};

// Display data
const displayData = (tools) => {
  // console.log(tools);

  const cardsContainer = document.getElementById("cards-container");

  tools.forEach((tool) => {
    // console.log(tool);

    const cardDiv = document.createElement("div");
    cardDiv.classList = "bg-white drop-shadow-lg border rounded-lg";
    cardDiv.innerHTML = `
            <div class="p-4">
                <div>
                    <img class="mx-auto rounded-lg" src="${tool.image}" alt="Ai tool image" />
                </div>
                <h3 class="text-2xl font-semibold mt-3 mb-">Features</h3>
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
                    <i onclick="my_modal.showModal(); loadToolDetails('${tool.id}')" class="fa-solid fa-arrow-right p-3 bg-sky-100 text-sky-500 rounded-full cursor-pointer"></i>
                </div>
            </div>
        `;
    const featuresContainer = cardDiv.querySelector("#features-container");
    const features = tool.features;
    features.forEach((feature) => {
      const featureList = document.createElement("li");
      featureList.innerText = `${feature}`;
      featuresContainer.appendChild(featureList);
    });

    cardsContainer.appendChild(cardDiv);
  });
};

// Load tool details
const loadToolDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const toolDetails = data.data;
  displayToolDetails(toolDetails);
};

// Display tool details
const displayToolDetails = (toolDetails) => {
  console.log(toolDetails);

  const modalDetailsContainer = document.getElementById("my_modal");
  modalDetailsContainer.innerHTML = `
        <div class="modal-box w-10/12 max-w-3xl">
            <form method="dialog">
                <button class="btn btn-md btn-circle btn-ghost absolute right-0 top-0 rounded-none bg-sky-100 text-sky-500">✕</button>
            </form>
            <div class="mt-10">
                <div class="bg-sky-50 border border-sky-300 rounded-lg">
                    <div class="p-4">
                        <p class="text-xl font-semibold">${toolDetails.description}</p>
                        
                        <!-- Pricing -->
                        <div id="pricing-text" class="text-center flex justify-between my-2">
                            
                        </div>

                        <!-- Features and Integrations -->
                        <div class="flex justify-between">
                            <!-- Features -->
                            <div>
                                <h3 class="text-xl font-semibold">Features</h3>
                                <ul class="list-disc ml-5">
                                    <li> ${toolDetails?.features[1]?.feature_name || "No Data"} </li>
                                    <li> ${toolDetails?.features[2]?.feature_name || "No Data"} </li>
                                    <li> ${toolDetails?.features[3]?.feature_name || "No Data"} </li>
                                </ul>
                            </div>
                            
                            <!-- Integrations -->
                            <div>
                                <h3 class="text-xl font-semibold">Integrations</h3>
                                <ul id="integration-container" class="list-disc ml-5">
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                
                </div>
            </div>
        </div>
    `;

    // Pricing
    const pricingText = modalDetailsContainer.querySelector("#pricing-text");
    const pricingApiData = toolDetails?.pricing;
    pricingApiData.forEach(pricing =>{
        // console.log(pricing.plan, pricing.price);
        const pricingDiv = document.createElement("div");
        pricingDiv.innerHTML = `<p class="bg-white p-3 rounded-lg"> ${pricing.price} <br> ${pricing.plan} </p>`;

        pricingText.appendChild(pricingDiv);
    });

    // Integration
    const integrationContainer = modalDetailsContainer.querySelector("#integration-container");
    const integrations = toolDetails.integrations;
    integrations.forEach(integration =>{
        const integrationList = document.createElement("li");
        integrationList.innerText = `${integration}`;
        integrationContainer.appendChild(integrationList);
    })

    
};

loadTool();
