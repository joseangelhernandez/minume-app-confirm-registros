/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
export default function sidenavLogoLabel(theme, ownerState) {
  const { functions, transitions, typography, breakpoints } = theme;
  const { miniSidenav } = ownerState;

  const { pxToRem } = functions;
  const { fontWeightMedium } = typography;

  return {
    ml: 0.5,
    fontWeight: fontWeightMedium,
    wordSpacing: pxToRem(-3),
    transition: transitions.create("opacity", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
    },
  };
}