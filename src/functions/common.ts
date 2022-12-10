export const currentTime = (): string => {
    let date: Date = new Date();
    let hh: string | number = date.getHours();
    let mm: string | number = date.getMinutes();
    let ss: string | number = date.getSeconds();
    let session: string = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
    return time;
    
}
  
  