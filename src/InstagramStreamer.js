import React, { useState, useEffect } from "react";
import { string, number } from "prop-types";
import Gallery from "react-photo-gallery";
import _ from "lodash";
import './index.css';

const InstagramStreamer = (props) => {
  const { accessToken = "", nos } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  const randomize = () => setItems(_.shuffle(items));

  useEffect(() => {
    if (accessToken !== "") {
      fetch(
        "https://graph.instagram.com/me/media?fields=id,media_url&access_token="
          + accessToken
      )
        .then((res) => res.json())
        .then(
          (result) => {
            const image_urls = result.data.map((i) => {
              return {
                id: i.id,
                src: i.media_url,
                width: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
                height: Math.floor(Math.random() * (4 - 3 + 1)) + 3
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
    const BasicRows = () => <Gallery photos={items.slice(0, nos)} />;
    return (
      <div className="photo-container">
        <div className="gallery">
          <BasicRows />
        </div>
      </div>
    );
  }
};

InstagramStreamer.propTypes = {
  accessToken: string.isRequired,
  nos: number,
};

InstagramStreamer.defaultProps = {
  nos: 9,
};

export default InstagramStreamer;
