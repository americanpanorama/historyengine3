import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
// import Async from "react-async";
// import { Link, useParams } from "react-router-dom";
// import { Map, TileLayer, CircleMarker } from 'react-leaflet';
// import EpisodeSnippet from './EpisodeSnippet.jsx';
import './Homepage.css';


const Homepage = (props) => {
  // to do set as random #
  const [slideIdx, setSlideIdx] = useState(0);
  const currentSlide = useRef();
  const nextSlide = useRef();

  React.useEffect(() => {
    const id = setTimeout(() => {
      select(nextSlide.current)
        .transition()
        .duration(750)
        .style('opacity', 1)
        .on('end', () => {
          setSlideIdx((slideIdx + 1) % slides.length);
          select(nextSlide.current)
           .style('opacity', 0);
        });
    }, 7500);
    return () => clearTimeout(id);
  }, [slideIdx]);

  // React.useEffect(() => {
  //   select(nextSlide.current)
  //     .style('opacity', 0);
  // }, [slideIdx]);

  const slides = [
    {
      img: 'sample_episodes/he-tyler.jpg',
      alt: 'John Tyler',
      title: 'The Outcast of Virginia',
      body: '&ldquo;A Voice from Louisa&rdquo; wrote to the Richmond Enquirer in December 1832 with the hope that a man like John Tyler would not be elected as a United States Senator once again. Instead, the writer expressed the importance of knowing the &ldquo;political creed&rdquo; of the candidates&hellip;',
      id: 3915,
      img_source: 'Wikimedia Commons / Library of Congress',
      img_link: 'https://commons.wikimedia.org/wiki/John_Tyler#/media/File:John_Tyler_(LoC_scan).jpg',
      school: 'University of Virginia',
      school_id: 1,
    },
    {
      img: 'sample_episodes/he-chesapeake.jpg',
      alt: 'A Massachusetts Federalist Opposes Declaration of War',
      title: 'A Massachusetts Federalist Opposes Declaration of War',
      body: 'On Thursday June 18, 1812 the members of the House of Representatives were in session when word came that the Senate had passed a bill, “An act declaring war between Great Britain and her dependencies and the United States and their territories.”',
      id: 6210,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/USS_Chesapeake_(1799)#/media/File:John_Christian_Schetky,_H.M.S._Shannon_Leading_Her_Prize_the_American_Frigate_Chesapeake_into_Halifax_Harbour_(c._1830).jpg',
      school: 'Wheaton College',
      school_id: 2,
    },
    {
      img: 'sample_episodes/he-whales.jpg',
      alt: 'Whaling',
      title: 'Essex: Starvation and Survival',
      body: 'As the sun sank toward the horizon, the empty, blue enormity of the Pacific washed over three small whale boats. The Essex had sailed from Nantucket a year ago, scouring two oceans for the whale oil that drove the island’s economy.',
      id: 5008,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/File:The_marine_mammals_of_the_north-western_coast_of_North_America_(Plate_VIII)_(7732776424).jpg',
      school: 'Furman University',
      school_id: 4,
    },
    {
      img: 'sample_episodes/he-kingsley-etching.jpg',
      alt: 'Kingsley Plantation',
      title: 'Anna Madgigine Jai Kingsley: A Free Woman',
      body: 'Unrestrained Florida landscapes surround the large, white plantation home on Fort George Island, now called “The Princess House.” Echoes of past voices in celebration, in labour, and in daily life resound through the hollow rooms, the large covered porch, and the plantation grounds.',
      id: 4840,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/File:Kingsley_Plantation_etching_1878.jpg',
      school: 'Rollins College',
      school_id: 5,
    },
    {
      img: 'sample_episodes/he-battlefield.jpg',
      alt: 'Aftermatch at Gettysburg',
      title: '&ldquo;The Slow Dead March of Camp-Disease&rdquo;: Death in the American Civil War',
      body: 'Charles Furman had known Fannie Garden for only 13 days before he asked her to marry him. In all, they spent less than a month together before the Confederate government ordered him northward to fight the &ldquo;soulless soldiers&rdquo; of the &ldquo;despised Yankee Nation.&rdquo;',
      id: 5443,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/Category:Bodies_of_dead_soldiers#/media/File:Battle_of_Gettysburg.jpg',
      school: 'Furman University',
      school_id: 4,
    },
    {
      img: 'sample_episodes/he-tobacco.jpg',
      alt: 'Tobacco',
      title: 'The Tobacco Trade in Virginia',
      body: 'As an appointed Commission Merchant of Virginia, William Brown was responsible for reporting on many markets. However, in 1850&rsquo;s Virginia, there was really only one market that was truly booming, and that was tobacco.',
      id: 2610,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/File:The_agricultural_experiment_stations_in_the_United_States_(1900)_(14779920404).jpg',
      school: 'University of Virginia',
      school_id: 1,
    },
    {
      img: 'sample_episodes/he-corset.png',
      alt: 'Woman in Corset',
      title: 'The Double Hip &ldquo;Ironsides&rdquo; Corset shapes American Women',
      body: 'Victorian women liked their corsets tight. If a person looked up and down any busy street in the late nineteenth century, they saw townswomen that struck dramatic silhouettes. The corset, a tight fitting, boned garment, restricted movement and reshaped the natural position of organs inside a woman&rsquo;s body.',
      id: 4636,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/Category:Black_and_white_photographs_of_women_in_corset#/media/File:1898Das_Album6.png',
      school: 'University of Alabama at Birmingham',
      school_id: 1,
    },
    {
      img: 'sample_episodes/he-lincoln.png',
      alt: 'Lincoln\'s Assassination',
      title: 'The Graphic Scene after President Abraham Lincoln was Shot',
      body: 'Charles Furman had known Fannie Garden for only 13 days before he asked her to marry him. In all, they spent less than a month together before the Confederate government ordered him northward to fight the &ldquo;soulless soldiers&rdquo; of the &ldquo;despised Yankee Nation.&rdquo;',
      id: 5628,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/File:Lincoln_assassination_slide_c1900.png',
      school: 'Juniata College',
      school_id: 3,
    },
    {
      img: 'sample_episodes/he-poe.jpg',
      alt: 'A Descent into the Maelstrom',
      title: 'Poe&rsquo;s &ldquo;Sepulchre by the Sea&rdquo;: Love and Death in Victorian America',
      body: 'Edgar Allan Poe spent his final months in poverty, tormented by grief, drowning his depression in alcohol and poetry. In May 1849, in his small New York cottage, he wrote what was to be his last completed poem, &ldquo;Annabel Lee,&rdquo; in which he returned to the themes that had haunted him for much of his life.',
      id: 5446,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/Edgar_Allan_Poe#/media/File:Maelstrom-Clarke.jpg',
      school: 'Furman University',
      school_id: 4,
    },
    {
      img: 'sample_episodes/he-queue.jpg',
      alt: 'Chinese Meal by Lai Afong, c1880',
      title: 'Local Chinese React to Imperial Decree',
      body: 'When Americans think of Chinatown, they rarely associate it with New Orleans, but at the turn of the twentieth century, New Orleans was the only southern city with a population of Chinese immigrants significant enough to constitute a Chinatown.',
      id: 4438,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/File:Chinese_Meal_by_Lai_Afong,_c1880.JPG',
      school: 'Furman University',
      school_id: 4,
    },
    {
      img: 'sample_episodes/he-davis.jpg',
      alt: 'Jefferson Davis',
      title: 'Jefferson Davis Responds to the Gibson County Massacre',
      body: 'On September 2, 1874 former President of the Confederacy, Jefferson Davis, delivered a speech in Memphis, Tennessee denouncing a massacre of sixteen black men a week prior in Trenton, TN.',
      id: 5611,
      img_source: 'Wikimedia Commons',
      img_link: 'https://commons.wikimedia.org/wiki/File:Chinese_Meal_by_Lai_Afong,_c1880.JPG',
      school: 'Juniata College',
      school_id: 3,
    }
  ];

  return (
    <div id='homepage'>
      <div
        id='selectedEpisodes'
      >
        <div 
          style={{
            backgroundImage: `url("img/${slides[slideIdx].img}")`
          }}
          className='selectedEpisode current'
          ref={currentSlide}
        >
          <div className="text-inset">
            <h3>
              <Link to={`/episodes/view/${slides[slideIdx].id}`}>
                {slides[slideIdx].title}
              </Link>
            </h3>
            <p>
              {slides[slideIdx].body}
            </p>
            <div className="img-source">
              Episode:
              <Link to={`/schools/view/${slides[slideIdx].school_id}`}>
                {slides[slideIdx].school}
              </Link>
              &#8226;
              Image:
              <a
                href={slides[slideIdx].img_link}
                target='_blank'
              >
                {slides[slideIdx].img_source}
              </a>
            </div>
          </div>
        </div>
        <div 
          style={{
            backgroundImage: `url("img/${slides[(slideIdx + 1) % slides.length].img}")`,
          }}
          className='selectedEpisode next'
          ref={nextSlide}
        >
          <div className="text-inset">
            <h3>
              <Link to={`/episodes/view/${slides[(slideIdx + 1) % slides.length].id}`}>
                {slides[(slideIdx + 1) % slides.length].title}
              </Link>
            </h3>
            <p>
              {slides[(slideIdx + 1) % slides.length].body}
            </p>
            <div className="img-source">
              Episode:
              <Link to={`/schools/view/${slides[(slideIdx + 1) % slides.length].school_id}`}>
                {slides[(slideIdx + 1) % slides.length].school}
              </Link>
              &#8226;
              Image:
              <a
                href={slides[(slideIdx + 1) % slides.length].img_link}
                target='_blank'
              >
                {slides[(slideIdx + 1) % slides.length].img_source}
              </a>
            </div>
          </div>
        </div>
      </div>
      <h2>What is the History Engine?</h2>
      <p>The History Engine is a collection of thousands of historical “episodes” that paints a wide-ranging portrait of the past that is freely available to scholars, teachers, and the general public. Students from a variety of college and universities write these episodes. Creating an episode for the History Engine gives them the opportunity to learn history by doing the work—researching, writing, and publishing—of a historian.</p>
    </div>
  );
};

export default Homepage;
