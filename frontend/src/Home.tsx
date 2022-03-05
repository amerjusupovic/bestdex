import { useEffect, useState } from 'react';
import './App.scss';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

function Home(props: any) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([] as any);
  const [searchQuery, setSearchQuery] = useState("");
  const [params, setParams] = useState({ q: "" })
  const [cardId, setCardId] = useState("");
  // const ref = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  useEffect(() => {
    async function getData() {
      // const data = await findCardsByQuery("name", "Charizard");
      var data = require('./charizards.json');
      data.sort(() => (Math.random() > .5) ? 1 : -1)
      setCards(data);
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        if (params.q) {
          navigate("/search?q=" + params.q)
        }
			} catch (err) {
				console.error(err);
			}
    }
    setImagesLoaded(0);
    getData();
  }, [params, navigate]);

  useEffect(() => {
    const setCurrentCard = async () => {
      try {
        if (cardId) {
          props.setSelectedCard(cards.find((val: any) => cardId === val.id))
          navigate("/card?id=" + cardId)
        }
      } catch (err) {
        console.error(err);
      }
    }
    setCurrentCard();
  }, [cardId, navigate, props, cards])

  function handleSearch(e: any) {
    if (!e.key || e.key === "Enter") {
      setParams({...params, q: searchQuery});
    }
  }

  function handleSearchInput(e: any) {
    setSearchQuery(e.target.value)
  }

  // const setRef = useCallback((node) => {
  //   if (node && cards) {
  //     node.scrollLeft = 20900;  // 700 ~= 1 card
  //   }
  //   ref.current = node;            
  // },[cards])

  function handleCardClick(e: any) {
    setCardId(e.target.id);
  }

  function navigateLogin(e: any) {
    navigate("/login");
  }

  // function scrollToBottom() {
  //   ref.scrollIntoView({ behavior: "smooth" });
  // }

  return (
    <div className="main">
      <div className="home-mouseover-scroll-div left-scroll" id="left-scroll"/>
      <div className="home-mouseover-scroll-div right-scroll" id="right-scroll"/>
      <div className="home-scroll-left-div">
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="home-scroll-right-div">
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="sliding-div">
        {cards.map((card: PokemonTCG.Card) => <img className="card-image" src = {card.images.large} alt="card" key={card.id}
        onClick={handleCardClick} id={card.id} style={imagesLoaded >= cards.length - 1 ? {} : {display: 'none' }}
        onLoad={() => setImagesLoaded(imagesLoaded + 1)}/>)}
      </div>
      <div className= "title">Welcome to Bestdex</div>
      <div className="search-bar"><Input.Search className="search-input" placeholder="SEARCH FOR A CARD" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/></div>
      <PersonIcon className="login-icon icon-home" onClick={navigateLogin}/>
    </div>
  );
}

export default Home;