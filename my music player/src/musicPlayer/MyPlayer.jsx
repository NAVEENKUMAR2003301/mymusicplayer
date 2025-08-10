import React, { useState, useRef } from "react";

const MyPlayer = () => {
  
  const [img, setImg] = useState("");
  const [mp, setMp] = useState("");
  const [query, setQuery] = useState("");
  const audioRef = useRef(null);
  const[count,setCount]=useState(0)
  const [searched, setSearched] = useState(false);
  let [calc,setCalc]=useState(0)
  let song = []
  function search() {
    if (!query.trim()) return;
    setSearched(true);

    fetch(
      `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
    )
      .then((res) => res.json())
      .then((musicData) => {
        let songData = musicData.data.results[0];
        let song = songData.downloadUrl[3].url;
        let image = songData.image[2].url;
        setImg(image);
        setMp(song);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
          }
        }, 0);
      });
      setCount((count)=>count+1)
    }


  return (
    <div className="container">
      <p>search song - {count}</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search song..."
      />
      <button onClick={search}>Search</button>
      <img src={img} alt="cover" className={searched ? "imge" : "close"} />
      {mp && (
        <audio ref={audioRef} autoPlay controls>
          <source src={mp} type="audio/mpeg" />
        </audio>
      )}
      <br />
     
    </div>
 
  );
};

export default MyPlayer;
