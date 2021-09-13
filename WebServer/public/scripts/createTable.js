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

var h = document.getElementById('headers');

hours.forEach((hour, index) => {
    console.log(hour)
    let th = document.createElement('th')
    th.textContent = hour
    h.appendChild(th)
})