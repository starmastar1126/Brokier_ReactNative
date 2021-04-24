import React, { useState, Fragment } from "react";
import Select from 'react-select';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { isCurrency } from "../../../utils/functions";

const days = [
  { value: 0, label: 'Any' },
  { value: 1, label: '1 Day' },
  { value: 3, label: '3 Days' },
  { value: 7, label: '7 Days' },
  { value: 14, label: '14 Days' },
  { value: 30, label: '30 Days' },
  { value: 31, label: '30+ Days' },
];
const solds = [
  { value: 1, label: '1 Day' },
  { value: 7, label: '7 Days' },
  { value: 30, label: '30 Days' },
  { value: 90, label: '3 Months' },
  { value: 180, label: '6 Months' },
  { value: 365, label: '1 Year' },
  { value: 730, label: '2 Years' },
];

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: 'white',
      color: isFocused ? 'black' : isSelected ? 'blue' : 'grey',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: 'white',
      },
    };
  },
  input: styles => ({ ...styles, width: 100 }),
  placeholder: styles => ({ ...styles, }),
  singleValue: (styles) => ({ ...styles }),
};

const PropertyFilter = (props) => {
  const [allTypes, setAllTypes] = useState(window.filters.propertyType.allTypes);
  const [condoApartment, setCondoApartment] = useState(window.filters.propertyType.condoApartment);
  const [condoTown, setCondoTown] = useState(window.filters.propertyType.condoTown);
  const [detached, setDetached] = useState(window.filters.propertyType.detached);
  const [duplex, setDuplex] = useState(window.filters.propertyType.duplex);
  const [freeholdTown, setFreeholdTown] = useState(window.filters.propertyType.freeholdTown);
  const [land, setLand] = useState(window.filters.propertyType.land);
  const [multiFamily, setMultiFamily] = useState(window.filters.propertyType.multiFamily);
  const [semiDetached, setSemiDetached] = useState(window.filters.propertyType.semiDetached);
  const [minPrice, setMinPrice] = useState(window.filters.price.minPrice);
  const [maxPrice, setMaxPrice] = useState(window.filters.price.maxPrice);
  const [daysOnMarket, setDaysOnMarket] = useState({
    value: window.filters.daysOnMarket,
    label: window.filters.daysOnMarket === 0 ? 'Any' : window.filters.daysOnMarket === 1 ? '1 Day' : window.filters.daysOnMarket === 3 ? '3 Days' : window.filters.daysOnMarket === 7 ? '7 Days' : window.filters.daysOnMarket === 14 ? '14 Days' : window.filters.daysOnMarket === 30 ? '30 Days' : '30+ Days'
  });
  const [soldInLast, setSoldInLast] = useState({
    value: window.filters.soldInLast,
    label: window.filters.soldInLast === 60 ? 'Any' : window.filters.soldInLast === 1 ? '1 Day' : window.filters.soldInLast === 7 ? '7 Days' : window.filters.soldInLast === 30 ? '30 Days' : window.filters.soldInLast === 90 ? '3 Months' : window.filters.soldInLast === 180 ? '6 Months' : window.filters.soldInLast === 365 ? '1 Year' : '2 Years'
  });
  const [bed, setBed] = useState(window.filters.rooms.bed);
  const [bath, setBath] = useState(window.filters.rooms.bath);
  const [garage, setGarage] = useState(window.filters.rooms.garage);
  const [parking, setParking] = useState(window.filters.rooms.parking);
  const [minSize, setMinSize] = useState(window.filters.size.minSize);
  const [maxSize, setMaxSize] = useState(window.filters.size.maxSize);
  const [minAge, setMinAge] = useState(window.filters.age.minAge);
  const [maxAge, setMaxAge] = useState(window.filters.age.maxAge);
  const [minCondo, setMinCondo] = useState(window.filters.condo.minCondo);
  const [maxCondo, setMaxCondo] = useState(window.filters.condo.maxCondo);
  const [locker, setLocker] = useState('Any');


  return (
    <Fragment>
      <div className='property-filter-wrapper' onClick={() => props.onClose()} />
      <div id='filter-container' className='property-filter-container'>
        <div style={{ backgroundColor: 'white' }}>
          <div className='mobile-filter-header'>
            <div style={{ width: 20 }}></div>
            <span className='mobile-filter-title'>Filter Listings</span>
            <button className='mobile-back-button' onClick={() => props.onClose()}>
              <i className='far fa-times f-s-15' style={{ paddingRight: 5 }}></i>
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
            <div index={12} className='property-filter-card'>
              <div className='wrapper'>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Property Type</span>
                <div className='types'>
                  <button className='item' style={{ borderColor: allTypes ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(!allTypes);
                    setDetached(false);
                    setSemiDetached(false);
                    setFreeholdTown(false);
                    setCondoTown(false);
                    setCondoApartment(false);
                    setDuplex(false);
                    setMultiFamily(false);
                    setLand(false);
                  }}>
                    <span style={{ fontSize: 12 }}>All Types</span>
                  </button>
                  <button className='item' style={{ borderColor: detached ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setDetached(!detached);
                  }}>
                    <span style={{ fontSize: 12 }}>Detached</span>
                  </button>
                  <button className='item' style={{ borderColor: semiDetached ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setSemiDetached(!semiDetached);
                  }}>
                    <span style={{ fontSize: 12 }}>Semi-Detached</span>
                  </button>
                </div>
                <div className='types'>
                  <button className='item' style={{ borderColor: freeholdTown ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setFreeholdTown(!freeholdTown);
                  }}>
                    <span style={{ fontSize: 12, spanAlign: 'center' }}>Row/<br />Freehold Town</span>
                  </button>
                  <button className='item' style={{ borderColor: condoTown ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setCondoTown(!condoTown);
                  }}>
                    <span style={{ fontSize: 12 }}>Condo Town</span>
                  </button>
                  <button className='item' style={{ borderColor: condoApartment ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setCondoApartment(!condoApartment);
                  }}>
                    <span style={{ fontSize: 12 }}>Condo Apartment</span>
                  </button>
                </div>
                <div className='types'>
                  <button className='item' style={{ borderColor: duplex ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setDuplex(!duplex);
                  }}>
                    <span style={{ fontSize: 12 }}>Duplex</span>
                  </button>
                  <button className='item' style={{ borderColor: multiFamily ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setMultiFamily(!multiFamily);
                  }}>
                    <span style={{ fontSize: 12 }}>Multi-Family</span>
                  </button>
                  <button className='item' style={{ borderColor: land ? 'red' : '#aaa' }} onClick={() => {
                    setAllTypes(false);
                    setLand(!land);
                  }}>
                    <span style={{ fontSize: 12 }}>Land</span>
                  </button>
                </div>
              </div>
            </div>

            <div index={13} className='property-filter-card'>
              <div className='wrapper'>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Price Range</span>
                <div className='range'>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12 }}>{isCurrency(minPrice).split('.')[0]}</span>
                    <span style={{ fontSize: 12 }}>{isCurrency(maxPrice).split('.')[0]}{maxPrice === 5000000 && '+'}</span>
                  </div>
                  <div style={{ marginTop: 15, height: 20, paddingRight: 10 }}>
                    <Range
                      min={0}
                      max={5000000}
                      allowCross={false}
                      defaultValue={[minPrice, maxPrice]}
                      value={[minPrice, maxPrice]}
                      onChange={(value) => {
                        setMinPrice(value[0]);
                        setMaxPrice(value[1]);
                      }}
                      handleStyle={[
                        {
                          top: 3,
                          backgroundColor: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black'
                        },
                        {
                          top: 3,
                          backgroundColor: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      ]}
                      trackStyle={[{
                        backgroundColor: 'grey'
                      }, {
                        backgroundColor: '#bbb'
                      }]}
                      railStyle={{
                        backgroundColor: '#bbb'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div index={14} className='property-filter-card'>
              <div className='pickers'>
                <div className='picker'>
                  <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Days listings is on market:</span>
                  <Select
                    value={daysOnMarket}
                    onChange={(value) => setDaysOnMarket(value)}
                    options={days}
                    styles={colourStyles}
                  />
                </div>
                <div className='picker'>
                  <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Sold in the last:</span>
                  <Select
                    value={soldInLast}
                    onChange={(value) => setSoldInLast(value)}
                    options={solds}
                    styles={colourStyles}
                  />
                </div>
              </div>
            </div>

            <div index={15} className='property-filter-card'>
              <div className='wrapper'>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Beds, Baths, Parking</span>
                <div className='parking'>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '60%' }}>
                    <span style={{ width: 50 }}>Beds</span>
                    <button className='property-filter-round-button' onClick={() => bed !== 0 && setBed(bed - 1)}>
                      <i className='fas fa-minus f-s-10'></i></button>
                    <span>{bed}+</span>
                    <button className='property-filter-round-button' onClick={() => setBed(bed + 1)}>
                      <i className='fas fa-plus f-s-10'></i></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '60%', marginTop: 5 }}>
                    <span style={{ width: 50 }}>Baths</span>
                    <button className='property-filter-round-button' onClick={() => bath !== 0 && setBath(bath - 1)}>
                      <i className='fas fa-minus f-s-10'></i></button>
                    <span>{bath}+</span>
                    <button className='property-filter-round-button' onClick={() => setBath(bath + 1)}>
                      <i className='fas fa-plus f-s-10'></i></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '60%', marginTop: 5 }}>
                    <span style={{ width: 50 }}>Parking</span>
                    <button className='property-filter-round-button' onClick={() => parking !== 0 && setParking(parking - 1)}>
                      <i className='fas fa-minus f-s-10'></i></button>
                    <span>{parking}+</span>
                    <button className='property-filter-round-button' onClick={() => setParking(parking + 1)}>
                      <i className='fas fa-plus f-s-10'></i></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '60%', marginTop: 5 }}>
                    <span style={{ width: 50 }}>Garage</span>
                    <button className='property-filter-round-button' onClick={() => garage !== 0 && setGarage(garage - 1)}>
                      <i className='fas fa-minus f-s-10'></i></button>
                    <span>{garage}+</span>
                    <button className='property-filter-round-button' onClick={() => setGarage(garage + 1)}>
                      <i className='fas fa-plus f-s-10'></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div index={16} className='property-filter-card'>
              <div className='wrapper'>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Size</span>
                <div className='range'>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12 }}>{minSize}Sqft</span>
                    <span style={{ fontSize: 12 }}>{maxSize}{maxSize === 5000 && '+'}Sqft</span>
                  </div>
                  <div style={{ marginTop: 15, height: 30, paddingRight: 10 }}>
                    <Range
                      min={0}
                      max={5000}
                      allowCross={false}
                      defaultValue={[minSize, maxSize]}
                      value={[minSize, maxSize]}
                      onChange={(value) => {
                        setMinSize(value[0]);
                        setMaxSize(value[1]);
                      }}
                      handleStyle={[
                        {
                          top: 3,
                          backgroundColor: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black'
                        },
                        {
                          top: 3,
                          backgroundColor: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      ]}
                      trackStyle={[{
                        backgroundColor: 'grey'
                      }, {
                        backgroundColor: '#bbb'
                      }]}
                      railStyle={{
                        backgroundColor: '#bbb'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div index={17} className='property-filter-card'>
              <div className='wrapper'>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Age</span>
                <div className='range'>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12 }}>{minAge < 5 ? 'New Construction' : minAge + ' years old'}</span>
                    <span style={{ fontSize: 12 }}>{maxAge} years old</span>
                  </div>
                  <div style={{ marginTop: 15, height: 30, paddingRight: 10 }}>
                    <Range
                      min={0}
                      max={100}
                      allowCross={false}
                      defaultValue={[minAge, maxAge]}
                      value={[minAge, maxAge]}
                      onChange={(value) => {
                        setMinAge(value[0]);
                        setMaxAge(value[1]);
                      }}
                      handleStyle={[
                        {
                          top: 3,
                          backgroundColor: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black'
                        },
                        {
                          top: 3,
                          backgroundColor: 'white',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black'
                        }
                      ]}
                      trackStyle={[{
                        backgroundColor: 'grey'
                      }, {
                        backgroundColor: '#bbb'
                      }]}
                      railStyle={{
                        backgroundColor: '#bbb'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div index={17} className='property-filter-card'>
              <div className='wrapper'>
                {props.view && <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Condo Filters</span>}
                <div className='range'>
                  {props.view &&
                    <React.Fragment>
                      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12 }}>{isCurrency(minCondo).split('.')[0]}</span>
                        <span style={{ fontSize: 12 }}>Max HOA / Maintenance Fees</span>
                        <span style={{ fontSize: 12 }}>{isCurrency(maxCondo).split('.')[0]}{maxCondo === 5000 && '+'}</span>
                      </div>
                      <div style={{ marginTop: 15, height: 30, paddingRight: 10 }}>
                        <Range
                          min={0}
                          max={100}
                          allowCross={false}
                          defaultValue={[minCondo, maxCondo]}
                          value={[minCondo, maxCondo]}
                          onChange={(value) => {
                            setMinCondo(value[0]);
                            setMaxCondo(value[1]);
                          }}
                          handleStyle={[
                            {
                              top: 3,
                              backgroundColor: 'white',
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              borderWidth: 2,
                              borderColor: 'black'
                            },
                            {
                              top: 3,
                              backgroundColor: 'white',
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              borderWidth: 2,
                              borderColor: 'black'
                            }
                          ]}
                          trackStyle={[{
                            backgroundColor: 'grey'
                          }, {
                            backgroundColor: '#bbb'
                          }]}
                          railStyle={{
                            backgroundColor: '#bbb'
                          }}
                        />
                      </div>
                    </React.Fragment>}
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ textAlign: 'center', marginBottom: 5 }}>Locker / Storage</span>
                  <div className='property-filter-toggle-buttons' style={{ marginBottom: 0 }}>
                    <button onClick={() => setLocker('Any')} className='button'
                      style={{ width: '30%', backgroundColor: locker === 'Any' ? 'white' : '#E8E8E8' }}>
                      <span>Any</span>
                    </button>
                    <button onClick={() => setLocker('Yes')} className='button'
                      style={{ width: '30%', backgroundColor: locker === 'Yes' ? 'white' : '#E8E8E8' }}>
                      <span>Yes</span>
                    </button>
                    <button onClick={() => setLocker('No')} className='button'
                      style={{ width: '30%', backgroundColor: locker === 'No' ? 'white' : '#E8E8E8' }}>
                      <span>No</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='property-filter-bottom-buttons'>
          <button
            className='clear-button'
            onClick={() => props.onClearFilters({
              type: null,
              lastStatus: null,
              propertyType: {
                allTypes: false,
                condoApartment: false,
                condoTown: false,
                detached: false,
                duplex: false,
                freeholdTown: false,
                land: false,
                multiFamily: false,
                semiDetached: false,
              },
              price: {
                minPrice: 0,
                maxPrice: 5000000,
              },
              daysOnMarket: 0,
              soldInLast: 90,
              rooms: {
                bed: 0,
                bath: 0,
                garage: 0,
                parking: 0,
              },
              size: {
                minSize: 0,
                maxSize: 5000,
              },
              age: {
                minAge: 0,
                maxAge: 100,
              },
              condo: {
                minCondo: 0,
                maxCondo: 5000
              }
            }, false)}
          >
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>CLEAR</span>
          </button>
          <button
            className='apply-button'
            onClick={() => props.onAppleFilters({
              type: null,
              lastStatus: null,
              propertyType: {
                allTypes: allTypes,
                detached: detached,
                semiDetached: semiDetached,
                freeholdTown: freeholdTown,
                condoTown: condoTown,
                condoApartment: condoApartment,
                duplex: duplex,
                multiFamily: multiFamily,
                land: land
              },
              price: {
                minPrice: minPrice,
                maxPrice: maxPrice
              },
              daysOnMarket: daysOnMarket.value,
              soldInLast: soldInLast.value,
              rooms: {
                bed: bed,
                bath: bath,
                parking: parking,
                garage: garage
              },
              size: {
                minSize: minSize,
                maxSize: maxSize
              },
              age: {
                minAge: minAge,
                maxAge: maxAge
              },
              condo: {
                minCondo: minCondo,
                maxCondo: maxCondo
              }
            }, true)}
          >
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>APPLY FILTERS</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default PropertyFilter;