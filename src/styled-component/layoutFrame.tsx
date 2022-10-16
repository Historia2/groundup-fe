import React from "react";
import styled from "styled-components";
// import MenuFooter from "./menuFooter";
import { Outlet } from "react-router-dom";
import GeneralHeader from "../components/generalheader";

// const GeneralHeader = React.lazy(() => import("../components/generalheader"));
// const FooterNavigation = React.lazy(() => import("../components/partial/footernavigation"));

const SectionContent = styled.section`
  position: relative;
`
const LayoutFrame = () => {
  return (
    <SectionContent>
        <React.Suspense>
            <GeneralHeader />
        </React.Suspense>
        <Outlet />  
        
        {/* menu footer */}
        
        {/* navigation */}
        
      {/* <MenuFooter> */}
        {/* <React.Suspense>
          <FooterNavigation />
        </React.Suspense> */}
      {/* </MenuFooter> */}
    </SectionContent>
  )
};

export default LayoutFrame