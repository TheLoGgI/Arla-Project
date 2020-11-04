// Navigation seleted menu item - Lasse
function seletedMenuItem(id) {
    const navElement = document.getElementById(id)

    for (const element of navElement.children) {
        if (element.tagName === 'DIV') {
            return
        }

        if (element.classList.contains('selected')) {
            return element
        }
    }

    return null

}

function moveSelection() {
    const selection = document.getElementById('navSelection')
    const selectedItem = seletedMenuItem('headernav')
    const selectedRect = selectedItem.getBoundingClientRect()

    selection.style.width = selectedItem.clientWidth + 'px'
    selection.style.transform = `translateX(${(selectedRect.x)  + 'px'})`
    selection.style.transition = 'transform .3s ease, width .4s ease'
    
}


function navgationSelectionHandler(id) {
    const navElement = document.getElementById(id)
    for (const element of navElement.children) {
        if (element.tagName === 'DIV') {
            return
        }
        
        element.addEventListener('click', (e) => {
            navigationRemoveClass(navElement)
            if (e.target.tagName !== 'LI') {
                e.target.parentNode.classList.add('selected')
            } else if (e.target.tagName === 'LI') {
                e.target.classList.add('selected')
            }
            moveSelection()
        })
    }
}

function navigationRemoveClass(id) {
    let navElement = null

    if (typeof id === 'string') {
        navElement = document.getElementById(id)
        
    } else if(typeof id === 'object') {
        navElement = id
    }

    for (const element of navElement.children) {
        if (element.tagName === 'DIV') {
            return
        }
        
        element.classList.remove('selected')
       
    }

}

moveSelection()

navgationSelectionHandler('headernav')

window.addEventListener('resize', () => moveSelection())


// Progress Bar
const waypoints = document.querySelectorAll('.waypoint')
let progresionLevel = -1
// document.getElementById('progress').setAttribute('value', '0%')
document.getElementById('submitForms').addEventListener('click', progress)

function progress() {
    const barProgres = document.getElementById('progress')
    const currentValue = Number(barProgres.getAttribute('aria-valuenow')) + 20

    if (currentValue <= 100) {
        document.getElementById('progress').style.width = `${currentValue}%`
        barProgres.setAttribute('aria-valuenow', currentValue)
    
        if (currentValue % 20 === 0) {
            progresionLevel++
            activateWaypoint(waypoints[progresionLevel])
            waypoints[progresionLevel + 1].classList.add('current-point')
        }

    } 
    
    if(currentValue === 100) {
        activateWaypoint(waypoints[waypoints.length-1])
    } 

}

function activateWaypoint(waypoint) {
    waypoint.classList.toggle('waypoint-done')
    waypoint.children[1].style.stroke = 'white'
}

function classToggle(className, element) {
    // console.log(typeof element, element);
    if (typeof element === 'object') {
        element.classList.toggle(className)
        return element
    } else {
        document.getElementById(element)
            .classList.toggle(className)
            return document.getElementById(element)
    }
    return null
}

    // category=27 animals
    // category=28 vehicles
    // Fetching random triva qustions to fill out the questions pannel
    async function trivaQustions(categoryInt = 27) {
    const lookupCategories = await (await fetch('../json/lookup_triva_categories.json')).json()
    console.log(lookupCategories);
    

    const randomTriva = await (await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryInt + 9}`)).json()
    randomTriva.category = lookupCategories[categoryInt].name
    // randomTriva.category = "Klaus koldskål"
    return randomTriva
}


( async () => {
    const questionsSection = document.querySelectorAll('.accordion')
    console.log(questionsSection);

    for (const qustionsElement of questionsSection) {
        

    const {category, results} = await trivaQustions(Math.floor(Math.random() * 23))
    // console.log(category, results);

    let accordionHead = `
    <div class="accordion__head">
                <div class="accordion__heading">
                    <svg width="10.215" height="16.338" viewBox="0 0 10.215 16.338">
                        <g transform="translate(2.121 14.217) rotate(-90)">
                            <line x2="5.973" y2="5.973" transform="translate(0 0)" fill="none" stroke-linecap="round" stroke-width="3"/>
                            <line x1="5.973" y2="5.973" transform="translate(6.122 0)" fill="none" stroke-linecap="round" stroke-width="3"/>
                        </g>
                    </svg>
                    <h3>${category}</h3>
                </div>
                <div class="accordion__state">
                    <p>Gemt!</p>
                    <svg width="22.997" height="21.449" viewBox="0 0 22.997 21.449">
                        <path id="Path_162" data-name="Path 162" d="M9.476,13.362,18.538,0,23,3.434,10.72,21.449,0,13.1l3.18-4.5Z" fill="#fefefe"/>
                    </svg>
                </div>
            </div>
    <form class="accordion__form">
                <ul class="accordion__qustions-list" role="form" aria-labelledby="topic_label st1_label">`

    let accordionBody = ''
    for (const triva of results) {
        accordionBody += `
        <li class="accordion__qustion">
            <label>${triva.question}</label>
            <input class="qustion__input" type="number" placeholder="${triva.correct_answer}">
            <span>${triva.difficulty}</span>
        </li>`
    }
    
    accordionBody += `
        </ul>
        <input type="submit" class="btn qustions-save" value="Gem">
    </form>`

    qustionsElement.innerHTML = accordionHead + accordionBody
}

// formsubmitting prevention
const forms = document.querySelectorAll('form')
preventDefaultEvent(forms)

const collapse = document.querySelectorAll('.accordion__head')
collapseHandler(collapse)

})()



function preventDefaultEvent(formCollection) {
    formCollection.forEach( form => 
        form.addEventListener('submit', e => {
            e.preventDefault()
            classToggle('qustions-complete', form.parentNode)
        }))
}



function collapseHandler(acordions) {
    const acordionsArray = [...acordions].map(item => item.parentNode)

    acordions.forEach( accordion => 
        accordion.addEventListener('click', e => {

            classToggle('qustions-complete', accordion.parentNode)

            if (isAllChecked(acordionsArray)) {
                progress()
            }
            
        }))
}

function isAllChecked(acordions) {
    return [...acordions].every(element => element.classList.contains('qustions-complete'))
}