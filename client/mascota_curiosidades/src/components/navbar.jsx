


import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleGaleriaClick = () => {
        navigate('/galeria');
    };

    const handleSeachClick = () => {
        navigate('/Home');
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">CATS & DOGS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-white" aria-current="page" onClick ={handleSeachClick}>Buscar</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-white" onClick={handleGaleriaClick}>
                                Mi galería
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
