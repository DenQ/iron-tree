/**
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */
module.exports = function compareById(vector) {
  return (a, b) => {
    const aid = Number(a.get('id'));
    const bid = Number(b.get('id'));
    if (aid > bid) {
      return vector ? 1 : -1;
    } else if (aid < bid) {
      return vector ? -1 : 1;
    } else {
      return 0
    }
  };
}
