import React, { useState, useEffect } from 'react';
import { string, number, bool } from 'prop-types';
import { CSSGrid, layout, measureItems, makeResponsive } from 'react-stonecutter';
import _ from "lodash";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import fullscreen from './img/full-screen.png';
import info from './img/info.png';
import './index.css';

const InstagramStreamer = (props) => {
  const {
    accessToken = '',
    imageWidth = 100,
    imageHeight = 100,
    nos = 12,
    showOptions = false,
    columns = 4
  } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  const randomize = () => setItems(_.shuffle(items));
  const handle = useFullScreenHandle();

  useEffect(() => {
    if (accessToken !== '') {
      fetch("https://graph.instagram.com/me/media?fields=media_url&access_token=" + accessToken)
        .then(res => res.json())
        .then(
          (result) => {
            const image_urls = result.data.map((i) => {
              return {
                id: i.id,
                media_url: i.media_url
              }
            });
            setItems(image_urls);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoaded && !error) {
        randomize();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isLoaded, error, randomize])

  if (accessToken === '') {
    return <div>Error: Invalid access_token</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const Grid = makeResponsive(measureItems(CSSGrid), {
      maxWidth: imageWidth*columns
    })

    return (
      <div className="photo-container">
        {showOptions &&
          <>
            <a href="#" className="float-fullscreen" onClick={handle.enter}>
              <img src={fullscreen} alt="fullscreen" />
            </a>
            <a href="#" className="float-info" target="_blank">
              <img src={info} alt="info" />
            </a>
          </>
        }
        <FullScreen handle={handle}>
          <Grid
            component="div"
            columns={columns}
            columnWidth={imageWidth}
            gutterHeight={-50}
            layout={layout.simple}
            duration={1000}
            easing="ease-out"
            
          >
            {items.slice(0, nos).map(item => (
              <div itemHeight={200}>
                <img src={item.media_url} alt="" style={{height: imageHeight+'px', 'max-width': imageWidth + 'px'}}/>
              </div>
            ))}
          </Grid>
        </FullScreen>
      </div>
    );
  }
}

InstagramStreamer.propTypes = {
  accessToken: string,
  nos: number,
  imageHeight: number,
  imageWidth: number,
  showOptions: bool,
  columns: bool
}

export default InstagramStreamer;
