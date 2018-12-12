import Cloud from '../../assets/cloud.svg';
import Cloudy from '../../assets/cloudy.svg';
import Sun from '../../assets/sun.svg';
import Rain from '../../assets/rain.svg';
import Snow from '../../assets/snow.svg';
import ThunderStorm from '../../assets/thunderStorm.svg';

// Konteiner pro funkce pro transformaci dat z open weather api

// Vytvoří 5 objektů obsahujících klíčové property date, pro roztříděná data
export const createForecastContainers = () => {
    const fiveDays = [{}, {}, {}, {}, {}].map((day, index) => {
        if (index === 0) {
            return {
                date: new Date().toISOString().slice(0,10),
                shortName: new Date().toDateString().split(" ")[0]
            }    
        } else {
            return {
                date: new Date(new Date().setDate(new Date().getDate() + index)).toISOString().slice(0,10),
                shortName: new Date(new Date().setDate(new Date().getDate() + index)).toDateString().split(" ")[0] 
            }
        }
        
    })
    //vrací pole pěti objektů s každým obsahujícím své datum
    return fiveDays;
}

// Má za úkol vytříbit data pro jednotlivé dny a pak je těmi daty jimi naplnit
export const forecastContainersDataFeeder = (containers, apiData) => {
    const feedContainers = containers.map(container => {
            container.data = apiData.filter(item => {
            return item.dt_txt.split(" ")[0] === container.date
        })
        return container;
    })
    return feedContainers;
}

// Cílem funkce je propočítat pro každý z předpovídaných dnů min a max teplotu a přidat ji do kontejneru
export const calculateMinAndMaxTempsForContainers = (containers) => {
    const feedContainers = containers.map(container => {
        let maxTemp = 0;
        let minTemp = 0;
        container.data.map((interval, index) => {            
            if (interval.main.temp_max > maxTemp) {
                maxTemp = interval.main.temp_max       
            }
            if ((interval.main.temp_min < minTemp) || index === 0) {
                minTemp = interval.main.temp_min                
            }
            return;    
        });               
        container.maxDayTemp = Math.round(maxTemp - 273.15)
        container.minDayTemp = Math.round(minTemp - 273.15)
        return container; 
    })
    return feedContainers;
}



// Zjistí průměrné weather id  dne a podle této hodnuty vrací ikonu
export const calculateWeatherIconByAVGIdsForContainers = (containers) => {
    const feedContainers = containers.map(container => {
        let sumId = 0;
        container.data.forEach(interval => {
            sumId += interval.weather[0].id
        })
        const id = sumId / container.data.length;
        console.log('[TESTID]', id);
        if (id === 800) {
            container.weatherIcon = Sun;
            return container;
        } else if (id > 800) {
            container.weatherIcon = Cloudy;
            return container;
        } else if (id === 500 || (id > 500 && id < 600)) {
            container.weatherIcon = Rain;            
            return container;
        } else if (id === 600 || (id > 600 && id < 701) || id === 300 || (id > 300 && id < 400)) {
            container.weatherIcon = Snow;
            return container;
        } else if (id === 200 || (id > 200 && id < 300)) {
            container.weatherIcon = ThunderStorm;            
            return container;
        }
    })
    return feedContainers;
    
}

 // Vytvoří v každém konteineru pole obsahující časové intervali s hodnotamy pro maximální 
 // a minimální teplotu, čas předpovědi a ikonu počasí 
export const deriveTimeIntervals = (containers) => {
    const feedContainers = containers.map(container => {
        container.timeIntervals = [];
        container.data.forEach(interval => {
            container.timeIntervals.push({
                timeInterval: interval.dt_txt.split(" ")[1],
                maxTemp: Math.round(interval.main.temp_max - 273.15),
                minTemp: Math.round(interval.main.temp_min - 273.15),
                weatherIcon: (() => {
                    if (interval.weather[0].id === 800) {
                        return Sun;
                    } else if (interval.weather[0].id > 800) {
                        return Cloudy;
                    } else if (interval.weather[0].id === 500 || (interval.weather[0].id > 500 && interval.weather[0].id < 600)) {
                        return Rain;            
                    } else if (interval.weather[0].id === 600 || (interval.weather[0].id > 600 && interval.weather[0].id < 701) || interval.weather[0].id === 300 || (interval.weather[0].id > 300 && interval.weather[0].id < 400)) {
                        return Snow;
                    } else if (interval.weather[0].id === 200 || (interval.weather[0].id > 200 && interval.weather[0].id < 300)) {
                        return ThunderStorm;            
                    }
                })()
            });
            return;
        })
        return container;
       
    })
    return feedContainers;
}