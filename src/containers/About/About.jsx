import React from "react";

import about1 from "../../images/about/despre1.jpg";
import about2 from "../../images/about/despre2.png";
import about3 from "../../images/about/despre3.png";

import "./about.css";

export default function About() {
  return (
    <article id="about-section">
      <h1 id="title">Despre noi</h1>
      <div className="body">
        <img src={about1} alt="img" className="about-img1" />
        <p className="text1">
          Această idee a luat naștere din nevoia de a cumula toate anunțurile de
          la foarte importante la mai puțin importante într-un singur loc.{" "}
          Postările pot avea ca grup țintă toți studenții universității,
          studenții unei specializări sau poate doar o anumită grupă, și pot fi
          organizate in funcție de aceste criterii.
        </p>
        <p className="text2">
          Cadrele universitare se conectează cu anumite conturi speciale și pot
          creea postări pentru un anumit grup țintă. Dacă în postare sunt
          greșeli sau s-a greșit grupul țintă, aceasta se poate edita sau chiar
          șterge.
        </p>
        <img className="about-img2" src={about2} alt="img" />
        <img className="about-img3" src={about3} alt="img" />
        <p className="text3">
          Studenții urmează să aibă o viață mai ușoară cu această aplicație,
          putând vedea anunțurile în timp real și sortându-le pentru a citi doar
          ce ii interesează. Nu mai este nevoie să fii în nenumărate grupuri pe
          facebook sau să urmărești toate tipurile de aplicații și email-uri
          pentru a fi la curent cu noutățile. Niciun profesor nu va fi împotriva
          acestei aplicații pentru că este foarte ușor de utilizat. De asemenea
          studenții au posibilitatea de a se abona pentru a fi notificați pe
          email când se postează ceva ce ține de universitate, specializarea sau
          grupa din care fac parte.
        </p>
      </div>
    </article>
  );
}
