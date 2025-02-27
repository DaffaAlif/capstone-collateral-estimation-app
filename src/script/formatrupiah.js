function formatRupiah(number) {
    if (typeof number !== "number") {
        return "Invalid input";
    }
    return 'Rp ' + number.toLocaleString('id-ID');
}


export default formatRupiah