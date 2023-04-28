import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState(""); // Arama sorgusunu tutmak için state kullanıyoruz
  const [bookData, setBookData] = useState([]); // API'dan gelen kitap verilerini tutmak için state kullanıyoruz
  const [isSearched, setIsSearched] = useState(false); // Kullanıcının arama yaptığı zamanı takip etmek için state kullanıyoruz
  const key = "AIzaSyCLyLUfvEIv_KC9kmTb1NiNC4B7vpHqBc0"; // Google Books API key'imiz

  // Arama butonuna tıklandığında veya Enter tuşuna basıldığında çağrılacak fonksiyon
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}&maxResults=40`
      ); // Google Books API'dan kitap verilerini getiriyoruz
      setBookData(response.data.items); // Gelen verileri state'e kaydediyoruz
      setIsSearched(true); // Kullanıcının arama yaptığını belirtmek için state'i true yapıyoruz
    } catch (error) {
      console.log(error); // Hata oluşursa consola yazdırıyoruz
    }
  };
  
  // Klavyeden Enter tuşuna basıldığında çağrılacak fonksiyon
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Arama fonksiyonunu çağırıyoruz
    }
  };

  // Arama inputu değiştiğinde çağrılacak fonksiyon
  const handleChange = (event) => {
    setSearch(event.target.value); // Arama sorgusunu state'e kaydediyoruz
  };

  // Ana sayfa butonuna tıklandığında çağrılacak fonksiyon
  const handleClear = () => {
    setIsSearched(false); // Arama yapılmadığını belirtmek için state'i false yapıyoruz
    setSearch(""); // Arama sorgusunu boşaltıyoruz
  }

  return (
    <>
      <div className="header">
        <div className="row2">
          <h2>Book Search</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onFocus={(e) => e.target.placeholder = ''}
              onBlur={(e) => e.target.placeholder = 'Enter Your Book Name'}
            />
            <button onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          {isSearched && (
            <button className="home" onClick={handleClear}>Home</button>
          )}
        </div>
      </div>
  
      {isSearched ? (
        <div className="container">
        {bookData && bookData.length > 0 ? <Card book={bookData} /> : <p className="message">Book is not found.</p>}
        </div>
      ) : null}
    </>
  );
      }  

export default Home;
