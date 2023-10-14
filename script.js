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

    
}


loadTool();