function FilterForm({ filter, onFilterChange }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        Filter by title:{' '}
        <input
          type="text"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Type to filter..."
        />
      </label>
    </form>
  )
}

export default FilterForm
