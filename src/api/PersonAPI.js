// Récupérer toutes les personnes de la base de données
const getAllPerson = async () => {
    const myInit = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    };

    return await fetch('/person', myInit)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw response;
        });
}

// Récupérer toutes les personnes de la base de données triées selon une colonne
const getAllPersonSorteredByColumn = async (colName, direction) => {
    const myInit = {
        method: 'GET',
    };
    return await fetch(`person/${colName}/${direction}`, myInit)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw response;
        });
};

// Récupérer une ou toutes les personnes de la base de données
const postFormDataAsJson = async ({ formData, url }) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

// Mettre à jour une personne
const putFormDataAsJson = async ({ formData, url }) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}


// Supprimer une personne de la liste
const deletePerson = async (personID) => {
    const myInit = {
        method: 'DELETE',
    };
    return await fetch(`person/${personID}`, myInit);
};

export { getAllPerson, postFormDataAsJson, putFormDataAsJson, deletePerson, getAllPersonSorteredByColumn }