import React from 'react';
import Slider from 'react-slick';
import './homeBody.scss';

const HomeBody = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <div className="carousel">
                <Slider {...settings}>
                    <div>
                        <img src="https://example.com/image1.jpg" alt="Product 1" />
                    </div>
                    <div>
                        <img src="https://example.com/image2.jpg" alt="Product 2" />
                    </div>
                    <div>
                        <img src="https://example.com/image3.jpg" alt="Product 3" />
                    </div>
                </Slider>
            </div>

            <div className="about-us">
                <h2>A propos de la fleuristerie Soleil Vert</h2>
                <p>Nous sommes une boutique de fleurs et de plantes située dans le centre-ville. Nous offrons une grande variété de produits de qualité, tels que des bouquets de fleurs, des plantes d'intérieur et d'extérieur, des arrangements floraux pour les mariages et les événements, et bien plus encore.</p>
                <p>Nous sommes fiers de notre équipe de designers floraux expérimentés qui peuvent créer des arrangements personnalisés pour tous les besoins. De plus, notre équipe de service à la clientèle est toujours disponible pour répondre à toutes vos questions et vous aider à choisir les meilleurs produits pour vos besoins.</p>
            </div>
        </div>
    );
};

export default HomeBody;