function formatRupiah(number) {
    if (typeof number !== "number") {
        return "Invalid input";
    }
    return 'Rp ' + number.toLocaleString('id-ID');
}

// Example usage
console.log(formatRupiah(1000000)); // Output: Rp 1.000.000

export default formatRupiah