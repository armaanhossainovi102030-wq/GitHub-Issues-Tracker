const cardContainer= document.getElementById("cardContainer")
const openContainer= document.getElementById("openContainer")
const closedContainer=document.getElementById("closedContainer")


async function loadCard(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayCard(data.data )
} 
function displayIssues(count){
    const container = document.getElementById("totalIssues")

    container.innerHTML=`
    <h2  class="font-bold text-xl">${count} Issues</h2>
            <p class="text-gray-500">Track and manage your project issues</p>
    `
    
}
function displayCard(issues){

    cardContainer.innerHTML=""
    issues.forEach(issue => {
        const card = document.createElement("div")
        card.className="card bg-white shadow-2xl"
        const date = issue.createdAt.split("T")[0]
         let  statusIcon = document.createElement("img")
       
         if (issue.status=="open"){
             statusIcon.src="./assets/Open-Status.png"
        }
        else{
            statusIcon.src="./assets/Closed- Status .png"
        }
            card.innerHTML=`
         <div class="card-body">
    <div class="flex justify-between">
       <div id="status-holder"></div>
        <div class="border border-red-500 rounded-xl w-15 text-center bg-red-300">${issue.priority}</div>
    </div>
    <h2 class="card-title ">${issue.title}</h2>
    <p class="line-clamp-2">${issue.description}</p>
    
    <div class="flex gap-2">
        <div class="border border-red-500 rounded-xl w-30 text-center bg-red-300">${issue.labels[0]}</div>
    <div class="border border-amber-300 rounded-xl w-30 text-center bg-yellow-100">${issue.labels[1]}</div>
    </div>
    <hr class="w-full text-gray-300 mt-3 mb-3">
    
    <div class="text-gray-600">#1 by ${issue.author}</div>
    
    <div class="text-gray-600">${date}</div>
  </div>
        
        `

        cardContainer.append(card)
        card.querySelector("#status-holder").append(statusIcon);
    });
}
  
    document.getElementById("openBtn").addEventListener("click",async()=>{

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    const openIssues = data.data.filter(issue=>issue.status=="open")
    const totalIssues= openIssues.length
        displayCard(openIssues);
        displayIssues(totalIssues)
})
    document.getElementById("closedBtn").addEventListener("click",async()=>{
        const res =await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        const data = await res.json()

        const closedIssues =data.data.filter(issue=>issue.status=="closed")
        const totalIssues= closedIssues.length
        displayCard(closedIssues);
        displayIssues(totalIssues)

    })
    document.getElementById("allBtn").addEventListener("click",async()=>{
        const res =await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        const data = await res.json()

        const totalIssues = data.data.length
        displayCard(data.data);
        displayIssues(totalIssues)

    })


    





loadCard()