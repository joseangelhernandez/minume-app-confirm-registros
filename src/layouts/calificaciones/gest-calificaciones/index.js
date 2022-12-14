import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import useAuth from "hooks/useAuth";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Skeleton from '@mui/material/Skeleton';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CalifTable_primera from "layouts/calificaciones/gest-calificaciones/DataTableEdit_primera/dataTableEditorCalif";
import CalifTable_segunda from "layouts/calificaciones/gest-calificaciones/DataTableEdit_segunda/dataTableEditorCalif";
import CalifTable_tercera from "layouts/calificaciones/gest-calificaciones/DataTableEdit_tercera/dataTableEditorCalif";
import CalifTable_cuarta from "layouts/calificaciones/gest-calificaciones/DataTableEdit_cuarta/dataTableEditorCalif";
import CalifTable_general from "layouts/calificaciones/gest-calificaciones/DataTableEdit_general/dataTableEditorCalif";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calificaciones({stickyNavbar}) {
  const { auth} = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [usuario, setUsuario] = useState([
    {
      roleId: '',
      comision: '',
      sesion_trabajo: '',
      tipo_mesa: '',
    }
  ]);
  const [usuarios, setUsuarios] = useState([{
    usuario: ''
  }])
  const [cargando, setCargando] = useState(true);
  const [tblEstuCalif, setTblEstucalif] = useState([
{
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>
    },
    
    ]
  );

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(()=>{
    try{
      axios.get('http://jose03-001-site1.htempurl.com/api/GETUSUARIOS_SP')
      .then((response)=> {
        setUsuarios(response.data);
      });
    }catch(error){
      console.log(error);
    }
    try{
      axios.get('http://jose03-001-site1.htempurl.com/api/USUARIOROLE_SP/'+`${cookies.get('usuario')}`)
      .then((response)=> {
        setUsuario(response.data);
        setCargando(false);
      }).then(()=>{
        if(usuario[0].comision != ''){
          axios.get('http://jose03-001-site1.htempurl.com/api/CALIFICACIONES/'+`${usuario[0].comision}`)
          .then((response)=> {
            setTblEstucalif(response.data)
          });
        }
      });
    }catch(error){
      console.log(error);
    }
  }, [cargando]);

  useEffect(() => {auth.role !== 1 && navigate('/Inicio', {replace: true});}, []);

  return (
  <DashboardLayout>
    <ToastContainer />
    <DashboardNavbar />
    <SuiBox mt={stickyNavbar ? 3 : 5}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Primera Sesi??n"/>
                <Tab label="Segunda Sesi??n"/>
                <Tab label="Tercera Sesi??n"/>
                <Tab label="Cuarta Sesi??n"/>
                <Tab label="General"/>
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
    </SuiBox>
    <SuiBox my={3}>
      
      <Card>
        {tabValue === 0 && <CalifTable_primera tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 1 && <CalifTable_segunda tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 2 && <CalifTable_tercera tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 3 && <CalifTable_cuarta tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 4 && <CalifTable_general tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
      </Card>
    </SuiBox>
    <Footer />
  </DashboardLayout>
  );

}

// Setting default values for the props of BaseLayout
Calificaciones.defaultProps = {
  stickyNavbar: false,
};

// Typechecking props for BaseLayout
Calificaciones.propTypes = {
  stickyNavbar: PropTypes.bool,
};


export default Calificaciones;