import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyImg from '../../assets/images/icons/study.svg';
import giveClassesImg from '../../assets/images/icons/give-classes.svg';
import purpleHeartImg from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect( () => {
        api.get('/connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        });
    }, [] )

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                
                <img 
                    src={landingImg} 
                    alt="Plataforma de estudos" 
                    className="hero-image"
                />

                <div className="buttons-container">

                    <Link to="/study" className="study">
                        <img src={studyImg} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesImg} alt="Dar aulas"/>
                        Dar aulas
                    </Link>

                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas. <img src={purpleHeartImg} alt="Coração roxo"/>
                </span>

            </div>
        </div>
    )
}

export default Landing;