let watchdog = {
    timerHandle: null, 
    incidents: 0
}

const startTimer = async (time, callback) => {
    watchdog.timerHandle = setTimeout(() => { 
        watchdog.incidents += 1
        callback()
    }, time)
}

const updateTimer = async (time, callback) => {
    clearTimeout(watchdog.timerHandle)
    startTimer(time, callback)
}
 
const clearTimer = async () => {
    clearTimeout(watchdog.timerHandle)
}

const getIncidents = async () => {
    return watchdog.incidents
}

module.exports = {startTimer, updateTimer, clearTimer, getIncidents}