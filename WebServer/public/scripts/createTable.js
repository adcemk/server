let days = ['L', 'M', 'I', 'J', 'V', 'S']
let hours = [
    '0700',
    '0755',
    '0800',
    '0855',
    '0900',
    '0955',
    '1000',
    '1055',
    '1100',
    '1155',
    '1200',
    '1255',
    '1300',
    '1355',
    '1400',
    '1455',
    '1500',
    '1555',
    '1600',
    '1655',
    '1700',
    '1755',
    '1800',
    '1855',
    '1900',
    '1955',
    '2000',
    '2055',
    '2100',
]
let info = ['Color', 'NRC', 'Class', 'Teacher'] 

//  colors = [ P. Blue ,  B. Blue ,  Yellow  ,  Red     ,  Purple]
let colors = ['#7289da', '#33ccff', '#ffff33', '#ff0000', '#cc00cc']

var horariosString = sessionStorage.getItem('horarios')
var horarios = JSON.parse(horariosString)
//var indexHor = 0
//console.log('in tables.html')
//console.log(horarios[0])
//console.log(horarios[indexHor].body.clases)

horarios.forEach((horario, indexHor) => {

    console.log(horarios[indexHor].body.clases)

    let div = document.createElement('div')

    //create main table elements
    let tableSched = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')

    tableSched.appendChild(thead)
    tableSched.appendChild(tbody)

    div.appendChild(tableSched)

    //append created table to body of document
    document.getElementById('body').appendChild(div)

    //create headers for table ()
    let headerRow = document.createElement('tr')
    let dayHead = document.createElement('th')
    dayHead.innerHTML = "Day"
    headerRow.appendChild(dayHead)
    hours.forEach((hour, index) => {
        let th = document.createElement('th')
        th.innerHTML = hour
        headerRow.appendChild(th)
    })
    thead.appendChild(headerRow)

    //create body rows with marks where classes should be
    days.forEach((day, indexD) => {
        //create day row 
        let dayRow = document.createElement('tr')
        let dayName = document.createElement('td')
        //add first td to day row (day name)
        dayName.innerHTML = day
        dayRow.appendChild(dayName)
        //create rest of td elements (for now empty) and append to day row
        hours.forEach((hours, indexH) => {
            let th = document.createElement('td')
            horarios[indexHor].body.clases.forEach((clase, indexC) => {
                clase.dias.forEach((dia) => {
                    if(indexD == dia.dia){
                        if(indexH >= (dia.horaI * 2) && indexH <= (dia.horaF * 2 - 1)){
                            th.style.background = colors[indexC]
                        }
                    }
                })
            })
            dayRow.appendChild(th)
        })
        tbody.appendChild(dayRow)
    })

    //header for table info
    let tableInfo = document.createElement('table')
    let infoHead = document.createElement('thead')
    let infoBody = document.createElement('tbody')

    tableInfo.appendChild(infoHead)
    tableInfo.appendChild(infoBody)

    div.appendChild(tableInfo)

    info.forEach((i) =>{
        let th = document.createElement('th')
        th.innerHTML = i
        infoHead.appendChild(th)
    })

    horario.body.clases.forEach((clase, indexC) => {
        let infoRow = document.createElement('tr')

        let infoColor = document.createElement('td')
        let infoNRC = document.createElement('td')
        let infoClass = document.createElement('td')
        let infoTeach = document.createElement('td')

        infoRow.appendChild(infoColor)
        infoRow.appendChild(infoNRC)
        infoRow.appendChild(infoClass)
        infoRow.appendChild(infoTeach)

        //infoColor.innerHTML = 'color_placeholder'
        infoColor.style.background = colors[indexC]
        infoNRC.innerHTML = clase.nrc
        infoClass.innerHTML = clase.clave
        infoTeach.innerHTML = clase.profe

        infoBody.appendChild(infoRow)
    })
})