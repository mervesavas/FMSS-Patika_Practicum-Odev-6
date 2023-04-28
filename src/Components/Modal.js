import React, { useState } from 'react';

// Modal component'i için, gösterilip gösterilmemesine karar vermek için show prop'u alınır.
// Kapatma işlemi için onClose fonksiyonu prop olarak verilir.
// Seçili kitabın özellikleri item prop'u olarak alınır.
const Modal = ({ show, item, onClose }) => {
  const [showFullDescription, setShowFullDescription] = useState(false); // useState hook'u kullanılarak tam açıklamanın gösterilip gösterilmeyeceği kontrol edilir.

  // Resim ve açıklama verileri, item prop'u kullanılarak alınır.
  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let description = item.volumeInfo.description.slice(0, 500);  // Eğer açıklama 500 karakterden daha uzunsa, açıklamanın sadece ilk 500 karakteri gösterilir.

  // Tam açıklama gösterilmek istenirse handleReadMoreClick fonksiyonu kullanılır.
  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  // show prop'u false ise null döndürülür, değilse Modal component'i render edilir.
  if (!show) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="overlay-inner">
        <button className="close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="inner-box">
          <img src={thumbnail} alt="" />
          <div className="info">
            <h1>{item.volumeInfo.title}</h1>
            <h3>{item.volumeInfo.authors}</h3>
            <h4>
              {item.volumeInfo.publisher}
              <span>{item.volumeInfo.publishedDate}</span>
            </h4>
            <br />
            <div className="description-wrapper" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <div className="description">
            {description}
          </div>
          {!showFullDescription && description && description.length >= 200 && (
            <button onClick={handleReadMoreClick}>
              Read More
            </button>
          )}
          {showFullDescription && (
            <div className="description">
              {item.volumeInfo.description}
            </div>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
