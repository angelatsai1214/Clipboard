const inputButton = document.getElementById("input-btn")
const inputButton2 = document.getElementById("input-btn2")
const inputElement = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
let prev = inputElement.value
let myLeads = []

let currLeads = JSON.parse(localStorage.getItem("clipboard"))

if( currLeads ){
    myLeads = currLeads
    render()
}

//Enter == click SAVE buttont
inputElement.addEventListener("keydown", (event)=>{
    if( event.key === 'Enter' ){
        // document.querySelector("#input-btn").click()
        document.getElementById("input-btn").click()
    }
})


inputButton.addEventListener("click", () => {
    console.log("clicked")

    if( prev != inputElement.value && inputElement.value != "" ){ //prevent immediate duplicate and empty string
        
        prev = inputElement.value
    
        myLeads.push(inputElement.value)
        localStorage.setItem("clipboard",JSON.stringify(myLeads))
        inputElement.value = ""
        render()
    }
})


function render(){
    let listItems = ""
    for( let i = 0; i < myLeads.length; i++ ){
        listItems += ` 
        <div> 
            <li>${myLeads[i]}</li>
            <button class="copy" id="copy${i}">COPY</button>
            <button class="del" id="del${i}">DELETE</button>
        </div>
        `
    }
    ulEl.innerHTML = listItems
    document.querySelectorAll(".copy").forEach( (button) =>{
        button.addEventListener("click", function() {
            copy(button.id);
        })
    })
    document.querySelectorAll(".del").forEach( (button) => {
        button.addEventListener("click", function() {
            del(button.id);
        })
    })
}


function copy(id){
    let copyText = document.getElementById(id).parentNode.getElementsByTagName("li")[0]
    // console.log(copyText)
    navigator.clipboard.writeText(copyText.innerHTML);
}

function del(id){
    var div = document.getElementById(id).parentNode;
    let arr = JSON.parse(localStorage.getItem("clipboard"))
    
    let filtered = arr.filter( (elem) => {
        // console.log(elem != div.getElementsByTagName("li")[0].innerHTML)
        return elem != div.getElementsByTagName("li")[0].innerHTML
    })

    // console.log(filtered)
    myLeads = filtered
    localStorage.setItem("clipboard", JSON.stringify(filtered))
    div.remove();
}


// option to reverse order of saved items

let toggle = ["Newest to Oldest", "Oldest to Newest"]
let inx = 0
if( inputButton2.innerHTML === toggle[0] ){
    inx = 1
}

inputButton2.addEventListener("click", ()=>{
    console.log("togggle")
    inputButton2.innerHTML = toggle[inx]
    let arr = JSON.parse(localStorage.getItem("clipboard"))
    arr.reverse()
    myLeads = arr
    localStorage.setItem("clipboard", JSON.stringify(arr))
    render()
})

