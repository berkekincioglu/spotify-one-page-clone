import './card.css';
import cardImg from '../../assets/images/card-image.svg';
import card2Img from '../../assets/images/picture-1.svg';
import card3Img from '../../assets/images/picture-2.svg';
import card4Img from '../../assets/images/picture-3.svg';
import card5Img from '../../assets/images/picture-4.svg';
import card6Img from '../../assets/images/picture-5.svg';

const Card = ({ data }) => {
  const images = [cardImg, card2Img, card3Img, card4Img, card5Img, card6Img];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  // api daki imagelar yoktu onun yerine random image atadim
  return (
    <div className='card'>
      <div className='card_wrapper'>
        <img src={randomImage} alt='' />
        <div className='card_texts'>
          <h5>{data?.name ? data.name : 'Test'}</h5>
          <h6>
            {data?.description.length > 30
              ? data?.description.slice(0, 30) + '...'
              : data?.description}
            {!data && 'Test'}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
