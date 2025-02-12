import {get_cookie } from './util.js'

const VIEWSTATE = parseInt(get_cookie('viewstate')) || 640

// Set dimensions
/*document.documentElement.style.width = VIEWSTATE + 'px'
document.documentElement.style.height = VIEWSTATE + 'px'*/
document.body.style.width = VIEWSTATE + 'px'
document.body.style.height = VIEWSTATE + 'px'

// Temps update
window.nzxt = {
    v1: {
        onMonitoringDataUpdate: (data) => {
            const { cpus, gpus, ram, kraken } = data; // Include kraken in the destructured data
            update_cpu_gpu(cpus[0].load, gpus[0].load, cpus[0].temperature, gpus[0].temperature);
            update_module(ram.totalSize, ram.inUse, kraken.liquidTemperature); // Access kraken.liquidTemperature
        }
    }
}

const cpu_temp = document.getElementById('cpu-gpu');
const update_module_element = document.getElementById('update-module'); // Properly select the element

function update_cpu_gpu(cpu_load, gpu_load, cpus_temp, gpus_temp) {
    cpu_temp.innerHTML = `CPU:[${(cpu_load * 100).toFixed(1)}% @ ${Math.round(cpus_temp)}C] </br> GPU:[${(gpu_load * 100).toFixed(1)}% @ ${Math.round(gpus_temp)}C]`;
}

function update_module(totalRam, useRam, liquidTemperature) {
    const totalRamGB = Math.round(totalRam / 1024); // Round total to a whole number
    const useRamGB = (useRam / 1024).toFixed(1); // Format in-use value to one decimal place

    let statusLabel = "Unknown";
    if (typeof liquidTemperature === "number") {
        if (liquidTemperature <= 50) {
            statusLabel = "Green";
        } else if (liquidTemperature > 50 && liquidTemperature <= 60) {
            statusLabel = "Yellow";
        } else {
            statusLabel = "Red";
        }
    }

    // Update the inner HTML properly
    update_module_element.innerHTML = `RAM:[${useRamGB}/${totalRamGB}GB] </br> Cooling:[${statusLabel} @ ${liquidTemperature}C]`;
}