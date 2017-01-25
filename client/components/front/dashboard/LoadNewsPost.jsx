import React, { Component, PropTypes } from 'react';

export default class LoadNewsPost extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {news} = this.props;
    var content;
    if(news){

   //   if(dashboardData.news){
      var desc = news.ogDescription?news.ogDescription:null;
       content = (
         <div>
           <input type="hidden" ref="hidden_news_image" value={news.ogImage?news.ogImage.url:null}/>
            <input type="hidden" ref="hidden_news_title" value={news.ogTitle?news.ogTitle:null}/>
              <input type="hidden" ref="hidden_news_url" value={news.ogUrl?news.ogUrl:null}/>
         <div>
           <img src={news.ogImage?news.ogImage.url:null}/>

        </div>
        <div className="news_heading"><h5>{news.ogTitle?news.ogTitle:null}</h5></div>
        {/* <div className="news_description"><span>{news.ogDescription?news.ogDescription:null}</span></div> */}

          <textarea placeholder="Enter description here" className="uk-width-1-1" ref="postImageContent" >{desc}</textarea>
          <div className="news_site"><h5>{news.ogSiteName?"by|"+news.ogSiteName:null}</h5></div>
    </div>
      )
   // }
 }else{
   content=(
     <div>Loading...</div>
   )
 }

    return(
      <div className="img_border">
      {content}
    </div>
    )
  }
}
