import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';

const SeeModalData = ({ data, name, allData, onObj, myFunc, callDataBack }) => {
    const [dataModal, setDataModal] = useState(data);

    useEffect(() => {
        setDataModal(data);
    }, [data]);

    const handleRemoveItem = (index) => {
        const newData = [...dataModal];
        newData.splice(index, 1);
        setDataModal(newData);
        callDataBack(newData, allData, onObj, myFunc);
    };

    return (
              <div>
                <ul>
                    {dataModal ? (
                        dataModal.map((item, index) => (
                            <li key={index} className='modal-tag'>
                                {item}
                                <span className='remove-tag' onClick={() => handleRemoveItem(index)}>&times;</span>
                            </li>
                        ))
                    ) : (
                        <p>-</p>
                    )}
                </ul>
            </div>
    );
}

export default SeeModalData;
