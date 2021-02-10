import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setLoading } from '../../../modules/redux/auth/actions';
import { getDetailRooms } from '../../../modules/services/ListingsService';
import { isEmpty, isCurrency } from '../../../utils/functions';

const PropertyDescription = ({ listing, onClick }) => {
    const dispatch = useDispatch();

    const [detail, setDetail] = useState(false);
    const [description, setDescription] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (description) {
            dispatch(setLoading(true));
            getDetailRooms(listing.mlsNumber)
                .then((rooms) => {
                    setRooms(rooms);
                    dispatch(setLoading(false));
                })
                .catch((error) => {
                    dispatch(setLoading(false));
                });
        }
    }, [description]);

    return (
        <div key={listing.id} className='property-description-wrapper'>
            <span className='property-description-title'>Property Details:</span>
            <div key='part1' className='property-description-part'>
                <div key='neighborhood' className='property-description-item'>
                    <span className='property-description-item-title'>Neighbourhood:</span>
                    <span className='property-description-item-text'>{!isEmpty(listing.neighborhood) && listing.neighborhood}</span>
                </div>
                <div key='type' className='property-description-item'>
                    <span className='property-description-item-title'>Type:</span>
                    <span className='property-description-item-text'>{!isEmpty(listing.propertyType) && listing.propertyType}</span>
                </div>
                <div key='style' className='property-description-item'>
                    <span className='property-description-item-title'>Style:</span>
                    <span className='property-description-item-text'>{!isEmpty(listing.style) && listing.style}</span>
                </div>
                <div key='lotSize' className='property-description-item'>
                    <span className='property-description-item-title'>Lot Size:</span>
                    <span className='property-description-item-text'>---</span>
                </div>
                <div key='yearBuilt' className='property-description-item'>
                    <span className='property-description-item-title'>Year Built:</span>
                    <span className='property-description-item-text'>{!isEmpty(listing.detail.yearBuilt) && listing.detail.yearBuilt}</span>
                </div>
                <div key='taxes' className='property-description-item'>
                    <span className='property-description-item-title'>Taxes:</span>
                    <span className='property-description-item-text'>{!isEmpty(listing.tax.annualAmount) && isCurrency(parseFloat(listing.tax.annualAmount) / 12)}</span>
                </div>
                <div key='size' className='property-description-item'>
                    <span className='property-description-item-title'>Size:</span>
                    <span className='property-description-item-text'>{!isEmpty(listing.detail.sqft) && listing.detail.sqft + 'sqft'}</span>
                </div>
                <div key='basement' className='property-description-item'>
                    <span className='property-description-item-title'>Basement:</span>
                    <span className='property-description-item-text'>---</span>
                </div>
                <div key='laundry' className='property-description-item'>
                    <span className='property-description-item-title'>Laundry:</span>
                    <span className='property-description-item-text'>---</span>
                </div>
            </div>
            {listing.propertyType === 'Condo Apt' || listing.propertyType === 'Condo Townhouse' ?
                <div key='part2' className='property-description-part' style={{ marginTop: 15 }}>
                    <div key='condo' className='property-description-item'>
                        <span style={{ fontSize: 14, textDecorationLine: 'underline' }}>Condo</span>
                    </div>
                    <div key='maintenance' className='property-description-item'>
                        <span className='property-description-item-title'>Maintenance:</span>
                        <span className='property-description-item-text'>{!isEmpty(listing.maintenance) && '$' + listing.maintenance}</span>
                    </div>
                    <div key='exposure' className='property-description-item'>
                        <span className='property-description-item-title'>Exposure:</span>
                        <span className='property-description-item-text'>{!isEmpty(listing.condominium.exposure) && (
                            listing.condominium.exposure === 'E' ? 'East' : listing.condominium.exposure === 'W' ? 'West' : listing.condominium.exposure === 'N' ? 'North' : listing.condominium.exposure === 'Ne' ? 'North East' : listing.condominium.exposure === 'Nw' ? 'North West' : listing.condominium.exposure === 'S' ? 'South' : listing.condominium.exposure === 'Se' ? 'South East' : listing.condominium.exposure === 'Sw' ? 'South West' : null
                        )}</span>
                    </div>
                    <div key='Locker' className='property-description-item'>
                        <span className='property-description-item-title'>Locker:</span>
                        <span className='property-description-item-text'>{!isEmpty(listing.condominium.locker) && listing.condominium.locker}</span>
                    </div>
                    <div key='Balcony' className='property-description-item'>
                        <span className='property-description-item-title'>Balcony:</span>
                        <span className='property-description-item-text'>{!isEmpty(listing.detail.patio) && listing.detail.patio}</span>
                    </div>
                    <div key='Amenlties' className='property-description-item'>
                        <span className='property-description-item-title'>Amenlties:</span>
                        {/* {listing.condominium.ammenities.split('#').map((item, key) => {
                            !isEmpty(item) && (
                            <span key={key} style={{ fontSize: 14, width: '30%' }}>{item}</span>
                            )
                        })} */}
                    </div>
                </div> : null
            }

            {detail ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div key='part3' className='property-description-part' style={{ marginTop: 15 }}>
                        <div key='Utilities' className='property-description-item'>
                            <span style={{ fontSize: 14, textDecorationLine: 'underline' }}>Utilities</span>
                        </div>
                        <div key='Heat' className='property-description-item'>
                            <span className='property-description-item-title'>Heat:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.detail.heating) && listing.detail.heating}</span>
                        </div>
                        <div key='Hydro' className='property-description-item'>
                            <span className='property-description-item-title'>Hydro:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.hydroIncl) && (listing.hydroIncl === 'N' ? 'No' : 'Yes')}</span>
                        </div>
                        <div key='AC' className='property-description-item'>
                            <span className='property-description-item-title'>A/C:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.detail.airConditioning) && listing.detail.airConditioning}</span>
                        </div>
                        <div key='Water' className='property-description-item'>
                            <span className='property-description-item-title'>Water:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.waterIncl) && listing.waterIncl}</span>
                        </div>
                    </div>
                    <div key='part4' className='property-description-part' style={{ marginTop: 15 }}>
                        <div key='Building' className='property-description-item'>
                            <span style={{ fontSize: 14, textDecorationLine: 'underline' }}>Building</span>
                        </div>
                        <div key='Exterior' className='property-description-item'>
                            <span className='property-description-item-title'>Exterior:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.detail.exteriorConstruction1) && listing.detail.exteriorConstruction1}</span>
                        </div>
                        <div key='Garage' className='property-description-item'>
                            <span className='property-description-item-title'>Garage:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.detail.garage) && listing.detail.garage}</span>
                        </div>
                        <div key='Driveway' className='property-description-item'>
                            <span className='property-description-item-title'>Driveway:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.condominium.parkingType) && listing.condominium.parkingType}</span>
                        </div>
                        <div key='ParkingSpaces' className='property-description-item'>
                            <span className='property-description-item-title'>Parking Spaces:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.numParkingSpaces) && listing.numParkingSpaces}</span>
                        </div>
                        <div key='Furnished' className='property-description-item'>
                            <span className='property-description-item-title'>Furnished:</span>
                            <span className='property-description-item-text'>{!isEmpty(listing.detail.furnished) && listing.detail.furnished}</span>
                        </div>
                    </div>
                </div>
                : null}
            <button className='property-description-show-button' onClick={() => setDetail(!detail)}>
                <span style={{ fontSize: 14, color: '#4E9EE9' }}>
                    {detail ? 'Show Less' : 'Show More'}
                </span>
            </button>
            <span className='property-description-title'>Property Description:</span>
            <span className='property-description-item-text'>{listing.detail.description}</span>
            {(description && !isEmpty(rooms)) ?
                <React.Fragment>
                    <span className='property-description-title'>Extras:</span>
                    <span className='property-description-item-text'>{listing.detail.extras}</span>
                    <React.Fragment>
                        <span className='property-description-title'>Rooms and Sizes:</span>
                        {!isEmpty(rooms[0].description) &&
                            <div key={81} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[0].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[0].length) ? rooms[0].length : 0} X {!isEmpty(rooms[0].width) ? rooms[0].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[0].features}</span>
                            </div>}
                        {!isEmpty(rooms[1].description) &&
                            <div key={82} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[1].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[1].length) ? rooms[1].length : 0} X {!isEmpty(rooms[1].width) ? rooms[1].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[1].features}</span>
                            </div>}
                        {!isEmpty(rooms[2].description) &&
                            <div key={83} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[2].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[2].length) ? rooms[2].length : 0} X {!isEmpty(rooms[2].width) ? rooms[2].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[2].features}</span>
                            </div>}
                        {!isEmpty(rooms[3].description) &&
                            <div key={84} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[3].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[3].length) ? rooms[3].length : 0} X {!isEmpty(rooms[3].width) ? rooms[3].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[3].features}</span>
                            </div>}
                        {!isEmpty(rooms[4].description) &&
                            <div key={85} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[4].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[4].length) ? rooms[4].length : 0} X {!isEmpty(rooms[4].width) ? rooms[4].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[4].features}</span>
                            </div>}
                        {!isEmpty(rooms[5].description) &&
                            <div key={86} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[5].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[5].length) ? rooms[5].length : 0} X {!isEmpty(rooms[5].width) ? rooms[5].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[5].features}</span>
                            </div>}
                        {!isEmpty(rooms[6].description) &&
                            <div key={87} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[6].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[6].length) ? rooms[6].length : 0} X {!isEmpty(rooms[6].width) ? rooms[6].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[6].features}</span>
                            </div>}
                        {!isEmpty(rooms[7].description) &&
                            <div key={88} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[7].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[7].length) ? rooms[7].length : 0} X {!isEmpty(rooms[7].width) ? rooms[7].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[7].features}</span>
                            </div>}
                        {!isEmpty(rooms[8].description) &&
                            <div key={89} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[8].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[8].length) ? rooms[8].length : 0} X {!isEmpty(rooms[8].width) ? rooms[8].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[8].features}</span>
                            </div>}
                        {!isEmpty(rooms[9].description) &&
                            <div key={90} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[9].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[9].length) ? rooms[9].length : 0} X {!isEmpty(rooms[9].width) ? rooms[9].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[9].features}</span>
                            </div>}
                        {!isEmpty(rooms[10].description) &&
                            <div key={91} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[10].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[10].length) ? rooms[10].length : 0} X {!isEmpty(rooms[10].width) ? rooms[10].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[10].features}</span>
                            </div>}
                        {!isEmpty(rooms[11].description) &&
                            <div key={92} className='property-description-room-item'>
                                <span style={{ width: '30%', textAlign: 'center' }}>{rooms[11].description}</span>
                                <span style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[11].length) ? rooms[11].length : 0} X {!isEmpty(rooms[11].width) ? rooms[11].width : 0} ft</span>
                                <span style={{ width: '40%', textAlign: 'center' }}>{rooms[11].features}</span>
                            </div>}
                    </React.Fragment>
                    <span style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>Listed By: Re/Max Realty Services</span>
                    <span style={{ fontSize: 14, marginTop: 10 }}>
                        {'This listing data is provided under copyright by the Toronto Real Estate Board. This listing data is deemed reliable but is not gauranteed accurate by the Toronto Real Estate Board or Brokier.'}
                    </span>
                </React.Fragment>
                : null}
            <button className='property-description-show-button' onClick={() => setDescription(!description)}>
                <span style={{ fontSize: 14, color: '#4E9EE9' }}>
                    {description ? 'Show Less' : 'Show More'}
                </span>
            </button>
        </div>
    );
};

export default PropertyDescription;