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
let progresionLevel = 0
// document.getElementById('progress').setAttribute('value', '0%')
document.getElementById('next').addEventListener('click', e => {
    const barProgres = document.getElementById('progress')
    const currentValue = Number(barProgres.getAttribute('value')) + 5

    if (currentValue <= 100) {
        document.getElementById('progress').style.width = `${currentValue}%`
        barProgres.setAttribute('value', currentValue)
        console.log(currentValue % 25);
    
        if (currentValue % 25 === 0) {
            progresionLevel++
            activateWaypoint(waypoints[progresionLevel])
            console.log(currentValue);
        }

    } else {
        return
    }

    
})

function activateWaypoint(waypoint) {
    waypoint.classList.toggle('waypoint-done')
    waypoint.children[1].style.stroke = 'white'
    
}

// function classToggle(elementID, className) {
//     document.getElementById(elementID)
//         .classList.toggle(className)
//         return document.getElementById(elementID)
// }

