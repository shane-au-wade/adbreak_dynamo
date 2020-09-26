console.log('index.js file loaded')

let btn = document.querySelector('button#btn0')


let handleSumbit = () => {
    let form = document.querySelector('form#form0')
    let value = form.timeInterval.value
    console.log('Time interval update: ', value)
    if(value !== '') {
        let url = `http://localhost:3000/updateAdbreakTimeInterval/${form.timeInterval.value}`
        fetch(url, {
            method: 'post',
        });
        form.reset()
    }
}
 btn.addEventListener('click', () => {
     handleSumbit()
 })