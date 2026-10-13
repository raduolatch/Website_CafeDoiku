document.addEventListener('alpine:init', () => {

  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Nasi Goreng', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Kopi', img: '2.jpg', price: 8000 },
      { id: 3, name: 'Ayam Bakar', img: '3.jpg', price: 20000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      // cek apakah ada barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada

      if(!cartItem){
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;

      } else{
        // JIKA BARANG DAH ADA 
        this.items = this.items.map((item) => {
          // jika barang berbeda 
          if(item.id != newItem.id) {
            return item;
          } else {
            // jika barang sudah ada,tambah jual dan tota;
            item.quantity++;
            item.total = item.price * item.quantity
            this.quantity++;
            this.total += item.price;
            return item;
          }
        })
      }
      
    },

    remove(id) {
      // ambil item yang mau di remove

      const cartItem = this.items.find((item) => item.id === id);
      // jika item lebih dari 1

      if(cartItem.quantity > 1){
        // telusuri satu satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang did klik
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1){
        // jika barangnya sisa 1 
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },

  });
});

// helper rupiah (WAJIB window)
window.rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
