import './styles.css'

export const TextInput = ({ searchValue, HandleChange }) => {
    return (

        <input
            className='text-input'
            type="search"
            onChange={HandleChange}
            value={searchValue}
            placeholder="Type your search"
        />
    );
}