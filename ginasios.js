const ginasios = [
    {
        "id": 0,
        "nome": "Ginásio de Pewter",
        "cartas": []
    },
    {
        "id": 1,
        "nome": "Ginásio de Cerulean",
        "cartas": []
    },
    {
        "id": 2,
        "nome": "Ginásio de Surge",
        "cartas": []
    }
];

export function getGinasios(){
    return structuredClone(ginasios);
}