const votes = [
    {
        id: 13,
        user: 'Pf10m2UgKUU5wjAE4DVAzmfIjXp2',
        category: 'Melhor Filme',
        nominee: 'teste1'
    },
    {
        id: 14,
        user: 'Pf10m2UgKUU5wjAE4DVAzmfIjXp2',
        category: 'Melhor Ator',
        nominee: 'RDJ'
    },
    {
        id: 15,
        user: 'Pf10m2UgKUU5wjAE4DVAzmfIjXp2',
        category: 'Melhor Atriz',
        nominee: 'Atriz1'
    },
    {
        id: 16,
        user: 'Pf10m2UgKUU5wjAE4DVAzmfIjXp2',
        category: 'Melhor Música',
        nominee: 'Música4'
    },
    {
        id: 17,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Filme',
        nominee: 'Titanic'
    },
    {
        id: 18,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Ator',
        nominee: 'Leonardo di Caprio'
    },
    {
        id: 19,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Atriz',
        nominee: 'Atriz2'
    },
    {
        id: 20,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Direção',
        nominee: 'Titanic'
    },
    {
        id: 21,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Roteiro Original',
        nominee: 'Música1'
    },
    {
        id: 22,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Maquiagem e Cabelo',
        nominee: 'Música1'
    },
    {
        id: 23,
        user: 'DG7K0bEvGeY0hp2FfKL1VRrkg3G3',
        category: 'Melhor Efeitos Visuais',
        nominee: 'Música1'
    },
    {
        id: 24,
        user: 'Pf10m2UgKUU5wjAE4DVAzmfIjXp2',
        category: 'Melhor Direção',
        nominee: 'Avatar: O caminho da água'
    },
    {
        id: 25,
        user: 'l1VhsyGLmYPKZeccBJ0zHuQ9Pc72',
        category: 'Melhor Filme',
        nominee: 'Titanic'
    },
    {
        id: 29,
        user: 'Pf10m2UgKUU5wjAE4DVAzmfIjXp2',
        category: 'Melhor Efeitos Visuais',
        nominee: 'Música4'
    }
]

answer = { "Melhor Ator": 'Leonardo di Caprio', "Melhor Filme": 'Titanic', "Melhor Música": 'Música4', "Melhor Efeitos Visuais": 'Música4', "Melhor Direção": 'Titanic' }

function organizeVotes(votes, answer) {
    return Object.values(votes.reduce((acc, vote) => {
        const user = vote.user
        const category = vote.category
        const nominee = vote.nominee

        if (acc[user]) {
            const correct = answer[category] === nominee ? acc[user].correct + 1 : acc[user].correct
            acc[user] = { user: user, correct }
            return acc
        } else {
            const correct = answer[category] === nominee ? 1 : 0
            acc[user] = { user: user, correct }
            console.log(acc)
            return acc
        }
    }, {}))



    // function joinRepeatedWords(arrayOfStrings) {
    //     return Object.values(arrayOfStrings.reduce((acc, word) => {
    //         const w = word.toLowerCase()
    //         const qtde = acc[w] ? acc[w].qtde + 1 : 1
    //         acc[w] = { word: w, qtde }

    //         return acc
    //     }, {}))
    // }

}




// console.log(organizeVotes(votes))
console.log(organizeVotes(votes, answer))