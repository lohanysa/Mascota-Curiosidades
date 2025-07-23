import Navbar from '../components/navbar';
const galeria = () => {

  return (
    <>
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mt-4">Perfil</h1>
          <p className="text-center">datos personales</p>
          <div className>
            //aqui deveria mostrar el perfil del usuario
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mt-4">Imagenes guardadas</h1>
          <p className="text-center">en esta seccion pogras ver tus imagenes favotias </p>
          <div className>
            //se deveria poder ver las imagenes que se han guardado 
          </div>
        </div>
      </div>
    </div></>
  );
}
export default galeria;