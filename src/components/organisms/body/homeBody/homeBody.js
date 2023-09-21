import React from 'react';
import Slider from 'react-slick';
import './homeBody.scss';
import floristryImage1 from '../../../../assets/images/6ee424ad6d2b044b68597e8ca58f2ab6.jpg';
import floristryImage2 from '../../../../assets/images/8365f6d968c5a435c8d2d9603acd7277.jpg';
import floristryImage3 from '../../../../assets/images/a414289c0683bbe67cf2f34e72012fc1.jpg';

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow slick-prev" onClick={onClick} />;
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow slick-next" onClick={onClick} />;
};

const HomeBody = () => {
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="home-body">
            <div className="carousel-container">
                <Slider {...sliderSettings} className="slick-list">
                    <div className="img-container">
                        <img src={floristryImage1} alt="floristry" />
                        <div className="slide-text">
                            <h1>Bienvenue dans l'univers floral de Soleil Vert !</h1>
                            <p className="slide-paragraph">Là où la nature s'exprime avec passion à travers nos créations.</p>
                        </div>
                    </div>
                    <div className="img-container">
                        <img src={floristryImage2} alt="floristry" />
                        <div className="slide-text">
                            <h2>Large Choix Floral :</h2>
                            <p className="slide-paragraph">Explorez notre vaste collection de fleurs, bouquets et arrangements, soigneusement conçus pour chaque occasion, chaque saison et chaque émotion.</p>
                        </div>
                    </div>
                    <div className="img-container">
                        <img src={floristryImage3} alt="floristry" />
                        <div className="slide-text">
                            <h2>Horaires :</h2>
                            <table>
                                <tr>
                                    <td>lundi</td>
                                    <td>08:30–19:00</td>
                                </tr>
                                <tr>
                                    <td>mardi</td>
                                    <td>08:30–19:00</td>
                                </tr>
                                <tr>
                                    <td>mercredi</td>
                                    <td>08:30–19:00</td>
                                </tr>
                                <tr>
                                    <td>jeudi</td>
                                    <td>08:30–19:00</td>
                                </tr>
                                <tr>
                                    <td>vendredi</td>
                                    <td>08:30–19:00</td>
                                </tr>
                                <tr>
                                    <td>samedi</td>
                                    <td>08:30–17:00</td>
                                </tr>
                                <tr>
                                    <td>dimanche</td>
                                    <td>Fermé</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Slider>
            </div>
            <div className="about-us-container">
                <h2 className="about-us-title">Soleil Vert, quésaco ?</h2>
                <p className="about-us-paragraph">Nous sommes une boutique de fleurs et de plantes située dans le centre-ville. Nous offrons une grande variété de produits de qualité, tels que des bouquets de fleurs, des plantes d'intérieur et d'extérieur, des arrangements floraux pour les mariages et les événements, et bien plus encore.</p>
                <p className="about-us-paragraph">Nous sommes fiers de notre équipe de designers floraux expérimentés qui peuvent créer des arrangements personnalisés pour tous les besoins. De plus, notre équipe de service à la clientèle est toujours disponible pour répondre à toutes vos questions et vous aider à choisir les meilleurs produits pour vos besoins.</p>
            </div>
        </div>
    );
};

export default HomeBody;