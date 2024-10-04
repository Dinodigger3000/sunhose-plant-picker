function MinMaxForm() {
  return (
    <>
      <label for="customRange2" class="form-label">
        Sunlight
      </label>
      <input
        type="range"
        class="form-range"
        min="0"
        max="5"
        id="customRange2"
      ></input>
    </>
  );
}

export default MinMaxForm;
