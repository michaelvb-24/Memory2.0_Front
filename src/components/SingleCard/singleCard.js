import "./singleCard.css";

export default function SingleCard({ card, handleChoise, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoise(card);
    }
  };

  return (
    <div className="cardRomain">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/dosCarteAJouer.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
