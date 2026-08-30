function parsePrice(str) {
  return Number((str || '').replace(/\D/g, '')) || 0;
}

function filterMotels(allMotels, { state, keyword }) {
  return allMotels.filter(m => {
    if ((m.Tinhtrang || '').trim().toLowerCase() !== 'còn trống') return false;

    if (state.loai && m.Loai !== state.loai) return false;

    if (state.gia) {
      const maxPrice = Number(state.gia);
      const price = parsePrice(m.Gia);
      if (price > maxPrice) return false;
    }

    // if (state.phongtrong) {
    //   const minRooms = Number(state.phongtrong);
    //   const rooms = Number(m.PhongTrong) || 0;
    //   if (rooms < minRooms) return false;
    // }

    if (keyword) {
      const haystack = `${m.Content} ${m.Loai}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }

    return true;
  });
}

module.exports = { filterMotels, parsePrice };