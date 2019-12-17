import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
    const padd = {
        // marginTop : "-100px",
        position: "absolute",
        bottom: "0"
        
    }
  return ( 
    <MDBFooter  color="grey darken-4" className="font-small ">
    
      <div className="footer-copyright text-center py-3" >
        <MDBContainer fluid >    
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.meet2pop.com"> Meet2Pop </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );    
}

export default FooterPage;