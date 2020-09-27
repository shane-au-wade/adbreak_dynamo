console.log('popup script loaded')
let config = {
  routine: '',
  interval: ''
}

let updateConfigGUI = () => {
  document.querySelector('span#routineGUI').innerText = config.routine
  document.querySelector('span#intervalGUI').innerText = config.interval
}

let getConfig = async () => {
   await chrome.storage.local.get(['routine'], function(result) {
    //console.log(result);
    config.routine = result.routine
  });

  let res = await fetch(`http://localhost:3000/getAdbreakTimeInterval`, {
      method: 'get',
  });
  config.interval = res.headers.get('interval')
  console.log('config: ', config)
  return true
}

let main = async () => {
    await getConfig()
    updateConfigGUI()
}

main()

let setConfig = (key, value) => {
    config[key] = value
    //console.log('config:', config)
    updateConfigGUI()
}

let handleTimeIntervalUpdate = () => {
    let form = document.querySelector('form#timeIntervalForm')
    let value = form.timeInterval.value
    console.log('Time interval update: ', value)
    if(value !== '') {
        let url = `http://localhost:3000/updateAdbreakTimeInterval/${form.timeInterval.value}`
        fetch(url, {
            method: 'post',
        });
        setConfig('interval', form.timeInterval.value)
        form.reset()
    }
}
document.querySelector('button#updateTimeInterval').addEventListener('click', () => {
     handleTimeIntervalUpdate()
})


let handleRoutineUpdate = () => {
  let form = document.querySelector('form#monetizationRoutineForm')
  let value = form.routine.value
  if(value !== '') {
      chrome.storage.local.set({routine: value}, function() {
          console.log('Local storage routine updated: ', value);
          setConfig('routine', value)
      });
      form.reset()
  }
}
document.querySelector('button#updateRoutine').addEventListener('click', () => {
   handleRoutineUpdate()
})


let handleCodeCopy = () => {
  let url = `http://localhost:3000/getAdbreakScriptText`
        fetch(url, {
            method: 'get',
        });
}
document.querySelector('button#copyBtn').addEventListener('click', () => {
  handleCodeCopy()
})