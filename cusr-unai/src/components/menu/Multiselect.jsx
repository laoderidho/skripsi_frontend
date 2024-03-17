import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Button, Container } from 'react-bootstrap';

function Multiselect({ apiEndpoint, value, onChange, placeholder, disabled }) {
    const [options, setOptions] = useState([]); // State for options fetched from API
    const [selectedTags, setSelectedTags] = useState(value || []);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSelected, setIsSelected] = useState({}); 

    const multiselectRef = useRef(null); 

    useEffect(() => {
        fetch(apiEndpoint)
            .then(response => {
                // Check if response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch options');
                }
                // Check Content-Type header
                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Response is not JSON');
                }
                // Parse JSON response
                return response.json();
            })
            .then(data => {
                console.log('Options data:', data);
                setOptions(data);
            })
            .catch(error => {
                console.error('Error fetching options:', error);
                // Handle the error gracefully, for example, setting options to an empty array
                setOptions([]);
            });
    }, [apiEndpoint]);
    
    

    useEffect(() => {
        if (value) {
            setSelectedTags(value);
            const selected = {};
            value.forEach(tag => {
                selected[tag] = true;
            });
            setIsSelected(selected);
        }
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (multiselectRef.current && !multiselectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [multiselectRef]);

    const toggleTag = (tag) => {
        if (disabled) return; 

        const index = selectedTags.indexOf(tag);
        if (index === -1) {
            setSelectedTags([...selectedTags, tag]);
            setIsSelected({ ...isSelected, [tag]: true });
        } else {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
            setIsSelected({ ...isSelected, [tag]: false });
        }
        onChange(selectedTags); // This might need to be changed
    };

    const toggleDropdown = () => {
        if (disabled) return; 
        setIsOpen(!isOpen);
    };

    const handleClear = () => {
        if (disabled) return; 
        setSelectedTags([]);
        setIsSelected({}); 
        onChange([]); // This might need to be changed
    };

    const filterOptions = (options) => {
        return options.filter((option) =>
            typeof option === 'string' && option.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <div ref={multiselectRef} className={`container container-set ${disabled ? 'disabled' : ''}`}>
            <div className={`custom-select ${isOpen ? 'open' : ''}`}>
                <div className='select-box' onClick={toggleDropdown}>
                    <div className='selected-options'>
                        {selectedTags.length === 0 ? (
                            <span className="placeholder">{placeholder}</span>
                        ) : (
                            selectedTags.map((tag, index) => (
                                <span className='tag' key={index}>
                                    {tag.split(' ')[0]}
                                    <span className='remove-tag' onClick={() => toggleTag(tag)}>
                                        &times;
                                    </span>
                                </span>
                            ))
                        )}
                    </div>
                    <div className='arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div className='options'>
                    <div className='see-option'>
                        <div>
                            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Selected Options</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul className='modal-tag-list'>
                                        {selectedTags.map((tag, index) => (
                                            <li className='modal-tag' key={index}>
                                                {tag}
                                                <span className='remove-tag' onClick={() => toggleTag(tag)}>
                                                    &times;
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div className='option-search-tags'>
                            <Container className="full-width-container">
                                <Row className='no-space-between-columns'>
                                    <Col xs={11} className='no-space col-no-space'>
                                        <div className='search-tags-box'>
                                            <input
                                                type="text"
                                                className='search-tags'
                                                placeholder='Search'
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={1} className='no-space col-no-gap'>
                                        <Button type='button' className='clear' onClick={handleClear}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    {filterOptions(options).map((option, index) => (
                        <div className='option-select' onClick={() => toggleTag(option)} key={index}>
                            <Row>
                                <Col xs={1}>
                                    <span>
                                        {isSelected[option] ? (
                                            <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="23" height="23" transform="translate(1 1)" fill="#316DC8"/>
                                                <path d="M5.79169 12.9792L11.5417 18.7292L20.1667 5.79169" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <rect x="0.5" y="0.5" width="24" height="24" rx="1.5" stroke="#cacaca"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="24" height="24" rx="1.5" stroke="#cacaca"/>
                                            </svg>
                                        )}
                                    </span>
                                </Col>
                                <Col xs={11}>
                                    <span>
                                        {option}
                                    </span>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    
                    {filterOptions(options).length === 0 && (
                        <div className='no-result-message'>No result match</div>
                    )}
                </div>
            </div>

            <div>
                <span id='form-label' className='see-option-link' onClick={() => setShowModal(true)}>See selected options</span>
            </div>
        </div>
    );
}

export default Multiselect;
