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
let info = ['Color', 'NRC', 'Code', 'Class', 'Teacher'] 

//  colors = [ P. Blue ,  B. Blue ,  Yellow  ,  Red     ,  Purple]
// let colors = ['#7289da', '#33ccff', '#ffff33', '#ff0000', '#cc00cc']
let colors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845']

var horariosString = sessionStorage.getItem('horarios')
var horarios = JSON.parse(horariosString)

horarios.forEach((horario, indexHor) => {

    console.log(horarios[indexHor].body.clases)

    let div = document.createElement('div')
    let divSched = document.createElement('div');

    //create main table elements
    let caption = document.createElement('caption')
    let tableSched = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')

    caption.innerHTML = "Horario #" + (indexHor+1)

    tableSched.appendChild(caption)
    tableSched.appendChild(thead)
    tableSched.appendChild(tbody)

    divSched.appendChild(tableSched)
    divSched.style.overflowX = "auto"

    div.appendChild(divSched)

    //append created table to body of document
    document.getElementById('body').appendChild(div)

    //create headers for table ()
    let headerRow = document.createElement('tr')
    let dayHead = document.createElement('th')
    //dayHead.innerHTML = "Day"
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
        let dayName = document.createElement('th')
        //add first td to day row (day name)
        dayName.innerHTML = day
        dayRow.appendChild(dayName)
        //create rest of td elements (for now empty) and append to day row
        hours.forEach((hours, indexH) => {
            let td = document.createElement('td')
            horarios[indexHor].body.clases.forEach((clase, indexC) => {
                clase.dias.forEach((dia) => {
                    if(indexD == dia.dia){
                        if(indexH >= (dia.horaI * 2) && indexH <= (dia.horaF * 2 - 1)){
                            td.style.background = colors[indexC]
                        }
                    }
                })
            })
            dayRow.appendChild(td)
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
        let infoCode = document.createElement('td')
        let infoClass = document.createElement('td')
        let infoTeach = document.createElement('td')

        infoRow.appendChild(infoColor)
        infoRow.appendChild(infoNRC)
        infoRow.appendChild(infoCode)
        infoRow.appendChild(infoClass)
        infoRow.appendChild(infoTeach)

        //infoColor.innerHTML = 'color_placeholder'
        infoColor.style.background = colors[indexC]
        infoNRC.innerHTML = clase.nrc
        infoCode.innerHTML = clase.clave
        infoClass.innerHTML = clase.materia
        infoTeach.innerHTML = clase.profe

        infoBody.appendChild(infoRow)
    })
})