import Card from "../Card/Card.jsx";

const Cards = ({ characters, onClose }) => {
   return (
      <div>
         {characters.map((character) => (
            <Card
               key={character.id}
               id={character.id}
               name={character.name}
               status={character.status}
               species={character.species}
               gender={character.gendeer}
               origin={character.origin.name}
               image={character.image}
               onClose={onClose}
            />
         ))}
      </div>
   );
}

export default Cards;