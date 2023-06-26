const ginasios = [
    {
        "id": 1,
        "nome": "Ginásio de Pewter",
        "cartas": []
    },
    {
        "id": 2,
        "nome": "Ginásio de Cerulean",
        "cartas": []
    },
    {
        "id": 3,
        "nome": "Ginásio de Surge",
        "cartas": []
    }
];

export function getGinasios(){
    return structuredClone(ginasios);
}