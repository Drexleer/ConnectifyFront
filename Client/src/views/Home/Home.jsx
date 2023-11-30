/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdRefresh } from 'react-icons/io';
import { MdPersonSearch } from 'react-icons/md';
import Obrero from '../../assets/Obrero.gif';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Login from '../../components/Login/Login';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { locationUser } from '../../redux/Slices/persistSlice';
import Professional from '../../components/Card/Professional';
import { fetchAds } from '../../redux/Slices/adsSlice';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { fetchFilter } from '../../redux/Slices/FiltersCombinedSlice';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Footer from '../../components/Footer/Footer';
import Chat from '../../components/Chat/Chat';
import ButtonTop from '../../components/Utils/ButtonTop/ButtonTop';
import Loading from '../../components/Utils/Loading/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUserLoginWithGoogle } from '../../redux/Slices/loginGoogleSlice';
import Cover from '../../components/Cover/Cover';
import { RiMenuSearchFill } from 'react-icons/ri';
import { IoIosChatbubbles } from 'react-icons/io';
import { FaWindowClose } from 'react-icons/fa';

const Home = () => {
  //* Declaraciones de variables
  const location = useLocation();
  const dispatch = useDispatch();

  //* Estados locales
  const [containerLogin, setContainerLogin] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [profession, setProfession] = useState('');
  const [locationProf, setLocationProf] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  //* Estados globales
  const adsFiltered = useSelector((state) => state.ads.adsFiltered);
  const ads = useSelector((state) => state.ads.ads);
  const { isAuthenticated, user } = useAuth0();
  // estado global para traer los datos del usuario
  const userId = useSelector((state) => state.usersLogin.user);
  //traer usuario ya después de iniciar sesión
  const nickname = userId?.userName || user?.nickname || '';
  const imageUser = userId?.image || user?.picture || '';

  //* Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(9);
  //para ir dividiendo los anuncios en paginas definimos los indices
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  // Guardamos los anuncios que se van a mostrar de indice en indice
  const currentAds = adsFiltered.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (adsFiltered.length < 1) {
      localStorage.setItem('locationProf', '');
      localStorage.setItem('profession', '');
      localStorage.setItem('priceRange', JSON.stringify([1000, 10000]));
      localStorage.setItem('workLocation', '');
      localStorage.setItem('sortPrice', '');
    }

    const savedLocationProf = localStorage.getItem('locationProf');
    if (savedLocationProf && adsFiltered.length > 0) {
      setLocationProf(savedLocationProf);
    }

    const savedProfession = localStorage.getItem('profession');
    if (savedProfession && adsFiltered.length > 0) {
      setProfession(savedProfession);
    }

    const savedPriceRange = JSON.parse(localStorage.getItem('priceRange'));
    if (savedPriceRange) {
      setPriceRange(savedPriceRange);
    }

    const savedWorkLocation = localStorage.getItem('workLocation');
    if (savedWorkLocation && adsFiltered.length > 0) {
      setWorkLocation(savedWorkLocation);
    }

    const savedSortPrice = localStorage.getItem('sortPrice');
    if (savedSortPrice && adsFiltered.length > 0) {
      setSortPrice(savedSortPrice);
    }
  }, []);

  useEffect(() => {
    paginate(1);
  }, [adsFiltered]);

  //* Filtros Combinados
  const handleLocation = (e) => {
    e.preventDefault();
    setLocationProf(e.target.value);

    localStorage.setItem('locationProf', e.target.value);
  };

  const handleProfession = (e) => {
    e.preventDefault();
    setProfession(e.target.value);

    localStorage.setItem('profession', e.target.value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);

    localStorage.setItem('priceRange', JSON.stringify(value));
  };

  const handleRemoteWork = (e) => {
    setWorkLocation(e.target.value);

    localStorage.setItem('workLocation', e.target.value);
  };

  const handlesortPrice = (e) => {
    e.preventDefault();
    setSortPrice(e.target.value);

    localStorage.setItem('sortPrice', e.target.value);
  };

  //* Función para aplicar los filtros
  const applyFilters = async () => {
    await dispatch(
      fetchFilter({
        profession,
        locationProf,
        workLocation,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortPrice,
      })
    );
  };

  //* Función para limpiar los filtros da error, por ahora comentada
  const clearFilters = (e) => {
    e.preventDefault();
    setProfession('');
    setLocationProf('');
    setSortPrice('');
    setPriceRange([1000, 10000]);
    setWorkLocation('');
    dispatch(fetchAds());

    localStorage.setItem('locationProf', '');
    localStorage.setItem('profession', '');
    localStorage.setItem('priceRange', JSON.stringify([1000, 10000]));
    localStorage.setItem('workLocation', '');
    localStorage.setItem('sortPrice', '');
  };

  //* Función para abrir el chat
  // Función para alternar la visibilidad del  chat
  const toggleChat = () => {
    setChatOpen(true);
  };

  const onClose = () => {
    setChatOpen(false);
  };

  //* Función de comparación para ordenar por la primera letra
  function sortByFirstLetter(a, b) {
    const firstLetterA = a.charAt(0).toUpperCase();
    const firstLetterB = b.charAt(0).toUpperCase();

    if (firstLetterA < firstLetterB) {
      return -1;
    }
    if (firstLetterA > firstLetterB) {
      return 1;
    }
    return 0; // Las letras son iguales
  }

  //* constantes para el filtro por profesion y ubicación
  const uniqueProfessions = [...new Set(ads.map((ad) => ad.profession))];
  const uniqueLocations = [...new Set(ads.map((ad) => ad.location))];
  //* Ordenar alfabéticamente por la primera letra
  uniqueProfessions.sort(sortByFirstLetter);
  uniqueLocations.sort(sortByFirstLetter);

  //* useEffect para actualizar el estado de los anuncios
  useEffect(() => {
    dispatch(locationUser(location.pathname));
    if (isAuthenticated) {
      dispatch(fetchUserLoginWithGoogle({ email: user.email }));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (adsFiltered.length < 1) {
      dispatch(fetchAds());
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Cover className={styles.cover} />
      <Navbar setContainerLogin={setContainerLogin} />

      <div className={styles.container111}>
        {containerLogin ? (
          <Login setContainerLogin={setContainerLogin} />
        ) : null}
        <button
          onClick={() => setMenuVisible(!menuVisible)}
          className={styles.btnHamburguer}
        >
          <RiMenuSearchFill className={styles.btnAbrir} />
        </button>
        <ul className={menuVisible ? styles.ulVisible : styles.filterStyle}>
          <div className={styles.contProfesionales}>
            <div className={styles.contenedorSelect}>
              <div className={styles.contentselect}>
                <select
                  className={styles.selectCss}
                  id="ProfesionSearch"
                  value={profession}
                  onChange={handleProfession}
                >
                  {profession === '' && (
                    <option value="DEFAULT">Elige una profesión</option>
                  )}

                  {uniqueProfessions.map((profession, id) => (
                    <option key={id} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>

                <select
                  className={`${styles.selectCss} ${styles.selCity}`}
                  id="LocationSearch"
                  value={locationProf}
                  onChange={handleLocation}
                >
                  <option value="">Elige una ciudad</option>
                  {uniqueLocations.map((locations, id) => (
                    <option key={id} value={locations}>
                      {locations}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.contPrecios}>
            <div className={styles.contMinMax}>
              <span className={styles.minMax}>min: ${priceRange[0]}</span>
              <span className={styles.minMax}>Max: ${priceRange[1]}</span>
            </div>
            <Slider
              trackStyle={{ backgroundColor: 'orange', height: 4 }}
              railStyle={{ backgroundColor: '#3b7ba4', height: 4 }}
              handleStyle={{
                borderColor: '#1a659a',
                height: 10,
                width: 10,
                marginLeft: 0,
                marginTop: -3,
                backgroundColor: '#ffffff',
              }}
              range
              min={1000}
              max={10000}
              step={100}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
          </div>

          <div className={styles.contOrdenar}>
            <select
              className={`${styles.selectCss} ${styles.selectOrder}`}
              id="sortPrice"
              value={sortPrice}
              onChange={handlesortPrice}
            >
              <option value="">Precio</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

          <div className={styles.contRemoto}>
            <select
              className={`${styles.selectCss} ${styles.selectRemoto}`}
              id="workLocation"
              value={workLocation}
              onChange={handleRemoteWork}
            >
              <option value="">Modalidad</option>
              <option value="Remoto">Remoto</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>
          <div className={styles.contButtons}>
            <div className={styles.contButton}>
              <button className={styles.applyFilter} onClick={applyFilters}>
                <MdPersonSearch
                  style={{
                    fontSize: '2em',
                    marginLeft: '-0.7rem',
                    marginTop: '-0.4rem',
                  }}
                />
              </button>
            </div>
            <div className={styles.contClear}>
              <button
                className={`${styles.applyFilter} ${styles.clear}`}
                onClick={clearFilters}
              >
                <IoMdRefresh
                  style={{
                    fontSize: '2em',
                    marginLeft: '-0.85rem',
                    marginTop: '-0.3rem',
                  }}
                />
              </button>
            </div>
          </div>
        </ul>
        <div className={styles.container}>
          {isLoading ? (
            <div>
              <Loading />
            </div>
          ) : currentAds.length !== 0 ? (
            <div className={styles.card}>
              {currentAds.map((ad) => (
                <Professional
                  key={ad._id}
                  id={ad._id}
                  name={ad.creator[0].name}
                  lastName={ad.creator[0].lastName}
                  location={ad.location}
                  description={ad.description}
                  price={ad.price}
                  profession={ad.profession}
                  image={ad.creator[0].image}
                  setContainerLogin={setContainerLogin}
                />
              ))}
            </div>
          ) : adsFiltered.length !== 0 ? (
            <div className={styles.card}>
              {adsFiltered.map((ad) => (
                <Professional
                  key={ad._id}
                  id={ad._id}
                  name={ad.creator[0].name}
                  lastName={ad.creator[0].lastName}
                  location={ad.location}
                  description={ad.description}
                  price={ad.price}
                  profession={ad.profession}
                  image={ad.creator[0].image}
                  setContainerLogin={setContainerLogin}
                />
              ))}
            </div>
          ) : (
            <div>
              <img src={Obrero} alt="Obrero" style={{ width: '400px' }} />
              <h2
                style={{
                  paddingLeft: '1.5em',
                  paddingBottom: '5em',
                }}
              >
                No se encontraron Anuncios
              </h2>
            </div>
          )}
        </div>
        {currentAds.length !== 0 || adsFiltered.length !== 0 ? (
          <Pagination
            className={styles.paginado}
            currentPage={currentPage}
            adsPerPage={adsPerPage}
            totalAds={adsFiltered.length}
            onPageChange={paginate}
            currentAds={currentAds}
          />
        ) : null}
        <div className={styles.buttonContainer}>
          <ButtonTop />
        </div>
      </div>
      <div className={styles.footer}>
        {' '}
        <Footer />
        <button className={styles.btnChat}>
          {chatOpen ? (
            <FaWindowClose style={{ fontSize: '2em' }} onClick={onClose} />
          ) : (
            <IoIosChatbubbles
              style={{ fontSize: '2em' }}
              onClick={toggleChat}
            />
          )}
        </button>
        {chatOpen && (
          <Chat nickname={nickname} imageUser={imageUser} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default Home;
