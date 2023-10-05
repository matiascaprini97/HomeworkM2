import SearchBar from "../SearchBar/SearchBar"

const Nav = ({ onSearch }) => {
    return (
        <div>
            <SearchBar onSearch={onSearch} />
            <button onClick={() => onSearch('random')}>Aleatorio</button>
        </div>
    )
}

export default Nav