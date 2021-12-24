const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherform.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = ''
                messageTwo.textContent = location + ' Latitude = ' + data.latitude + '\n' + location + ' Longitude = ' + data.longitude + '\n' + location + ' Temperature = ' + data.temperature + '\n' + location + ' precepitation = ' + data.percepetation
                console.log(data)
            }
        })
    })

})