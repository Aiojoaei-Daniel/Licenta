import React from "react";

import about1 from "../../images/about/despre1.jpg";
import about2 from "../../images/about/despre2.png";
import about3 from "../../images/about/despre3.png";

import "./about.css";

export default function About() {
  return (
    <article id="about-section">
      <h1 id="title">Cum funtioneaza?</h1>
      <div className="body">
        <img src={about1} alt="img" className="about-img1" />
        <p className="text1">
          Aceasta idee a luat nastere de la nevoia de a cumula toate anunturile
          de la foarte importante la mai putin importante intr-un singur loc.{" "}
          Postari pot avea ca grup tinta toti studentii facultatii, studentii
          unei specializari sau poate doar o anumita grupa, si pot fi sortate in
          functie de aceste criterii.
        </p>
        <p className="text2">
          Cadrele universitatii se conecteaza cu niste conturi speciale si pot
          creea postari pentru un anumit grup tinta. Daca in postare sunt
          greseli sau s-a gresit grupul tinta, aceasta se poate edita sau chiar
          sterge.
        </p>
        <img className="about-img2" src={about2} alt="img" />
        <img className="about-img3" src={about3} alt="img" />
        <p className="text3">
          Studentii urmeaza sa aiba o viata mai usoara cu aceasta aplicatie,
          putand vedea anunturile in timp real si sortandu-le pentru a citi doar
          ce ii intereseaza. Nu mai e nevoie sa fii in 10 grupuri de facebook
          sau sa urmaresti n tipuri de aplicatii si email-uri pentru a fi la
          curent cu noutatile. Niciun profesor nu va fi impotriva acestei
          aplicatii pentru ca este foarte usor de utilizat. De asemenea
          studentii au posibilitatea de a se inregistra pentru a fi notificati
          pe email cand se posteaza ceva pentru toti studentii, specializarea
          sau grupa lor.
        </p>
      </div>
    </article>
  );
}
