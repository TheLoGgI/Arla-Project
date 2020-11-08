
// Progress Bar
const waypoints = document.querySelectorAll('.waypoint')
let progresionLevel = 0
let isTasksDone = false
const mainTopicLabel = ['Produktion','CO2', 'Dyr', 'Foder', 'Energi', 'Opsumering']
const mainTopicImages = []

document.getElementById('submitForms').addEventListener('click', e => {

    const button = e.target
    console.log(button);
    if (!isTasksDone) {
        classToggle('button-shake', button)

        setTimeout(() => {
            classToggle('button-shake', button)
        }, 300)
    } else {
        progress('increase')
        
        const topicHeading = document.getElementById('topicHeading') 
        shiftLettering(topicHeading, mainTopicLabel[progresionLevel])

        const questionSection = document.getElementById('topicQuistions')
        questionSection.style.transform = 'translateX(-150%)'
        setTimeout(() => {
            questionSection.innerHTML = ''
            insertAccordions()
            questionSection.style.transition = 'none'
            questionSection.style.transform = 'translateX(150%)'
            setTimeout(() => { 
                questionSection.removeAttribute('style')
                // Set height to auto
            }, 500)
        }, 500)
        isTasksDone = false
    }

})

function progress(action) {
    const barProgres = document.getElementById('progress')
    const procesValue = Number(barProgres.getAttribute('aria-valuenow'))
    const interval = 20

    switch (action) {
        case 'increase': 
            if (procesValue <= 100 - interval) {
                const currentValue = Number(barProgres.getAttribute('aria-valuenow')) + interval
                document.getElementById('progress').style.width = `${currentValue}%`
                barProgres.setAttribute('aria-valuenow', currentValue)
                progresionLevel++
                waypoints[progresionLevel].classList.add('current-point')

        
            } 
            break
        
        case 'decrease': 
            if (procesValue >= interval) {
                        const currentValue = Number(barProgres.getAttribute('aria-valuenow')) - interval
                        document.getElementById('progress').style.width = `${currentValue}%`
                        barProgres.setAttribute('aria-valuenow', currentValue)
                        progresionLevel--

                        waypoints[progresionLevel + 1].classList.remove('current-point')
                
                    } 
            break

        case 'check':
                activateWaypoint(waypoints[progresionLevel])
                break

        case 'uncheck':
            deactivateWaypoint(waypoints[progresionLevel])
            waypoints[progresionLevel + 1].classList.remove('current-point')
            break


    }
    
    // Chekcmarks the last point in the progress, when reached
    if(procesValue === 100) {
        activateWaypoint(waypoints[waypoints.length-1])
    } 

}

// Checkmarks waypoint in progressbar
function activateWaypoint(waypoint) {
    waypoint.classList.add('waypoint-done')
    waypoint.children[1].style.stroke = 'white'
}
function deactivateWaypoint(waypoint) {
    if (waypoint.classList.contains('waypoint-done')) {
        waypoint.classList.remove('waypoint-done')
        waypoint.children[1].style.stroke = 'none'
    }
}


function classToggle(className, element) {
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

    // Fetching random triva qustions to fill out the questions pannel
    async function trivaQustions(categoryInt = 27) {
    const lookupCategories = await (await fetch('../json/lookup_triva_categories.json')).json()

    const randomTriva = await (await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryInt + 9}`)).json()
    randomTriva.category = lookupCategories[categoryInt].name
    
    return randomTriva
}


function accordionString(category, data) {
    let accordionHead = `
    <div class="accordion">
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
    for (const triva of data) {
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
        </form>
    </div>`
    

    return accordionHead + accordionBody
}

async function insertAccordions() {
    const questionsSection = document.getElementById('topicQuistions')
    const randomInt = Math.ceil(Math.random() * 3)
    console.log(randomInt);
    for (let i = 0; i < randomInt; i++) {
        const {category, results} = await trivaQustions(Math.floor(Math.random() * 23))
        const htmlAccordion = accordionString(category, results)
        questionsSection.insertAdjacentHTML('afterbegin', htmlAccordion)
    }

    // init isAllComplete listner on heads
    const collapse = document.querySelectorAll('.accordion__head')
    collapsHandler(collapse)

    // formsubmitting prevention and init isAllComplete listner
    const forms = document.querySelectorAll('form')
    collapsSubmit(forms, collapse)

}

// Initial load
insertAccordions()



function collapsSubmit(formCollection, acordions) {
    formCollection.forEach( form => 
        form.addEventListener('submit', e => {
            e.preventDefault()
            classToggle('qustions-complete', form.parentNode)
            isAllComplete(acordions)
        }))
}


function collapsHandler(acordions) {
    acordions.forEach( accordion => {
        accordion.addEventListener('click', e => {
            classToggle('qustions-complete', accordion.parentNode)
            isAllComplete(acordions)
        })
    })
    
}

function isAllComplete(acordions) {
    const acordionsArray = [...acordions].map(item => item.parentNode)
    
    if (isAllChecked(acordionsArray)) {
        progress('check')
        isTasksDone = true
    } else {
        progress('uncheck')
        isTasksDone = false
    }
    
}

function isAllChecked(acordions) {
    return [...acordions].every(element => element.classList.contains('qustions-complete'))
}

// Change topic heading
function shiftLettering(heading, text) {

    const currentText = heading.textContent.split('')
    const newTextArray = text.split('')
    const longest = Math.max(currentText.length, newTextArray.length)

    newTextArray.length = longest


    let i = 0
    const interval = setInterval(() => {
        currentText[i] = newTextArray[i]
        i++

        heading.textContent = currentText.join('')

        if (i === longest) {
            clearInterval(interval)
        }
    }, 100)


}