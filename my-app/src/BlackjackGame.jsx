import React, { useState, useEffect } from "react";
import axios from "axios";
import './BlackjackGame.css';

// Función para generar el código de descuento aleatorio
const generateDiscountCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    let code = '';

    // Generamos 8 caracteres alfanuméricos aleatorios
    for (let i = 0; i < 8; i++) {
        const isLetter = Math.random() > 0.5;
        if (isLetter) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        } else {
            code += digits.charAt(Math.floor(Math.random() * digits.length));
        }
    }

    // Generamos 3 números aleatorios adicionales
    code += '-';
    for (let i = 0; i < 3; i++) {
        code += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return code;
};

function BlackjackGame() {
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [gameStatus, setGameStatus] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [dealerHiddenCard, setDealerHiddenCard] = useState(null);
    const [dealerRevealed, setDealerRevealed] = useState(false);
    const [discountCode, setDiscountCode] = useState(""); // Código de descuento
    const [showModal, setShowModal] = useState(false); // Estado del modal

    // Inicializa el mazo
    useEffect(() => {
        axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/")
            .then(response => {
                setDeckId(response.data.deck_id);
            });
    }, []);

    // Calcula el puntaje de las cartas
    const calculateScore = (cards) => {
        let score = 0;
        let aceCount = 0;

        cards.forEach((card) => {
            if (["KING", "QUEEN", "JACK"].includes(card.value)) {
                score += 10;
            } else if (card.value === "ACE") {
                aceCount += 1;
                score += 11;
            } else {
                score += parseInt(card.value);
            }
        });

        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount -= 1;
        }

        return score;
    };

    // Dibuja cartas de la API
    const drawCards = (count) => {
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
            .then(response => response.data.cards);
    };

    // Inicia el juego
    const startGame = () => {
        setGameStarted(true);
        setGameStatus("");
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerScore(0);
        setDealerScore(0);
        setDealerHiddenCard(null);
        setDealerRevealed(false);
        setDiscountCode(""); // Resetear el código de descuento

        // Reparte las cartas iniciales para jugador y crupier
        drawCards(2).then((initialPlayerCards) => {
            setPlayerCards(initialPlayerCards);
            setPlayerScore(calculateScore(initialPlayerCards));

            drawCards(2).then((initialDealerCards) => {
                setDealerCards([initialDealerCards[0]]);
                setDealerHiddenCard(initialDealerCards[1]);
                setDealerScore(calculateScore([initialDealerCards[0]]));
            });
        });
    };

    // Pedir carta al jugador
    const handleHit = () => {
        drawCards(1).then((newPlayerCard) => {
            const updatedPlayerCards = [...playerCards];
            updatedPlayerCards.push(newPlayerCard[0]);
            setPlayerCards(updatedPlayerCards);
            const newPlayerScore = calculateScore(updatedPlayerCards);
            setPlayerScore(newPlayerScore);

            if (newPlayerScore > 21) {
                setGameStatus("Perdiste");
            }
        });
    };

    // Plantarse
    const handleStand = () => {
        setDealerRevealed(true);

        let newDealerCards = [...dealerCards];
        newDealerCards.push(dealerHiddenCard);
        let newDealerScore = calculateScore(newDealerCards);

        // El crupier sigue sacando cartas hasta que su puntaje sea 17 o más
        const drawDealerCards = () => {
            if (newDealerScore < 17) {
                drawCards(1).then((newCard) => {
                    newDealerCards.push(newCard[0]);
                    newDealerScore = calculateScore(newDealerCards);
                    setDealerCards(newDealerCards);
                    setDealerScore(newDealerScore);
                    drawDealerCards();
                });
            } else {
                // Evaluar el resultado del juego
                if (newDealerScore > 21 || playerScore > newDealerScore) {
                    setGameStatus("Ganaste");
                    const code = generateDiscountCode(); // Generar el código de descuento
                    setDiscountCode(code); // Mostrar el código en el modal
                    setShowModal(true); // Mostrar el modal
                } else if (playerScore < newDealerScore) {
                    setGameStatus("Perdiste");
                } else {
                    setGameStatus("Empate");
                }
            }
        };

        drawDealerCards(); // Llamamos a la función para que el crupier saque cartas
    };

    // Verifica si el jugador tiene Blackjack
    useEffect(() => {
        if (playerScore === 21) {
            setGameStatus("Blackjack! Ganaste");
            const code = generateDiscountCode();
            setDiscountCode(code);
            setShowModal(true); // Mostrar el modal con el código de descuento
        }
    }, [playerScore]);

    // Cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div id="game-container">
            <h1>Blackjack</h1>
            <h2>Estado del juego: {gameStatus}</h2>

            {!gameStarted ? (
                <button className="start-game" onClick={startGame}>Iniciar Juego</button>
            ) : (
                <>
                    <div>
                        <h3>Cartas del jugador ({playerScore})</h3>
                        <div className="card-container">
                            {playerCards.map((card, index) => (
                                <img key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                            ))}
                        </div>
                        <button className="hit" onClick={handleHit} disabled={gameStatus}>Pedir carta</button>
                        <button className="stand" onClick={handleStand} disabled={gameStatus}>Plantarse</button>
                    </div>

                    <div>
                        <h3>Cartas del crupier {dealerRevealed ? `(${dealerScore})` : ""}</h3>
                        <div className="card-container">
                            {dealerCards.map((card, index) => (
                                <img key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                            ))}
                            {!dealerRevealed && (
                                <img
                                    src="https://deckofcardsapi.com/static/img/back.png"
                                    alt="Hidden card"
                                />
                            )}
                            {dealerRevealed && dealerHiddenCard && (
                                <img src={dealerHiddenCard.image} alt="Hidden card revealed" />
                            )}
                        </div>
                    </div>

                    {/* Mostrar solo el resultado final */}
                    {gameStatus && (
                        <div>
                            <h2>Resultado: {gameStatus}</h2>
                        </div>
                    )}
                </>
            )}

            {/* Modal con el código de descuento */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>¡Felicidades! Ganaste</h3>
                        <p>Tu código de descuento es: <strong>{discountCode}</strong></p>
                        <button className="send-btn" onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlackjackGame;
