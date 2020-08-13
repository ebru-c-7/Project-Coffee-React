import React, { useState } from "react";
import classes from "./News.module.css";

const News = (props) => {
  const [activeNews, setActiveNews] = useState(0);
  const news = ["./img/news/news-1.png", "./img/news/news-2.png", "./img/news/news-3.png"];

  let bars = news.map((news, i) => {
    return (
      <span key={i} className={classes.BarItem}
        style={i === activeNews ? { backgroundColor: "rgba(0,99,65,1)" } : { backgroundColor: "white" }}
      ></span>
    );
  });

  const newsSlide = (action) => {
    if(action === "back") {
      activeNews-1 < 0 ? setActiveNews(news.length-1) : setActiveNews(activeNews-1);
    } else if(action === "next") {
      activeNews + 1 === news.length ? setActiveNews(0) : setActiveNews(activeNews+1);
    }
  };


    return (
      <section className={classes.News}>
        <div className={classes.Newspanel}>
        {/* <button className={classes.ButtonBack} onClick={newsSlide.bind(null, "back")}> */}
          <button className={classes.ButtonBack} onClick={newsSlide.bind(null,"back")}>
            {"<"}
          </button>
          <img className={classes.NewsImg} src={news[activeNews]} alt="new products"
          />
          {/* <button className={classes.ButtonNext} onClick={newsSlide.bind(null, "next")}> */}
          <button className={classes.ButtonNext} onClick={newsSlide.bind(null,"next")}>
            {">"}
          </button>
        </div>
        <div className={classes.Bars}>{bars}</div>
      </section>
    );
  }

export default News;
