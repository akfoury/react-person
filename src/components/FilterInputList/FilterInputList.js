import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import FilterInput from '../FilterInput/FilterInput';
import { getListOfFilteredID } from '../../utils/ListFilter';
import { 
    deleteAllPerson 
} from '../../api/PersonAPI';
import { setPersonList } from "../../actions";
import { ClearAll } from '@mui/icons-material';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
} from '@mui/material';

// Initialisation des valeurs de filtres
const initialFilteredPersonList = {
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    isActive: ''
}

function FilterInputList({ personList, setPersonList }) {
    const [filterOptions, setFilterOptions]  = useState(initialFilteredPersonList);

    // Gestion du state stockant les valeurs de filtrage
    const handleFormFilterInput = (e) => {
        const { value, name } = e.target;
        setFilterOptions(prevState => {
            return {...prevState, [name]: value}
        });
    }

    // Suppression de toutes les lignes
    const handleDeleteAll = (e) => {
        e.preventDefault();
        e.stopPropagation();

        deleteAllPerson().then(() => {
            setPersonList([]);
        });
    }

    // Appel de l'algorithme à chaque fois qu'une valeur de filtrage change
    useEffect(() => {
        const filteredID = getListOfFilteredID(filterOptions, personList);
        if (filteredID.length != 0) {
            setPersonList(personList.map(obj => filteredID.includes(String(obj.id)) ? ({...obj, visibility: true}) : ({...obj, visibility: false})));
        }
    }, [filterOptions]);

    return (
        <form className="filterForm">
            <ListItem className='list-item filters' ContainerComponent="div">
                <ListItemText
                    disableTypography
                    primary={<FilterInput filterOptions={filterOptions} optionName="id" handleFormFilterInput={handleFormFilterInput} />}
                    className='list-item-text'
                />
                <ListItemText
                    disableTypography
                    primary={<FilterInput filterOptions={filterOptions} optionName="firstname" handleFormFilterInput={handleFormFilterInput} />}
                    className='list-item-text'
                />
                <ListItemText
                    disableTypography
                    primary={<FilterInput filterOptions={filterOptions} optionName="lastname" handleFormFilterInput={handleFormFilterInput} />}
                    className='list-item-text'
                />
                <ListItemText
                    disableTypography
                    primary={<FilterInput filterOptions={filterOptions} optionName="address" handleFormFilterInput={handleFormFilterInput} />}
                    className='list-item-text'
                />
                <ListItemText
                    disableTypography
                    primary={<FilterInput filterOptions={filterOptions} optionName="isActive" handleFormFilterInput={handleFormFilterInput} />}
                    className='list-item-text'
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="deleteall" onClick={handleDeleteAll}>
                        <ClearAll
                            style={{fill: "#008080"}} 
                            fontSize="large"
                        />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        personList: state.personList.personList,
    }
}
const mapDispatchToProps = {
    setPersonList,
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(FilterInputList);

