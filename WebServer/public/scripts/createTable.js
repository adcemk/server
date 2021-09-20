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
horasMap = ['0700','0800','0900','1000','1100',
            '1200','1300','1400','1500','1600',
            '1700','1800','1900','2000','2100'] 

var horariosString = sessionStorage.getItem('horarios')
var horarios = JSON.parse(horariosString)
var indexHor = 0
console.log('in tables.html')
console.log(horarios[0])
console.log(horarios[indexHor].body.clases)

//create main table elements
let table = document.createElement('table')
let thead = document.createElement('thead')
let tbody = document.createElement('tbody')

table.appendChild(thead)
table.appendChild(tbody)

//append created table to body of document
document.getElementById('body').appendChild(table)

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

//create empty rows with days
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
        horarios[indexHor].body.clases.forEach((clase) => {
            clase.dias.forEach((dia) => {
                if(indexD == dia.dia){
                    if(indexH >= (dia.horaI * 2) && indexH <= (dia.horaF * 2 - 1)){
                        th.innerHTML = 'X'
                    }
                }
            })
        })
        dayRow.appendChild(th)
    })
    tbody.appendChild(dayRow)
})
