import React from 'react';
import {nanoid} from 'nanoid';

import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import ArtCarouselButton from '../../components/atoms/ArtCarouselButton';
import ArtCarouselResetter from '../../components/atoms/ArtCarouselResetter';
import ArtCarouselDots from '../../components/atoms/ArtCarouselDots';

const useStyles = makeStyles((theme) => ({
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselNavigation: {
    minHeight: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    flex: '1 1 0',
    '& .carousel__slider-tray-wrapper': {
      height: '100%',
    },
    '& .carousel__slider-tray-wrapper .carousel__slider-tray': {
      height: '100%',
    },
    '& .carousel__slider-tray-wrapper .carousel__slider-tray .carousel__inner-slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  button: {
    flex: '1 0 auto',
    alignSelf: 'center',
  },
  image: {
    objectFit: 'contain',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),

    },
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
  },
}));

export default function ArtCarousel(props) {
  const classes = useStyles();
  if(!props.artObject) return null;

  return(
    <CarouselProvider
      totalSlides={props.artObject.additionalImages.length + 1}
      className={classes.carousel}
      isIntrinsicHeight
      hasMasterSpinner
    >
      <ArtCarouselResetter artObject={props.artObject} />
      <div className={classes.carouselNavigation}>
        <Hidden smDown>
          <ArtCarouselButton type='back' className={classes.button} />
        </Hidden>
        <Slider className={classes.slider}>
          <Slide index={0}>
            <Image
              className={classes.image} 
              src={props.artObject.primaryImage}
              alt="Guess the object" 
              hasMasterSpinner
            />
          </Slide>
          {props.artObject.additionalImages.map((additionalImageURL, additionalImageIndex) => 
            <Slide key={nanoid()} index={additionalImageIndex+1}>
              <Image
                key={nanoid()} 
                className={classes.image} 
                src={additionalImageURL} 
                alt="Guess the object" 
                hasMasterSpinner
              />
            </Slide>          
          )}
        </Slider>
        <Hidden smDown>
          <ArtCarouselButton type='next' className={classes.button} />   
        </Hidden>     
      </div>
      <ArtCarouselDots />
    </CarouselProvider>
  );
}