const cartas = [
    {
        "id": 1,
        "Nome": "Magikarp",
        "Energia": 1,
        "Força": 1
    },
    {
        "id": 2,
        "Nome": "Jigglypuff",
        "Energia": 1,
        "Força": 2
    },
    {
        "id": 3,
        "Nome": "Diglet",
        "Energia": 1,
        "Força": 2
    },
    {
        "id": 4,
        "Nome": "Squirtle",
        "Energia": 2,
        "Força": 3
    },
    {
        "id": 5,
        "Nome": "Bulbassaur",
        "Energia": 2,
        "Força": 3
    },
    {
        "id": 6,
        "Nome": "Charmander",
        "Energia": 2,
        "Força": 4
    },
    {
        "id": 7,
        "Nome": "Pikachu",
        "Energia": 3,
        "Força": 5
    },
    {
        "id": 8,
        "Nome": "Gyarados",
        "Energia": 3,
        "Força": 6
    },
    {
        "id": 9,
        "Nome": "Articuno",
        "Energia": 4,
        "Força": 7
    },
    {
        "id": 10,
        "Nome": "Moltres",
        "Energia": 4,
        "Força": 7
    },
    {
        "id": 11,
        "Nome": "Zapdos",
        "Energia": 4,
        "Força": 7
    },
    {
        "id": 12,
        "Nome": "Mewtwo",
        "Energia": 5,
        "Força": 9
    }
]

export function getCartas(){
    return structuredClone(cartas);
}