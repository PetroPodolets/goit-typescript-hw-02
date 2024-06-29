import React, { useEffect, useRef, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { getGallery } from './gallery-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import "./App.css";


interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

const App: React.FC = () => {
  const [gallery, setGallery] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchGallery = async () => {
      if (searchQuery.trim() === "") {
        return;
      }
      setError(false);
      try {
        setIsLoading(true);
        const data: Image[] = await getGallery(searchQuery, page);
        if (data.length === 0) {
          setError(true);
        } else {
          setGallery((prevGallery) => [...prevGallery, ...data]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [page, searchQuery]);

  const handleSearch = (topic: string) => {
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
      });
    }
  }, [gallery]);

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='app'>
      <SearchBar onSearch={handleSearch} />

      {error ? <ErrorMessage /> : gallery.length > 0 && <ImageGallery items={gallery} onOpen={openModal} />}

      {isLoading && <Loader />}

      {gallery.length > 11 && <LoadMoreBtn onRef={loadMoreButtonRef} onAdd={handleLoadMore} />}

      <ImageModal open={modalIsOpen} selectedImage={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default App;
