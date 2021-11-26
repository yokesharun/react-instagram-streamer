import React, { useState, useEffect } from "react";
import { string, number, bool } from "prop-types";
import _ from "lodash";
import info from "./img/info.png";
import "./index.css";

const InstagramStreamer = (props) => {
  const { accessToken = "", nos = 12, showOptions = false } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  const randomize = () => setItems(_.shuffle(items));

  useEffect(() => {
    if (accessToken !== "") {
      fetch(
        "https://graph.instagram.com/me/media?fields=media_url&access_token=" +
          accessToken
      )
        .then((res) => res.json())
        .then(
          (result) => {
            const image_urls = result.data.map((i) => {
              return {
                id: i.id,
                media_url: i.media_url,
              };
            });
            setItems(image_urls);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoaded && !error) {
        randomize();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isLoaded, error, randomize]);

  if (accessToken === "") {
    return <div>Error: Invalid access_token</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="photo-container">
        {showOptions && (
          <>
            <a
              href="https://github.com/yokesharun/react-instagram-streamer"
              className="float-info"
              target="_blank"
            >
              <img src={info} alt="info" />
            </a>
          </>
        )}
        <div className="gallery">
          {items.slice(0, nos).map((item) => (
            <img src={item.media_url} alt="" />
          ))}
        </div>
      </div>
    );
  }
};

InstagramStreamer.propTypes = {
  accessToken: string,
  nos: number,
  showOptions: bool,
};

export default InstagramStreamer;
