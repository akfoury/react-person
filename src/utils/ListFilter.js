// Algorithme de filtrage de la liste
export const getListOfFilteredID = (filterOptions, list) => {
    let counter = {}
    list.map(item => counter[item.id] = 0);
    list.map(item => {
        Object.entries(item).map(val => {
            if (String(val[1]).toLowerCase().startsWith(String(filterOptions[val[0]]).toLowerCase()) && String(filterOptions[val[0]]) != '') {
                counter[item["id"]] += 1;
            }
        });  
    });
    const numberOfFieldsFilled = Object.values(filterOptions).filter(Boolean).length;
    counter = Object.entries(counter).filter(val => val[1] === numberOfFieldsFilled);
    counter = Object.fromEntries(counter);
    const idFiltered = Object.keys(counter);

    return idFiltered;
};