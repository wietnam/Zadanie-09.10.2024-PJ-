import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

// Styled Components dla formularza
const WrapperFormularza = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const PoleTekstowe = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PoleWybieralne = styled.select`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Przycisk = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const KomunikatOBledzie = styled.p`
  color: red;
  font-size: 14px;
`;

const App = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [kraje, ustawKraje] = useState([]);
  
  const wyslijDane = dane => {
    console.log(dane);
  };

  // Pobieranie listy krajów z API
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(dane => {
        const listaKrajow = dane.map(kraj => ({
          nazwa: kraj.name.common,
          flaga: kraj.flags.svg
        }));
        ustawKraje(listaKrajow);
      })
      .catch(error => console.error('Błąd podczas pobierania krajów:', error));
  }, []);

  return (
    <WrapperFormularza>
      <form onSubmit={handleSubmit(wyslijDane)}>
        <h2>Rejestracja</h2>

        {/* Imię */}
        <label>Imię</label>
        <PoleTekstowe 
          {...register("imie", { required: true, minLength: 2, pattern: /^[A-Za-z]+$/i })}
        />
        {errors.imie && <KomunikatOBledzie>Imię musi mieć przynajmniej 2 znaki i nie zawierać cyfr ani znaków specjalnych.</KomunikatOBledzie>}

        {/* Nazwisko */}
        <label>Nazwisko</label>
        <PoleTekstowe 
          {...register("nazwisko", { required: true, minLength: 2, pattern: /^[A-Za-z]+$/i })}
        />
        {errors.nazwisko && <KomunikatOBledzie>Nazwisko musi mieć przynajmniej 2 znaki i nie zawierać cyfr ani znaków specjalnych.</KomunikatOBledzie>}

        {/* Email */}
        <label>Email</label>
        <PoleTekstowe 
          {...register("email", { required: true, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/i })}
        />
        {errors.email && <KomunikatOBledzie>Podaj poprawny adres email.</KomunikatOBledzie>}

        {/* Hasło */}
        <label>Hasło</label>
        <PoleTekstowe 
          type="password"
          {...register("haslo", { 
            required: true, 
            minLength: 8, 
            pattern: /^(?=.*\d{2,})(?=.*[!@#$%^&*]{3,}).*$/i 
          })}
        />
        {errors.haslo && <KomunikatOBledzie>Hasło musi mieć przynajmniej 8 znaków, zawierać co najmniej 2 cyfry i 3 znaki specjalne.</KomunikatOBledzie>}

        {/* Potwierdzenie hasła */}
        <label>Potwierdź hasło</label>
        <PoleTekstowe 
          type="password"
          {...register("potwierdzHaslo", {
            validate: value => value === watch('haslo')
          })}
        />
        {errors.potwierdzHaslo && <KomunikatOBledzie>Hasła muszą być identyczne.</KomunikatOBledzie>}

        {/* Wiek */}
        <label>Wiek</label>
        <PoleTekstowe 
          type="number" 
          {...register("wiek", { required: true, min: 18, max: 99 })}
        />
        {errors.wiek && <KomunikatOBledzie>Wiek musi być między 18 a 99.</KomunikatOBledzie>}

        {/* Data urodzenia */}
        <label>Data urodzenia</label>
        <PoleTekstowe 
          type="date" 
          {...register("dataUrodzenia", { required: true })}
        />
        {errors.dataUrodzenia && <KomunikatOBledzie>Data urodzenia musi zgadzać się z podanym wiekiem.</KomunikatOBledzie>}

        {/* Kraj */}
        <label>Kraj</label>
        <PoleWybieralne {...register("kraj", { required: true })}>
          <option value="">Wybierz kraj...</option>
          {kraje.map((kraj, index) => (
            <option key={index} value={kraj.nazwa}>
              {kraj.nazwa} 
            </option>
          ))}
        </PoleWybieralne>
        {errors.kraj && <KomunikatOBledzie>Wybierz kraj.</KomunikatOBledzie>}

        {/* Płeć */}
        <label>Płeć</label>
        <PoleWybieralne {...register("plec")}>
          <option value="">Wybierz...</option>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
          <option value="other">Inna</option>
        </PoleWybieralne>

        {/* Zgody marketingowe */}
        

        {/* Zgoda na regulamin */}
        <label>
          <PoleTekstowe type="checkbox" {...register("zgodaNaRegulamin", { required: true })} />
          Akceptuję regulamin 
        </label> <br></br>
        {errors.zgodaNaRegulamin && <KomunikatOBledzie>Musisz zaakceptować regulamin.</KomunikatOBledzie>}

        <Przycisk type="submit">Zarejestruj się</Przycisk>
      </form>
    </WrapperFormularza>
  );
};

export default App;
