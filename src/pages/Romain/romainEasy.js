import "./romainEasy.css";
import { useContext, useEffect, useState } from "react";
import SingleCard from "../../components/SingleCard/singleCard";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";

const cardImages = [
  // { "src": "/img/RomainChauve.png", matched: false },
  { src: "/img/IMG_4786.jpg", matched: false },
  { src: "/img/IMG_4787.jpg", matched: false },
  { src: "/img/IMG_4788.jpg", matched: false },
  { src: "/img/IMG_4789.jpg", matched: false },
  // { "src": "/img/RomainBourré.png", matched: false },
  // { "src": "/img/RabbiRomain.png", matched: false },
  // { "src": "/img/RomainRonpich.png", matched: false }
];

export function RomainEasy() {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  console.log(userId);
  const jeux = "romain";
  console.log(jeux);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const resultat = { userId, turns, jeux };

  // Mélanger les cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // gérer les choix

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };

  // comparer les deux cards selectionnées
  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);

      if (choiseOne.src === choiseTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  // console.log(cards);

  // reset les choix et augmenter de +1 à chaque tours
  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // reset les cartes quand elles sont retournées une par une

  const resetCard = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
  };

  // commencer une nouvelle partie
  useEffect(() => {
    shuffleCards();
  }, []);

  //envoyer le score en bdd
  function score(id, score) {
    setTurns([...score, score, id]);
  }

  const sendScore = async (v) => {
    try {
      console.log(v);
      const response = await fetch(`http://localhost:8000/api/classement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(v),
      });
      if (response.ok) {
        score(v);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function sendScore1() {
    sendScore(resultat);
  }

  // compteur de cartes retournées
  let matchedCount = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].matched === true) {
      matchedCount++;
    }
  }
  console.log(`Nombre de cartes retournées : ${matchedCount}`);

  return (
    <div className="Romain">
      <div className="romainContainer">
        {/* <h1>Mode Facile</h1> */}
        <button onClick={shuffleCards}>Rejouer</button>
        <NavLink to="/Classement">
          {matchedCount === 8 && (
            <button onClick={sendScore1}>Sauvegarder</button>
          )}
        </NavLink>

        {/* grid */}

        {matchedCount !== 8 ? (
          <div className="card-grid-romain">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoise={handleChoise}
                flipped={
                  card === choiseOne || card === choiseTwo || card.matched
                }
                disabled={disabled}
                onClick={resetCard}
              />
            ))}
          </div>
        ) : (
          <>
            <p className="victoire">Victoire !</p>
          </>
        )}

        <h3 className="turns">Tours: {turns}</h3>
      </div>
    </div>
  );
}

export default RomainEasy;
