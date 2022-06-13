import styled, { createGlobalStyle } from 'styled-components'
export const RegistrationStyles = createGlobalStyle`

.noborder {
    border-width: 0px !important;
    background-color : transparent !important;

}

.school-searchbar {
    background-color : grey !important;
    flex-direction : row !important;
    border-radius : 60px !important;
    margin: 5px;
    border-color : ${({ theme }) => theme.backgroundColor}!important;
    border-width : 1px;
}

.fill-window {
    height: 100%;
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
    background-color: white;
    justify-content: center;
}

.main-searchbar {
    border-radius : 20px !important;
    padding : 20px !important;
}

.input-group-text {
    padding: 0.438rem 1rem !important;
    margin-bottom: 0 !important; 
    text-align: center;  
    border-radius: 0.357rem; 
}

.row{
    display: flex;
    padding: 0px;
 }
 .col{
    flex: 1 1;
    text-align: left;
 }


.wrapper {
    flex: 1;
    flex-direction: column;
}

.card {
    background-color: green;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 !important;
    /* overflow: auto; */
    /* overflow-y:hidden; */

}

.card-div {
    flex-direction: row;
}

.row-card {
    background-color: ${({ theme }) => theme.backgroundColor};
}

.row-div {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.container {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
}

.container-1 {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    height: 30%;

}


.footerimage-background {
    background-image: url('../public/assets/images/img-2.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 100px;
  }

.register-button {
    background-color: ${({ theme }) => theme.backgroundColor};
    margin: 10px;
    padding: 10px 35px 10px 35px !important;
    border-radius: 25px;
    color: white;
    font-size: medium;
    border-width: 0px;
}

.header-style { 
    width:100%;
    margin: 0 auto; 
    justify-content: center;
    text-align:center; 
    border-bottom: 1px solid #000; 
    line-height:0.1em; 
    margin:10px 0 20px; 
} 
.header-span { 
    background:#fff; 
    padding:0 10px; 
    font-size: small;
}

html,body{height:100%;}
`
