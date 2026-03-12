# Protocolo de Desarrollo

<!-- Documenta aquí el protocolo de desarrollo -->
REGLAS DE ORO , NUNCA USAR ANY.  SIMPRE DATOS TIPADOS- crar todo por fases O MODULOS , anotar que fase esta termina y pasar a la siguinte. NUNCA CAMBIAR EL NOMBRE ALOS ARCHIVOS, NI CARPETAS.
instalar,lucide,material ui,sweatalert2,react-form,zusdan,etc intalar react-pwa y configurar minifest.(San Juan Online y toda la metadata relacioanda con directorio digital , secciones de 1 a ña 7 y conilas alrederor. propiedad de Enrique Vargas. )

FASE 1
crear el componente Spinner.tsx  con una barra de incrento  en la parte inferior de la pantalla, que cambie de color con forme avance de 0 a 100 en lo que carga la pagiana. 2.- agregar el logo sanjuan de la carpeta public. spinner solo renderiza a App.tsx y App.tsx solo renderiza Home.tsx unicamnte. el spinner solo aparece una vez a entrar ala pagiano o solo cuando se recargue la misma web. NO EN NUNGUNA OTRA PARTE. la imagen cubre todo la pantalla en moviles. y proporcional en pc. agregar o crear un slogan que tenga relacion la logotipo, analizalo, (directorio digitsal para negocion pequeños para entrar el mundo digital)
correr buil, antes de pasara ala siguinte fase

FASE 2

Crear estructura de carpetas en la carpeta app  con las siguintes paginas que con SLUG(comida-rapida,restaurantes,entretenimiento,servicios,mantenimiento,salud,hoteles). NOTA ES IMPORTANTE QUE ESSA PAGINAS TENGA SLUG POR QUE DENTRO DE ELLAS VIVIRAN LAS SUBCARPETAS DE CADA categoria que va a tener la base de datos que son las mismas paginas para que no axita discrepancia,, ademas ya esta el slug en el array. Ejemplo comida-Rapida/tortas juan. (esto es importado desde el array) y asi lo mimmo para cada categoria-

- Crear paginas que no llevan nombre en Header solo con iconos con lucide. que son las paginas  Cuenta.tsx y Ajaustes.tsx.
Cuenta.tsx va a renderizar los datos del usuario. mas adenta cuando s implemente la opcion de registrar. (pendiente) 
Ajustes.tsx crear componente  para modo oscuro. Layut global solo debe de contener los datos para modo oscuro unicamnete. boton para descargar app. desde la play Store. dejar por defaul solo la url de google paly por ahora cuando estala ruta correcta se deplazara, crera componte Zona Vip-( nuavo componete que van a tener una grid de targetas globales para poner url de cupeneras de descuent unicas por cliente proximante en construcccion. ) crear un boton para abrir esta seccion.... que se trabajara asata el final 
Fase 3 
Crear el Header ( de dos tipos atipo hambuerguesa para moviles y tio para pc verificar que parescan correctamente las rutas de la pagina con Slug y las paginas que solo rendizan los iconos,) y agrgar un buscador. y una campanita de notificaciones.
 

 FASE 3.1  Crear la logica para poner dentro de ajstes compontete modo oscuro.(icono y nombre)
 poner creado por Enrique Vargas, justo al final de la seccion. agragrar la versdion de la aplicion.
fase 4 
 Crear Foter 
 NOTA "dejar los datos que tiene" :  Solo agregar  los iconos de la siguintes redes sociales. X,youtube,istagram,Facebook,Threads,tiktok, dejar los url por defecto luego remplazo por los reales.
 y ponerlos en el LayoutDirectorio.tex de la carpeta layouts. 
 correr buil, antes de pasara ala siguiente fase-
  Header y Fooeter viven dentro del layoutDirectorio.tsx en la carpeta layuot dentro de src. ese layou es unico para Home y las  9 paginas de la carpeta app.

Fase 5 
crear un modal Registro Grastis, los primero 100 negocios, PSTERIORMENTE. 100 NEGOCIOS %50 DE DECUETO. 100 25%  DE DECEUNTO.
caracatesiticas, un contador de o a 100  con di, que luego craamos la funcions. conetaralo en codigo para que n o se olvide. 
formulario bonito. que reciba ., nombre del negocio ,  giro. (para saber que categoria es)
y un seccion para subir logo. ( otro input que diga no tengo logo-)
dos botones, registro gratis, o registro premium. 

FASE 6
Crear componte, formularioGratis. NOTA LEER CUIDADOSAMNETE EL ARRAY. NEGOCIOS.TS PARA SABER ESCACATMENTE QUE DATOS SOLICITAR. 
CRAR POR AHOR AN NUEVO ARCHIVO LOCAL. PARA GAURAR AHI TODOS LOS DATOS, DEL FORMUALRIO LA LOGIACA ES QUE CUANDO SE RELLENE,, SE AUTOMATICE EN AUTOAMTICO EN ELAAARY POR AHORA LUEGO ALA  BASE DATOS,. PARA SU RENDERIZADO EN AUTOMATICO.. 
CREAR COMPONETE FORMULARIO , PARA LANDIG, PERSONALIZADO. (NUEVA lANDINGPAGE,PARA PRECIOS-) 

FASE 7 . 
DEJAR TODO COEMENTADO LISTO  PARA MIGRACION A BASE DE DATOS. 


Crear archivo listo para recir la  base de datos negocios.db que va hacer la misma que el array. solo cuando todo el fluj este terminado, por que hay que intrgrar todos lo negocios por cada una de las categorias. Por ahora solo trabajar con la  base local para maquetacion. 



FASE 8
Crera las secciones para Home.tsx  
pirmero crear la campaña publictaria para San Juen Online(directorio digital , para las secciones 1,2,,3,4,5,,6,7, y sus alrededores. )
1.- baneer con over lay- 
poner titulo y eslogan delante del la imagen
imagen para banner, sannjunn.jpg en la carpeta public.
ayudarme a crear las demas secciones , para una buena carta de prrsentaion o tqarjeta de presentacion.
(descripcion del poryecto bevepar ala craion de la cmapaña o la pagia Home.tsx. AYUDAR A TODSO LOS COMEENRTCIOS  ATENEU UN LUGAR EN INTERNET NO IMPORTA EL TAMAÑO DEL GIRO. EXITSN ESTABLECIEMEOTOS QUE YATIENE UN POCO DE MAS POSISN EN EL MENRCADO.. A ELLOS. OFRESCERLS UNALANDIG PROFESIONA APRTE, PERO POR AHOR ASELA VA A ADAR UNA PEQUEÑÑA LANDIG DENTRO DEL DIRECTORIO GLOBAL, SOLO  PRA QUE LOS USUSRIOS LOS CONTACTEN MAS RAPIDO, Y SUN SOLO PAGO, ) ACALRACION SOLO ESTA SECCION ES UNICA HE INDEPENDIENTE A TODO ELE PROYECTO, ES LA LANDIG DEL DUEÑO, POR FAVOR ANALISA EL COSNCEPTO PARA HOME.TSX

FASE 9
Verificar el rendirado correcto de el componete TarjetaNegocios.tsx que renderice correctamente los datos del array.
fase 9.1  Crar 3 targetas diferentes. una que Vpi muy grademas llamtiva. otra a la mitad de su taamño que la primera. y la ultma mas chica solo para relleno.
 Fase 9.2 conectar perfectamnet cada Targeta a cada categiria. [Slug] 
correr buil, antes de pasara ala siguinte fase
correr buil, antes de pasara ala siguinte fase
 Fase 10
 
 NOTA CADA LandigClientes.tsx tiene su propio arcivo para poder modificar , colores de HaderLandig y footerLandig que titulos, estilos de letras. etc. separados y comentados pefectaenet  pra principiantes. y tambien agragr BotonesContacto.tsx. al mismo layout.

Fase 11 HeaderLandig.tsx. tiene las rutos internas para la nevagacion dentro de la LandigClientes.tsx NOTA VERIDICAR SU RESPSONSIVODAD, TIPO HAMBURGUESA PARA MOVILES. Y ELPROPIO PARA PC. ademas agragr su pripia camapana de notificaciones. 

Fasee 11.1 
FoterLandig. recibe los valores del array del data/negicios.db.ts


CON ESTA ESTRUCTURA SE PODRA NAVEGAR CORRECTAMENET EPOR CATEGORIAS  DESDE LA PAGINA HOME. COMO LO INDCA EL ARCHIVO FLUJO.md de la misma carpeta.   SI ENCUETRAS UN ERROR EN EL FLUJO, PARA LA PERFECTA NEGEACION ME O INDICAS. POR FAVOR
  QUEDAN PENDIETES, LAS LOGIACAS PARA BUSQEDA. 
  LOGICA PARA LLENADO DE LAS PAGINAS AUTOMATICAMENTE AL REGISTAR. 
  QUEDA PENDIENTE LA LOGICA PARA FORMULARIOGRATIS. PARA AUTO LLENADO 

