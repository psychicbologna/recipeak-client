validateName(fieldValue) {
  const name = this.state.name.value.trim();
  if (name.length === 0) {
    return 'Name is required';
  } else if (name.length < 3) {
    return 'Name must be at least 3 characters long';
  }
}