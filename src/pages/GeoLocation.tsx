import React, { useEffect, useState } from 'react';
import { geoData } from '../config/geotypes';
import { getGeoLocation, getIpAddress } from '../functions/apis';
import { DigitalClock } from './DigitalClock';
import { Radio } from 'react-loader-spinner';
import { Tooltip } from '@mui/material';


export const GeoLocation = () => {
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState(false);
    const handleVisibility = () => {
      setShow(true);
    }
    let [data, setData] = useState<geoData>({
      as: '',
      city: '',
      country: '',
      countryCode: '',
      isp: '',
      lat: 0,
      lon: 0,
      org: '',
      query: '',
      region: '',
      regionName: '',
      status: '',
      timezone: '',
      zip: '',
    });
    const [ip, setIP] = useState('');
    useEffect(() => {
      getWeatherData();
    });

    const handleRefresh = () => {
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 2000);
      getWeatherData();
    }

    const getWeatherData = async () => {
      await getIpAddress()
        .then(async (res) => {
          setIP(res);
          let dat: any = await getGeoLocation(res);
          setData(dat.data);
          handleVisibility();
        })
        .catch((err) => {
          console.log("err: ", err);
        })
    }
    
    return (
      <>
        {
          !show ? <Radio
              wrapperClass='geo-loader'
              colors={['#fe5876', '#fe5876', '#fe5876']}
            />
          :
          <div className='geo-app'>
            <h5 className='geo-country'>{data.country}, {data.regionName} 
              <span onClick={handleRefresh}>
                <Radio
                    height="20"
                    width="20"
                    wrapperStyle={{float: 'right', cursor: 'pointer'}}
                    colors={['#fe5876', '#fe5876', '#fe5876']}
                />
              </span>
            </h5>
            <h2 className='geo-city'><span className="material-symbols-outlined geo-icon">location_on</span>{data.city}</h2>
            <DigitalClock />
            <h4 className='geo-date'><span className="material-symbols-outlined">today</span><span className="digi-time">{new Date().toLocaleString().split(',')[0]}</span></h4>
            <br></br>
            <footer className='geo-footer'>
              {msg && <small className='geo-msg'>Refreshing...</small>}
              <small className='geo-pip'>Your Public IP: <Tooltip placement='top' style={{background: 'white'}} title={data.isp}><span style={{color: '#049b6a', fontWeight: 'bold', fontSize: '0.7rem'}}>{ip}</span></Tooltip></small>
            </footer>
          </div>
        }
      </>
    )
}
