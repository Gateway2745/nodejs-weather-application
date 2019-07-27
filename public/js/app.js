

const weatherForm = document.querySelector('#address');
const search = document.querySelector('input');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

weatherForm.addEventListener('click' , (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    p1.textContent = "GETTING DATA!!!"
    fetch(`http://localhost:5000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if('error' in data) p1.textContent = data.error;
        else{
            p1.textContent = "Location: " + data.address;
            p2.textContent = "Forecast: " + data.forecast;
        }
    })
})
})