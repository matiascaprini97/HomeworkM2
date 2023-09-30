import Card from './Card';

export default function Cards({ characters }) {
   return (
      <div>
         {characters.map((character) => (
            <Card
               key={character.id}
               name={character.name}
               status={character.status}
               species={character.species}
               gender={character.gendeer}
               origin={character.origin.name}
               image={character.image}
               oneClose={() => window.alert('Emulamos que se cierra la card')}
            />
         ))}
      </div>
   );
}