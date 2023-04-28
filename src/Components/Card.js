import React, { useState } from "react";
import Modal from "./Modal";

const Card = ({ book }) => {
  // useState kullanarak seçili kitap state'ini tanımlıyoruz
  const [selectedBook, setSelectedBook] = useState(null);

  // Modal'ı açmak için kullanacağımız fonksiyon
  const openModal = (book) => {
    setSelectedBook(book); // seçili kitap state'ini güncelliyoruz
  };

  // Modal'ı kapatmak için kullanacağımız fonksiyon
  const closeModal = () => {
    setSelectedBook(null); // seçili kitap state'ini null'a eşitliyoruz
  };

  return (
    <>
      {book.map((item) => {
        // resim ve fiyat verilerini alıyoruz
        let thumbnail =
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        let amount =
          item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        // resim ve fiyat verileri tanımlıysa, kartı render ediyoruz
        if (thumbnail !== undefined && amount !== undefined) {
          return (
            <div className="card" key={item.id}>
              <img src={thumbnail} alt="" />
          
                <h3 className="title">{item.volumeInfo.title}</h3>
                {/* Detay butonunu ekliyoruz */}
                <button className="detail-button" onClick={() => openModal(item)}>
                  Detail
                </button>
    
            </div>
          );
        }
      })}
      {/* Modal component'ini render ediyoruz ve props olarak show, item ve onClose gönderiyoruz */}
      {selectedBook && <Modal show={true} item={selectedBook} onClose={closeModal} />}
    </>
  );
};

export default Card;
