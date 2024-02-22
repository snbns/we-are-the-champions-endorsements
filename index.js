import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-snbns-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementsList")

const textareaEl = document.getElementById("text-area-endorsements")
const publishButtonEl = document.getElementById("publish-btn")
const endorsementsListEl = document.getElementById("endorsements-list")

publishButtonEl.addEventListener("click", function() {
    let textInput = textareaEl.value
    
    push(endorsementsInDB, textInput)
    
    clearTextAreaEl()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val());
        
        clearEndorsementsListEl()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentItem = endorsementsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementsList(currentItemValue)
        }
    }
})


function appendItemToEndorsementsList(item) {
    let newEl = document.createElement("li")
    
    newEl.textContent = item
    
    endorsementsListEl.append(newEl)
}

function clearTextAreaEl() {
    textareaEl.value = ""
}

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = ""
}