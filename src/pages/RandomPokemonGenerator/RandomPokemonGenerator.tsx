import React, { useState, useEffect } from 'react';
// import RandomPokemon from '../../hooks/RandomPokemon';

import logoPokemon from '../../assets/logoPokemon.png'
import pokeballAnimation from '../../assets/pokeballAnimation.gif'
import pokeballGif from '../../assets/pokeballGif.gif'

import './style.scss'
import api from '../../services/api';

interface iPokemon {
    id: number
    name: string
    abilities: Array<string>
    height: number
    weight: number
    types: Array<iPokeType>
    image: string
}

interface iPokeType {
    name: string;
    hexColor: string
}

export default function RandomPokemonGenerator() {

    const [pokeId, setPokeId] = useState<number>(0);
    const [dataPokemon, setTestPoke] = useState<iPokemon>();

    useEffect(() => {
        api.get(`/pokemon/${pokeId}`)
            .then((response: any) => {
                const poke = {
                    id: pokeId,
                    name: response.data.name,
                    abilities: getAbilities(response.data.abilities),
                    height: response.data.height,
                    weight: response.data.weight,
                    types: getType(response.data.types),
                    image: response.data.sprites.front_default,
                }
                setTestPoke(poke)
            })
    }, [pokeId])

    async function getPokeId() {
        const pokemonIndex = 1118
        const randomId = Math.floor((Math.random() * pokemonIndex) + 1)
        if (randomId <= 898 || randomId >= 10001) {
            setPokeId(randomId)
        } else {
            getPokeId()
        }
    }

    function getAbilities(abilities: Array<any>): Array<string> {
        let renderedAbilities: Array<string> = []
        abilities.forEach(ability => {
            renderedAbilities.push(ability.ability.name);
        })
        return renderedAbilities;
    }

    const pokeType = [
        {
            name: "Bug",
            hexColor: "94BC4A"
        }, {
            name: "Dark",
            hexColor: "736C75"
        }, {
            name: "Dragon",
            hexColor: "6A7BAF"
        }, {
            name: "Electric",
            hexColor: "E5C531"
        }, {
            name: "Fairy",
            hexColor: "E397D1"
        }, {
            name: "Fighting",
            hexColor: "CB5F48"
        }, {
            name: "Fire",
            hexColor: "EA7A3C"
        }, {
            name: "Flying",
            hexColor: "7DA6DE"
        }, {
            name: "Ghost",
            hexColor: "846AB6"
        }, {
            name: "Grass",
            hexColor: "71C558"
        }, {
            name: "Ground",
            hexColor: "CC9F4F"
        }, {
            name: "Ice",
            hexColor: "70CBD4"
        }, {
            name: "Normal",
            hexColor: "AAB09F"
        }, {
            name: "Poison",
            hexColor: "B468B7"
        }, {
            name: "Psychic",
            hexColor: "E5709B"
        }, {
            name: "Rock",
            hexColor: "B2A061"
        }, {
            name: "Steel",
            hexColor: "89A1B0"
        }, {
            name: "Water",
            hexColor: "539AE2"
        },
    ]

    function getType(types: Array<any>): Array<iPokeType> {
        let renderedType: Array<iPokeType> = []

        types.forEach(type => {
            pokeType.map(poke => {
                if (type.type.name === poke.name.toLowerCase()) {
                    renderedType.push(poke)
                }
            })
        })
        return renderedType;
    }

    document.body.style.backgroundColor = `#${dataPokemon?.types[0].hexColor}`

    const firstTypeColor: React.CSSProperties = {
        backgroundColor: `#${dataPokemon?.types[0].hexColor}`,
        color: '#fff',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
    }
    const secondTypeColor: React.CSSProperties = {
        backgroundColor: `#${dataPokemon?.types[1]?.hexColor}`,
        color: '#fff',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
    }

    return (
        <>
            <header>
                <img src={logoPokemon} alt="Logo Pokémon" />
                <img src={pokeballAnimation} alt="Gif Poké ball" />
            </header>
            <main>
                <div className="pokemon">
                    {pokeId === 0 ? (
                        <>
                            <p>
                                Click no botão a baixo para gerar um pokémon aleatório
                            </p>
                            <img src={pokeballGif} alt="Gif Poké ball" />
                        </>

                    ) : pokeId !== 0 && (
                        <img src={dataPokemon?.image ? dataPokemon.image : pokeballGif} alt={dataPokemon?.name} width="150" height="150"/>
                    )}
                </div>
                <section>
                    {pokeId !== 0 && (
                        <>
                            <p>{dataPokemon?.name}</p>
                            <div className="pokeInformation">
                                <div className="info">
                                    <h3>Habilidade(s)</h3>
                                    <span>{`${dataPokemon?.abilities.join(' ')}`}</span>
                                </div>
                                <div className="info">
                                    <h3>Tipo(s)</h3>
                                    <span style={firstTypeColor}>{dataPokemon?.types[0].name}</span>
                                    <span style={dataPokemon?.types[1]?.name ? secondTypeColor : undefined}>{dataPokemon?.types[1]?.name}</span>
                                </div>
                                <div className="info">
                                    <span>
                                        {`Peso: ${dataPokemon?.weight}`}
                                    </span>
                                    <span>
                                        {`Altura: ${dataPokemon?.height} m`}
                                    </span>
                                </div>

                            </div>
                        </>
                    )}
                    <button
                        style={dataPokemon?.types[1]?.name ? secondTypeColor : undefined}
                        onClick={() => getPokeId()}
                    >
                        Gerar um pokémon aleatório
                    </button>
                </section>
            </main>
        </>
    );
}