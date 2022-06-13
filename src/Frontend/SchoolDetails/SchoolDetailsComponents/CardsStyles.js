import styled, { createGlobalStyle } from 'styled-components'

export const CardStyles = createGlobalStyle`

.container {
  height: 200px;
  position: relative;
  border: 3px solid green;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.center-div {
  margin: 0;
  position: absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.card {
    padding: 2rem;
    background: #fff;
  }

  .card:hover {
    border: ${({ theme }) => { return `1px solid ${theme.backgroundColor}` }} !important;
  }


  
  .cards {
    padding: 2rem
  }
  
  h1 {
    text-align: center;
  }
  
  .cards__container {
    display: flex;
    flex-flow: column;
    align-items: center;
    max-width: 1120px;
    width: 90%;
    margin: 0 auto;
  }
  
  .cards__wrapper {
    position: relative;
    margin: 50px 0 45px;
  }
  
  .cards__items {
    margin-bottom: 24px;
  }
  
  .cards__item {
    display: flex;
    flex: 1;
    margin: 0 1rem;
    border-radius: 10px;
  }
  
  .cards__item__link {
    display: flex;
    flex-flow: column;
    width: 100%;
    box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
    -webkit-filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
    filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
  }
  
  .cards__item__pic-wrap {
    position: relative;
    width: 100%;
    padding-top: 67%;
    overflow: hidden;
  }
  
  .fade-img {
    animation-name: fade-img;
    animation-duration: 2s;
  }
  
  .cards__item__pic-wrap::after {
    content: attr(data-category);
    position: absolute;
    bottom: 0;
    margin-left: 10px;
    padding: 6px 8px;
    max-width: calc((100%) - 60px);
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background-color: #1f98f4;
    box-sizing: border-box;
  }
  
  .cards__item__img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
    transition: all 0.2s linear;
  }
  
  .cards__item__img:hover {
    transform: scale(1.1);
  }
  
  .cards__item__info {
    padding: 20px 30px 30px;
  }
  
  .cards__item__text {
    color: #252e48;
    font-size: 18px;
    line-height: 24px;
  }
  
  @media only screen and (min-width: 1200px) {
    .content__blog__container {
      width: 84%;
    }
  }
  
  @media only screen and (min-width: 1024px) {
    .cards__items {
      display: flex;
    }
  }
  
  @media only screen and (max-width: 1024px) {
    .cards__item {
      margin-bottom: 2rem;
    }
  }
  
  .searchBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform:  translate(-50%,50%);
    background: #2f3640;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
  
  }
  
  .searchBox:hover > .searchInput {
    width: 240px;
    padding: 0 6px;
  }
  
  .searchBox:hover > .searchButton {
  background: white;
  color : #2f3640;
  }
  
  .searchButton {
    color: white;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
  }
  
  .searchInput {
    border:none;
    background: none;
    outline:none;
    float:left;
    padding: 0;
    color: white;
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
  
  }
  
  @media screen and (max-width: 620px) {
  .searchBox:hover > .searchInput {
    width: 150px;
    padding: 0 6px;
  }
  }
  
  .search__container {
        padding-top: 64px;
    }
    .search__title {
      font-size: 22px;
      font-weight: 900;
      text-align: center;
      color:#E42E2E;
  }
  .search__input {
    width: 100%;
    padding: 12px 24px;
  
    background-color: transparent;
    transition: transform 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;
    
    color:#E42E2E;
    background-color: transparent;
  /*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */
  
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 50px;
    border: 1px solid #F08989;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;}
    
    body {
      margin:  0;
    }
    /* .page-content {
      width: 100%;
      margin:  0 auto;
      background: #75e2e9;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -o-justify-content: center;
      -ms-justify-content: center;
      -moz-justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -o-align-items: center;
      -ms-align-items: center;
      -moz-align-items: center;
      -webkit-align-items: center;
    } */
    .form-v4-content  {
      background: #fff;
      width: 850px;
      border-radius: 10px;
      -o-border-radius: 10px;
      -ms-border-radius: 10px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
      -o-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
      -ms-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
      -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
      -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
      margin: 175px 0;
      position: relative;
      display: flex;
      display: -webkit-flex;
      font-family: 'Open Sans', sans-serif;
    }
    .form-v4-content h2 {
      font-weight: 700;
      font-size: 30px;
      padding: 6px 0 0;
      margin-bottom: 34px;
    }
    .form-v4-content .form-left {
      background: #3786bd;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 20px 40px;
      position: relative;
      width: 100%;
      color: #fff;
    }
    .form-v4-content .form-left p {
      font-size: 15px;
      font-weight: 300;
      line-height: 1.5;
    }
    .form-v4-content .form-left span {
      font-weight: 700;
    }
    .form-v4-content .form-left .text-2 {
      margin: 20px 0 25px;
    }
    .form-v4-content .form-left .account {
      background: #fff;
      border-top-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg);
      width: 180px;
      border: none;
      margin: 15px 0 50px 0px;
      cursor: pointer;
      color: #333;
      font-weight: 700;
      font-size: 15px;
      font-family: 'Open Sans', sans-serif;
      appearance: unset;
        -moz-appearance: unset;
        -webkit-appearance: unset;
        -o-appearance: unset;
        -ms-appearance: unset;
        outline: none;
        -moz-outline: none;
        -webkit-outline: none;
        -o-outline: none;
        -ms-outline: none;
    }
    .form-v4-content .form-left .account:hover {
      background: #e5e5e5;
    }
    .form-v4-content .form-left .form-left-last input {
      padding: 15px;
    }
    .form-v4-content .form-detail {
        padding: 20px 40px;
      position: relative;
      width: 100%;
    }
    .form-v4-content .form-detail h2 {
      color: #3786bd;
    }
    .form-v4-content .form-detail .form-group {
      display: flex;
      display: -webkit-flex;
      margin:  0 -8px;
    }
    .form-v4-content .form-detail .form-row {
      width: 100%;
      position: relative;
    }
    .form-v4-content .form-detail .form-group .form-row.form-row-1 {
      width: 50%;
      padding: 0 8px;
    }
    .form-v4-content .form-detail label {
      font-weight: 600;
      font-size: 15px;
      color: #666;
      display: block;
      margin-bottom: 8px;
    }
    .form-v4-content .form-detail .form-row label#valid {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        -o-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        width: 14px;
        height: 14px;
        border-radius: 50%;
        -o-border-radius: 50%;
        -ms-border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        background: #53c83c;
    }
    .form-v4-content .form-detail .form-row label#valid::after {
      content: "";
        position: absolute;
        left: 5px;
        top: 1px;
        width: 3px;
        height: 8px;
        border: 1px solid #fff;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .form-v4-content .form-detail .form-row label.error {
      padding-left: 0;
      margin-left: 0;
        display: block;
        position: absolute;
        bottom: -5px;
        width: 100%;
        background: none;
        color: red;
    }
    .form-v4-content .form-detail .form-row label.error::after {
        content: "\f343";
        font-family: "LineAwesome";
        position: absolute;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        right: 10px;
        top: -31px;
        color: red;
        font-size: 18px;
        font-weight: 900;
    }
    .form-v4-content .form-detail .input-text {
      margin-bottom: 27px;
    }
    .form-v4-content .form-detail input {
      width: 100%;
        padding: 11.5px 15px;
        border: 1px solid #e5e5e5;
        border-top-left-radius: 5px;
        border-bottom-right-radius: 5px;
        appearance: unset;
        -moz-appearance: unset;
        -webkit-appearance: unset;
        -o-appearance: unset;
        -ms-appearance: unset;
        outline: none;
        -moz-outline: none;
        -webkit-outline: none;
        -o-outline: none;
        -ms-outline: none;
        font-family: 'Open Sans', sans-serif;
        font-size: 15px;
        color: #333;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
    }
    .form-v4-content .form-detail .form-row input:focus {
      border: 1px solid #53c83c;
    }
    .form-v4-content .form-detail .form-checkbox {
      margin-top: 1px;
      position: relative;
    }
    .form-v4-content .form-detail .form-checkbox input {
      position: absolute;
        opacity: 0;
    }
    .form-v4-content .form-detail .form-checkbox .checkmark {
      position: absolute;
        top: 13px;
        left: 0;
        height: 15px;
        width: 15px;
        border: 1px solid #ccc;
        cursor: pointer;
    }
    .form-v4-content .form-detail .form-checkbox .checkmark::after {
      content: "";
        position: absolute;
        left: 5px;
         top: 1px;
        width: 3px;
        height: 8px;
        border: 1px solid #3786bd;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
        display: none;
    }
    .form-v4-content .form-detail .form-checkbox input:checked ~ .checkmark::after {
        display: block;
    }
    .form-v4-content .form-detail .form-checkbox p {
        margin-left: 34px;
        color: #333;
        font-size: 14px;
        font-weight: 600;
    }
    .form-v4-content .form-detail .form-checkbox .text {
      font-weight: 700;
      color: #3786bd;
      text-decoration: underline;
    }
    .form-v4-content .form-detail .register {
      background: #3786bd;
      border-top-left-radius: 5px;
      border-bottom-right-radius: 5px;
      width: 130px;
      border: none;
      margin: 6px 0 50px 0px;
      cursor: pointer;
      color: #fff;
      font-weight: 700;
      font-size: 15px;
    }
    .form-v4-content .form-detail .register:hover {
      background: #2f73a3;
    }
    .form-v4-content .form-detail .form-row-last input {
      padding: 12.5px;
    }
    
    /* Responsive */
    @media screen and (max-width: 991px) {
      .form-v4-content {
        margin: 180px 20px;
        flex-direction:  column;
        -o-flex-direction:  column;
        -ms-flex-direction:  column;
        -moz-flex-direction:  column;
        -webkit-flex-direction:  column;
      }
      .form-v4-content .form-left {
        width: auto;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0;
      }
      .form-v4-content .form-detail {
        padding: 30px 20px 30px 20px;
          width: auto;
      }
    }
    @media screen and (max-width: 575px) {
      .form-v4-content .form-detail .form-group {
        flex-direction: column;
        -o-flex-direction:  column;
        -ms-flex-direction:  column;
        -moz-flex-direction:  column;
        -webkit-flex-direction:  column;
        margin: 0;
      }
      .form-v4-content .form-detail .form-group .form-row.form-row-1 {
        width: 100%;
        padding:  0;
      }
    }
  
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
    }
    
    /* Float four columns side by side */
    .column {
      float: left;
      width: 20%;
      padding: 0 10px;
    }    
    /* Remove extra left and right margins, due to padding */
    .row {margin: 0 -5px;}    
    /* Clear floats after the columns */
    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    
    /* Responsive columns */
    @media screen and (max-width: 600px) {
      .column {
        width: 100%;
        display: block;
        margin-bottom: 20px;
      }
    }
    }`