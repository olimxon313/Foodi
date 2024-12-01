import './about.scss';
import { useTranslation } from 'react-i18next';
import React from 'react';
export default function About() {
    const { t } = useTranslation();

    return (
        <div id="about" className="about">
            <h1>{t('about.title')}</h1>
            <br />
            <p>
                {t('about.description') 
                .split("\n")
                .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < t("landing.text-1").split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}</p>

            <div>
                <div className='text'>
                    {t('about.text')}
                </div>
                <div className='video'>
                    <a href="https://youtu.be/dQw4w9WgXcQ?si=3xsrZEjwKGVM-_2g" target="_blank" rel="noopener noreferrer">
                        <img src="/images/Video-1.png" alt={t('about.videoAlt')} />
                    </a>
                </div>
            </div>
        </div>
    );
}
