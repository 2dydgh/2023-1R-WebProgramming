import { useEffect, useState } from "react";
import "./Worldcup.css";

import p01 from "./assets/웨인루니.jpg";
import p02 from "./assets/박주영.jpg";
import p03 from "./assets/벤제마.jpg";
import p04 from "./assets/래쉬포드.jpg";
import p05 from "./assets/델 피에로.jpg";
import p06 from "./assets/살라.jpg";
import p07 from "./assets/수아레즈.jpg";
import p08 from "./assets/오베르마스.jpg";
import p09 from "./assets/올리비에 지루.jpg";
import p10 from "./assets/지안프랑코 졸라.jpg";
import p11 from "./assets/해리 케인.jpg";
import p12 from "./assets/음바페.jpg";
import p13 from "./assets/티에리 앙리.jpg";
import p14 from "./assets/펠레.jpg";
import p15 from "./assets/셰브첸코.jpg";
import p16 from "./assets/클로제.jpg";

function Worldcup() {
  const candidate = [
    { name: "웨인루니", src: p01 },
    { name: "박주영", src: p02 },
    { name: "벤제마", src: p03 },
    { name: "래쉬포드", src: p04 },
    { name: "델 피에로", src: p05 },
    { name: "살라", src: p06 },
    { name: "수아레즈", src: p07 },
    { name: "오베르마스", src: p08 },
    { name: "올리비에 지루", src: p09 },
    { name: "지안프랑코 졸라", src: p10 },
    { name: "해리 케인", src: p11 },
    { name: "음바페", src: p12 },
    { name: "티에리 앙리", src: p13 },
    { name: "펠레", src: p14 },
    { name: "셰브첸코", src: p15 },
    { name: "클로제", src: p16 },
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
  const [showEnlarged, setShowEnlarged] = useState(false); // 확대된 이미지를 보여줄 상태 추가

  useEffect(() => {
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setShowEnlarged(true); // 확대된 이미지를 보여주기 위해 상태를 업데이트합니다.
      const timeoutId = setTimeout(() => {
        setShowEnlarged(false); // 일정 시간 후에 확대된 이미지를 숨깁니다.
      }, 3000); // 3초 동안 확대된 상태 유지 후 숨김

      return () => clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 clearTimeout을 호출하여 타이머를 정리합니다.
    }
  }, [selectedImage]); 

  useEffect(() => {
    if (selectedImage) {
      setGame((prev) => {
        const index = prev.findIndex((c) => c.src === selectedImage.src);
        const newGame = prev.filter((c, i) => i !== index);
        newGame.unshift(selectedImage);
        return newGame;
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  if (game.length === 1) {
    return (
      <div class = "winner">
        <p class="title">역대 축구선수 공격수(포워드) 선정!</p>
        <div className="image-container">
        <img src={game[0].src} /> <p className="image-title">{game[0].name}</p>
        </div>
      </div>
    );
  }
  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다</p>;
  // 게임 진행 중
  return (
    <div class="main">
      <p
        class="title"
        style={{ visibility: showEnlarged ? "hidden" : "visible" }} // 확대된 상태일 때는 숨김
      >
        역대 축구선수 공격수(포워드) 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </p>
      <div class="pic">
        {game[round * 2] && (
          <div className="image-container">
            <img
              src={game[round * 2].src}
              onClick={() => {
                setSelectedImage(game[round * 2]);
                setNextGame((prev) => prev.concat(game[round * 2]));
                setRound((round) => round + 1);
              }}
              className={selectedImage === game[round * 2] ? "selected" : ""}
              style={{ visibility: showEnlarged ? "hidden" : "visible" }} // 확대된 상태일 때는 숨김
            />
            <div
              className="image-title"
              style={{ visibility: showEnlarged ? "hidden" : "visible" }}
            >
              {game[round * 2].name}
            </div>
          </div>
        )}
        <div
          class="versus"
          style={{ visibility: showEnlarged ? "hidden" : "visible" }} // 확대된 상태일 때는 숨김
        >
          VS
        </div>

        {game[round * 2 + 1] && (
          <div className="image-container">
            <img
              src={game[round * 2 + 1].src}
              onClick={() => {
                setSelectedImage(game[round * 2 + 1]);
                setNextGame((prev) => prev.concat(game[round * 2 + 1]));
                setRound((round) => round + 1);
              }}
              className={
                selectedImage === game[round * 2 + 1] ? "selected" : ""
              }
              style={{ visibility: showEnlarged ? "hidden" : "visible" }} // 확대된 상태일 때는 숨김
            />
            <div
              className="image-title"
              style={{ visibility: showEnlarged ? "hidden" : "visible" }}
            >
              {game[round * 2 + 1].name}
            </div>
          </div>
        )}
      </div>
      {selectedImage && showEnlarged && (
        <div className="enlarged-image">
          <p className="comment">축잘알 인정!</p>
          <img src={selectedImage.src} />
        </div>
      )}
    </div>
  );
}

export default Worldcup;
