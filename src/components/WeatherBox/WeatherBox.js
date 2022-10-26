import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [cityWeather, setCityWeather] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(searchCity => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=91285d50f3452fdecb3d6880dee8ff54&units=metric`)
   .then(res => res.json())
   .then(data => {
     setPending(false);

     const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
     };
     setCityWeather(weatherData);
   });
   
   
  })

  return (
    <section>
      <PickCity searchCity={ handleCityChange }/>
      { (cityWeather && !pending) && <WeatherSummary {...cityWeather}/>}
      { pending && <Loader />}
    </section>
  )
};

export default WeatherBox;