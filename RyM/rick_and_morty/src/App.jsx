import { useState } from 'react';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import axios from 'axios'


function App() {
   const [characters, setCharacters] = useState([]);
   const onSearch = (id) => {
      const exists = characters.find(char => char.id === Number(id));
      if (id === 'random') {
         // Fetch random character
         const randomId = Math.floor(Math.random() * 826 + 1);

         axios(`https://rickandmortyapi.com/api/character/${randomId}`)
            .then(({ data }) => {
               if (data.name) {
                  setCharacters((oldChars) => [...oldChars, data]);
               } else {
                  window.alert('¡No hay personajes con este ID!');
               }
            });
      }
      if (exists) {
         window.alert('Character already exists');
         return;
      }

      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      setCharacters(
         characters.filter((char) => {
            return char.id !== Number(id);
         })
      )
   }



   return (
      <div className='App'>
         <Nav onSearch={onSearch} />
         <Cards characters={characters} onClose={onClose} />
      </div>
   );
}

export default App;
