import './singleCardFlo.css'

export default function SingleCardFlo({ card, handleChoise, flipped, disabled, choiseOne, resetCard }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoise(card)
    } 
  }

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          src='/img/dosCarteAJouer.png'
          onClick={handleClick}
          alt='card back' />
      </div>
    </div>
  )
}