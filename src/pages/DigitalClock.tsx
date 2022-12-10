import { useEffect, useState } from "react";

export const DigitalClock = () => {
  const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }

        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        regionNames.of('US');
  
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
    
    return (
      <><h3 className="digi-clock"><span className="material-symbols-outlined geo-icon">schedule</span><span className="digi-time">{ date.toLocaleTimeString() }</span></h3></>
    )
}
