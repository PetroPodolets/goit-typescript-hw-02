import { useEffect, useRef, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import { getGallery } from './gallery-api'
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import "./App.css"


function App() {

  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      if (searchQuery.trim() === "") {
        return;
      }
      setError(false);
      try {
        setIsLoading(true);
        const data = await getGallery(searchQuery, page);
        if (data.length === 0) {
          setError(true);
        } else {
          setGallery((prevState) => [...prevState, ...data]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGallery();
  }, [page, searchQuery]);

  const handleSearch = (topic) => {
    setSearchQuery(topic);
    setPage(1);
    setGallery([]);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (gallery.length <= 12) {
      return;
    }
    if (loadMoreButtonRef.current) {
      const loadMoreButtonRect = loadMoreButtonRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + loadMoreButtonRect.top,
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [gallery]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }


  return (
    <div className='app'>
      <SearchBar onSearch={handleSearch} />

      {error ? <ErrorMessage /> : gallery.length > 0 && <ImageGallery items={gallery} onOpen={openModal} />}

      {isLoading && <Loader />}

      {gallery.length > 11 && <LoadMoreBtn onRef={loadMoreButtonRef} onAdd={handleLoadMore} />}

      <ImageModal open={modalIsOpen} selectedImage={selectedImage} onClose={closeModal} />
    </div>
  );
}

export default App;
