import {useEffect, useState, useMemo} from "react";
import axios from 'api/axios';
import QRCODE from 'qrcode'
import useAuth from "hooks/useAuth";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Skeleton from '@mui/material/Skeleton';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";


// Soft UI Dashboard PRO React components
import SuiBadge from "components/SuiBadge";
import { Refresh } from "@mui/icons-material";

import ActionCell from "layouts/estudiantes/gest-estudiante/components/ActionCell";
import { saveAs } from "file-saver";

// sweetalert2 components
import Swal from "sweetalert2";

function ProductsList() {
  const { auth } = useAuth();
  const [tblEstu, setTblEstu] = useState([
    {
      id: '',
      nombre: '',
      edad: '',
      grado: '',
      Regional: '',
      comision: '',
      pais: '',
      habitacion: '',
      confirmacion: '',
      }]
  );

  const [qrcode, setQRCode] = useState('');

  let url = '';
  const refrescarLista = () => {
    obtenerDatos();
  }

  function obtenerDatos(){
    axios.get('/tablaESTUDIANTE', {params: {comision: auth.comision}})
    .then((response)=> {
      setTblEstu(response.data)
    });
  }

  useEffect(()=>{
    axios.get('/tablaESTUDIANTE', {params: {comision: auth.comision}})
    .then((response)=> {
      setTblEstu(response.data)
    });
  }, []);

  let nuevaEstud = null;
  auth.role === 1
  ?nuevaEstud = tblEstu.map(e => ({
    id: e.id,
    nombre: e.nombre,
    grado: e.grado,
    Regional: e.regional,
    comision: e.comision,
    pais: e.pais,
    habitacion: e.habitacion,
    confirmacion: e.confirmacion,
    action: <ActionCell id={e.id}/>,
  }))
  :nuevaEstud = tblEstu.map(e => ({
    id: e.id,
    nombre: e.nombre,
    Regional: e.regional,
    pais: e.pais,
    action: <ActionCell id={e.id}/>,
  }))
  


  const generarQRs = () => {
    Swal.fire({
      icon: 'info',
      title: 'Generaci??n de QRs iniciada espere mientras se descargan todos los QRs, se le avisar?? cuando est??n listos, no debe realizar ninguna operaci??n mientras se descargan los QRs.',
      timer: 25000,
      showConfirmButton: false,
    });

    var generacion = new Promise((resolve, reject)=>{
      tblEstu.forEach((e, i, array)=> setTimeout(
        ()=> {
        url = 'http://localhost:3000/estudiante'+`/${e.id}`
        QRCODE.toDataURL(url, {
          width: 1024,
          margin: 2,
          errorCorrectionLevel: 'M'
        },
           (err, url) => {
          if(err) return console.error(err)
  
          setQRCode(url)
          saveAs(url, `${e.id}`+'.png')
        })
        if(i === array.length -1) resolve();
      }, (i + 1) * 1000));
    })

    generacion.then(()=>{
      setTimeout(
        ()=> {
          Swal.fire({
            icon: 'success',
            title: 'Todos los c??digos QRs fueron generados satisfactoriamente',
            timer: 4000,
            showConfirmButton: false,
          });
        }, 1000);
    })
    
  }

  // Badges
  const outOfStock = (
    <SuiBadge variant="contained" color="error" size="xs" badgeContent="No confirmado" container />
  );
  const inStock = (
    <SuiBadge variant="contained" color="success" size="xs" badgeContent="Confirmado" container />
  );

  let atributos = null;
  auth.role === 1
  ?atributos = {
    columns: [
      {
        Header: "Id",
        accessor: "id",
      },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Grado", accessor: "grado" },
      { Header: "Regional", accessor: "Regional" },
      { Header: "Comisi??n", accessor: "comision" },
      { Header: "Pa??s", accessor: "pais" },
      { Header: "Habitaci??n", accessor: "habitacion" },
      {
        Header: "Confirmaci??n",
        accessor: "confirmacion",
        Cell: ({ value }) => (value === true ? inStock : outOfStock),
      },
      { Header: "Acci??n", accessor: "action" },
    ],
  
    rows: nuevaEstud,
  }:atributos = {
    columns: [
      {
        Header: "Id",
        accessor: "id",
      },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Regional", accessor: "Regional" },
      { Header: "Pa??s", accessor: "pais" },
      { Header: "Acci??n", accessor: "action" },
    ],
  
    rows: nuevaEstud,
  }

  const tablaDatos = useMemo(() => atributos, [tblEstu]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Todos los estudiantes
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Estudiantes participantes en MINUME.
              </SuiTypography>
            </SuiBox>
            <Stack spacing={1} direction="row">
              {auth.role === 1 
              &&<Link to="/estudiantes/registrar-estudiante">
                <SuiButton variant="gradient" color="info" size="small">
                  + Nuevo estudiante
                </SuiButton>
              </Link>}
              <Tooltip title="Actualizar" placement="bottom">
                <SuiButton variant="gradient" color="warning" size="medium" onClick={refrescarLista} iconOnly>
                  <Icon>sync</Icon>
                </SuiButton>
              </Tooltip>
              {auth.role === 1 
              &&<Tooltip title="Generar QRs" placement="bottom">
              <SuiButton variant="gradient" color="dark" size="medium" onClick={generarQRs} iconOnly>
                <QrCode2Icon/>
              </SuiButton>
            </Tooltip>}
            </Stack>
          </SuiBox>
          {tblEstu.length === 1 
          ? <DataTable
              table={{columns: [
                {
                  Header: "Id",
                  accessor: "id",
                },
                { Header: "Nombre", accessor: "nombre" },
                { Header: "Grado", accessor: "grado" },
                { Header: "Regional", accessor: "Regional" },
                { Header: "Comisi??n", accessor: "comision" },
                { Header: "Pa??s", accessor: "pais" },
                { Header: "Habitaci??n", accessor: "habitacion" },
                {
                  Header: "Confirmaci??n",
                  accessor: "confirmacion",
                },
              ],
  
              rows: [
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  edad: <Skeleton animation="wave" width={100}/>,
                  grado: <Skeleton animation="wave" width={100}/>,
                  Regional: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  pais: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
              ]
            }}
              entriesPerPage={false}
            /> 
          : <DataTable
              table={tablaDatos}
              entriesPerPage={{
                defaultValue: 15,
                entries: [15, 20, 25],
              }}
              autoResetPage = {false}
              canSearch
            />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductsList;