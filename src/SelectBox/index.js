import './style.css';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

function SelectBox({options, onChange}) {

    const [displayOptions, toggleOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ text: "", value: "", image: "" });

    

    useEffect(() =>{
        setSelectedOption(options.find(e => e.value == "") || options[0]);
    }, [])

    const optionSelected = (e) => {
        const selectedValue= e.target.getAttribute('dataset');
        setSelectedOption(options.find(e => e.value == selectedValue));
        onChange(selectedValue);
    }

    return (
        <div  tabIndex={0} onBlur={() => toggleOptions(false)} onClick={() => toggleOptions(prev => !prev)} className="bpw-selectbox">
            <div className="bpw-selected-item-container">
                <div className="bpw-selected-item" dataset="Fortnite">{selectedOption?.image && <img src={selectedOption?.image} />} {selectedOption?.text} </div>
                <div className="arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </div>
            <div className={`bpw-options ${!displayOptions ? 'bpw-options-hidden' : ''}`}>
                {options && options.map((item, i) => {
                    return (
                        <div key={i} onClick={optionSelected} className="bpw-option" dataset={item?.value}>{item?.image && <img src={item?.image} />} {item?.text} </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SelectBox;
