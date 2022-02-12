const checkFields = (fields) => (
  fields.reduce((ok, field) => !!field && typeof field === 'string' && ok, true)
);

export default checkFields;
