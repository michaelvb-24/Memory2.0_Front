import "./flo.css";
import { useContext, useEffect, useState } from "react";
import SingleCard from "../../components/SingleCardFlo/singleCardFlo";
import { AuthContext } from "../../context";
import Header from "../../components/Header/Header";
import { NavLink } from "react-router-dom";

const cardImages = [
  { src: "/img/asDeCoeur.png", matched: false },
  { src: "/img/asDePique.png", matched: false },
  { src: "/img/deuxDePique.png", matched: false },
  { src: "/img/huitDeTrefle.png", matched: false },
  { src: "/img/sixDePique.png", matched: false },
  { src: "/img/troisDeCoeur.png", matched: false },
  { src: "/img/troisDePique.png", matched: false },
  { src: "/img/valetDePique.png", matched: false },
];

export function Flo() {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  console.log(userId);
  const jeux = "flo";
  console.log(jeux);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const resultat = { userId, turns, jeux };

  function score(id, score) {
    setTurns([...score, score, id]);
  }

  //envoyer le score en bdd
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

  //retourner les cartes à partir de 1.5 secondes

  useEffect(() => {
    let timeoutId = null;

    if (choiseOne) {
      timeoutId = setTimeout(() => {
        setChoiseOne(null);
        resetTurn((prevTurns) => prevTurns + 1);
      }, 2300);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [choiseOne]);

  // comparer les deux cards selectionnées
  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);

      if (choiseOne.src === choiseTwo.src) {
        setCards((cardImages) => {
          return cardImages.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        console.log(cards);
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

  // commencer une nouvelle partie
  useEffect(() => {
    shuffleCards();
  }, []);

  function sendScore1() {
    sendScore(resultat);
  }

  // Méthode pour vérifier si toutes les cartes sont retournées
  // matched count

  let matchedCount = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].matched === true) {
      matchedCount++;
    }
  }

  console.log(`Nombre de carte matchées : ${matchedCount}`);

  return (
    <div className="Flo">
      <div className="floContainer">
        {/* <h1>Mode difficile</h1> */}
        <button onClick={shuffleCards}>Rejouer</button>
        <NavLink to="/Classement">
          {matchedCount === 16 && (
            <button onClick={sendScore1}>Sauvegarder</button>
          )}
        </NavLink>

        {/* grid */}
        {matchedCount !== 16 ? (
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoise={handleChoise}
                flipped={
                  card === choiseOne || card === choiseTwo || card.matched
                }
                disabled={disabled}
                choiseOne={choiseOne}
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

export default Flo;
