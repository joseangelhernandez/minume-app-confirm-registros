import {useEffect, useState, forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

//TABLES STYLES
import MaterialTable from "material-table";
import { Icon } from '@iconify/react';
import { AddBox, ArrowDownward } from "@mui/icons-material";
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

// sweetalert2 components
import Swal from "sweetalert2";

//TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CalifTable(calificaciones) {
  const cookies = new Cookies();
  const history = useNavigate();
  const [envioCalif, setEnvioCalif] = useState(cookies.get('sesion_trabajo'));
  let dataUpdate = [];
  let index = 0;
  let itemsProcesados = 0;

  const [data, setData] = useState(calificaciones.tblEstuCalif);

  useEffect(()=>{
    setData(calificaciones.tblEstuCalif);
  },[calificaciones.tblEstuCalif]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:check-mark-button" {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:cross-mark" {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:pencil" {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <Icon icon="eva:cloud-download-outline" {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Enviar: forwardRef((props, ref) => <Icon icon="mdi:email-fast" {...props} ref={ref} />),
    Listo: forwardRef((props, ref) => <Icon icon="mdi:check" {...props} ref={ref} />),
    Activar_Envios: forwardRef((props, ref) => <Icon icon="mdi:playlist-check" {...props} ref={ref} />),
    Desactivar_Envios: forwardRef((props, ref) => <Icon icon="mdi:playlist-remove" {...props} ref={ref} />)
  };
  const columns = [
    {
      title: 'Secuencia', field: 'secuencia', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegado ID", field: "delegado", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Representaci??n", field: "pais", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "PENC", field: "pen_critico", type: 'numeric',
      validate: rowData => rowData.pen_critico >=  0 ? (rowData.pen_critico <= 40 ? true : 'La calificaci??n debe estar entre 0 y 40') : 'La calificaci??n debe estar entre 0 y 40' ,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    { title: "RELP", field: "resol_problemas", type: 'numeric',
      validate: rowData => rowData.resol_problemas >=  0 ? (rowData.resol_problemas <= 35 ? true : 'La calificaci??n debe estar entre 0 y 35') : 'La calificaci??n debe estar entre 0 y 35' ,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    { title: "NEG", field: "negociacion", type: 'numeric',
      validate: rowData => rowData.negociacion >=  0 ? (rowData.negociacion <= 35 ? true : 'La calificaci??n debe estar entre 0 y 35') : 'La calificaci??n debe estar entre 0 y 35' ,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    data.length>10
    ?{ title: "Confirmaci??n", field: "confir_dir_ad", type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n", field: "confir_dir_ad",
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
  ];

  function PostCalif(record){
    axios.post('http://jose03-001-site1.htempurl.com/api/CALIFICACIONES'+`/${record.delegado}`, 
    {
      secuencia: record.secuencia,
      delegado: record.delegado,
      comision: record.comision,
      pais: record.pais,
      comunicativa: record.comunicativa,
      oratoria: record.oratoria,
      redaccion: record.redaccion,
      pen_logico: record.pen_logico,
      argumentacion: record.argumentacion,
      pen_critico: record.pen_critico,
      resol_problemas: record.resol_problemas,
      negociacion: record.negociacion,
      des_personal: record.des_personal,
      liderazgo: record.liderazgo,
      starpoint: record.starpoint,
      total: record.total,
      confir_dir_ad: record.confir_dir_ad
    }).catch(() => {
      let timerInterval
      Swal.fire({
        icon: 'error',
        title: 'Error en el env??o de datos',
        timer: 8000,
        timerProgressBar: true,
        showConfirmButton: false,
        text: 'Por favor asegurarse de no utilizar decimales en los campos de publicaci??n.',
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          history(0)
        }
      })
    });
  }

  function Refrescar(){
    axios.get('http://jose03-001-site1.htempurl.com/api/CALIFICACIONES/'+`${calificaciones.sesion_trabajoTBL.comision}`)
    .then(response => {
      setData(response.data);
      toast.success("Datos actualizados", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    })
    .catch(() => {
      let timerInterval
        Swal.fire({
          icon: 'error',
          title: 'Error en al recargar los datos',
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: false,
          text: 'Intentelo nuevamente, de lo contrario por favor contactar con Mesa de Ayuda.',
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            history(0)
          }
        })
    });
  }

  function EnviarCalificaciones(){
    try{
      axios.put('http://jose03-001-site1.htempurl.com/api/USUARIOROLE_SP/'+`${cookies.get('usuario')}?sesion_trabajo=4`)
      .then(()=> {
        toast.success("Calificaciones enviadas satisfactoriamente.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          onClose: () => history(0)
        });
      });
    }catch(error){
      toast.error("Hubo un error en el env??o.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      console.log(error);
    }
  }

  function ActivarEnvios(){
    itemsProcesados = 0;
    calificaciones.Lista_usuarios.forEach(element => {
      try{
        axios.put('http://jose03-001-site1.htempurl.com/api/USUARIOROLE_SP/'+`${element.usuario}?sesion_trabajo=3`);
      }catch(error){
        console.log(error);
      }
      itemsProcesados++;

      if(itemsProcesados === calificaciones.Lista_usuarios.length){
        toast.success("Env??os activados", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      }
    });
  }
  function DesactivarEnvios(){
    itemsProcesados = 0;
    calificaciones.Lista_usuarios.forEach(element => {
      try{
        axios.put('http://jose03-001-site1.htempurl.com/api/USUARIOROLE_SP/'+`${element.usuario}?sesion_trabajo=4`);
      }catch(error){
        console.log(error);
      }
      itemsProcesados++;

      if(itemsProcesados === calificaciones.Lista_usuarios.length){
        toast.error("Env??os Desactivados", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      }
    });
  }

  function EnviarCorreos(){
    console.log('Enviando correos');
  }

  return (
    <MaterialTable 
      title="Reporte de Evaluaciones" 
      data={data} 
      columns={columns}
      icons={tableIcons}
      actions={data.length>10
        ?[
        {
          icon: 'refresh',
          tooltip: 'Actializar datos',
          isFreeAction: true,
          onClick: () => {
            Refrescar();
          },
        
        },
        calificaciones.sesion_trabajoTBL.roleid === 1
        ?{  
          icon: tableIcons.Activar_Envios,
          tooltip: 'Activar envios',
          isFreeAction: true,
          onClick: () => {ActivarEnvios()},
        }
        :null,
        calificaciones.sesion_trabajoTBL.roleid === 1
        ?{  
          icon: tableIcons.Desactivar_Envios,
          tooltip: 'Desactivar envios',
          isFreeAction: true,
          onClick: () => {DesactivarEnvios()},
        }:null,
        calificaciones.sesion_trabajoTBL.roleid === 1
        ?{  
          icon: tableIcons.Enviar,
          tooltip: 'Enviar correos',
          isFreeAction: true,
          onClick: () => {EnviarCorreos()},
        }
        :calificaciones.sesion_trabajoTBL.sesion_trabajo === 3 && calificaciones.sesion_trabajoTBL.roleid > 1
        ?{  
          icon: tableIcons.Listo,
          tooltip: 'Enviar calificaciones',
          isFreeAction: true,
          onClick: () => {EnviarCalificaciones()},
        }:null
        
      ]:[]}
      editable={data.length>10
        ?calificaciones.sesion_trabajoTBL.roleid === 1
        ?{onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dataUpdate = [...data];
              index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              PostCalif(newData);
              resolve();
            }, 1000)
          }),}
        :calificaciones.sesion_trabajoTBL.sesion_trabajo === 3 && calificaciones.sesion_trabajoTBL.roleid > 1
        ?{onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dataUpdate = [...data];
              index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              PostCalif(newData);
              resolve();
            }, 1000)
          }),}
        :{}
        :null
      }
      style=
      {{
        boxShadow: "none",
        paddingTop: "10px",
      }}
      localization={{
        header:{
          actions: "Acciones"
        }
      }}
      options={data.length>10
        ?
        {
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          headerStyle:{
            paddingRight: '50px'
          },
          actionsColumnIndex: -1,
          exportButton:true,
          searchFieldStyle: {marginRight: "5%"},
          rowStyle: {
            justifyContent: "center",
            fontSize: '0.875rem',
            borderBottom: '0.0625rem solid #e9ecef',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '24px',
            paddingRight: '24px',
            opacity: 1,
            backgroundColor: 'transparent',
            color: '#344767'
          },
        }:
        {
          pageSize: 10,
          pageSizeOptions: [],
          headerStyle:{
            paddingRight: '50px'
          },
          actionsColumnIndex: -1,
          search: false,
          rowStyle: {
            justifyContent: "center",
            fontSize: '0.875rem',
            borderBottom: '0.0625rem solid #e9ecef',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '24px',
            paddingRight: '24px',
            opacity: 1,
            backgroundColor: 'transparent',
            color: '#344767'
          },
        }
      }
    />
  );
}

export default CalifTable;