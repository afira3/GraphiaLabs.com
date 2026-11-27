const OFFICIAL_WA_LINK = "https://wa.me/message/T4YRUJWSOJTSH1";

let initialProducts = [
    { id: 1, title: 'The Midnight Library', author: 'Matt Haig', category: 'Fiksi', price: 98000, stock: 15, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop', status: 'sale', description: 'Di antara hidup dan mati terdapat sebuah perpustakaan...', reviews: [{name: 'Budi S.', stars: 5, comment: 'Buku yang sangat menginspirasi!'}] },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', price: 108000, stock: 8, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop', status: 'diskon', description: 'Atomic Habits menawarkan kerangka kerja yang terbukti...', reviews: [{name: 'Dika', stars: 5, comment: 'Sangat mengubah cara pandang kebiasaan kecil.'}] }
];

// DATA PAKET TERBIT AWAL
let initialTerbitPackages = [
    {
        id: 101,
        name: 'PAKET BIASA',
        originalPrice: 350000,
        discountLabel: 'Diskon 10%',
        price: 315000,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop',
        features: [
            'Naskah Fix dari Penulis',
            'QRCBN',
            'Desain Cover Standar',
            'Desain Layout Rapi',
            '1 eksemplar Buku Terbit',
            'E-Sertifikat'
        ],
        specs: 'Maksimal 25.000 kata\nMaksimal 150 halaman ukuran A5',
        promoNote: 'Dipromosikan di media sosial penerbit'
    },
    {
        id: 102,
        name: 'PAKET LUAR BIASA',
        originalPrice: 575000,
        discountLabel: 'Diskon 10%',
        price: 520000,
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop',
        features: [
            'Naskah Fix dari Penulis',
            'QRCBN',
            'Desain Cover Premium',
            'Desain Layout Premium',
            'Desain Bookmark',
            '2 eksemplar Buku Terbit',
            'E-Sertifikat',
            'Flyer Promosi'
        ],
        specs: 'Maksimal 40.000 kata\nMaksimal 250 halaman ukuran A5',
        promoNote: 'Dipromosikan di semua marketplace penerbit'
    },
    {
        id: 103,
        name: 'PAKET MANTAP',
        originalPrice: 850000,
        discountLabel: 'Diskon 15%',
        price: 720000,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop',
        features: [
            'Naskah Fix & Editing Ringan',
            'QRCBN / ISBN Resmi',
            'Desain Cover Eksklusif',
            'Desain Layout Premium',
            'Desain Bookmark & Stiker',
            '5 eksemplar Buku Terbit',
            'E-Sertifikat & Piagam Penulis',
            'Video Trailer & Flyer Promosi'
        ],
        specs: 'Maksimal 65.000 kata\nMaksimal 350 halaman ukuran A5',
        promoNote: 'Dipromosikan prioritas di semua marketplace penerbit'
    }
];

let products = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;
let terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;
let cart = [];
let orders = JSON.parse(localStorage.getItem('gl_orders')) || [];
let terbitOrders = JSON.parse(localStorage.getItem('gl_terbit_orders')) || [];

let paymentMethods = JSON.parse(localStorage.getItem('gl_payment_methods')) || [
    { id: 'bca', name: 'Bank BCA (8830-1928-11 a/n Graphia Labs)', active: true },
    { id: 'qris', name: 'QRIS All Payment (Silakan chat WA untuk pembayaran QRIS)', active: true },
    { id: 'dana', name: 'DANA (0812-3456-7890 a/n Graphia Labs)', active: true },
    { id: 'gopay', name: 'GoPay (0812-3456-7890 a/n Graphia Labs)', active: true },
    { id: 'ovo', name: 'OVO (0812-3456-7890 a/n Graphia Labs)', active: true }
];

let currentUser = JSON.parse(localStorage.getItem('gl_user')) || null;
let isAdminLoggedIn = false;

let chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
let activeChatEmail = null;

let currentActiveBookId = null;
let selectedReviewRating = 5;
let initialCertificates = [
    {
        id: 201,
        title: 'Sertifikat Resmi Penerbitan & Legalitas Graphia Labs',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&auto=format&fit=crop',
        description: 'Sertifikat resmi pengakuan dan standar kualitas layanan penerbitan buku, pengurusan QRCBN/ISBN, serta distribusi karya penulis di Graphia Labs.'
    }
];
let certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;
let currentUploadedProofBase64 = null;
let currentTrbProofBase64 = null;
let currentTrbPkgImageBase64 = null;
let currentCertImageBase64 = null;
let isCertZoomed = false;
let initialPromoBanners = [
    {
        id: 301,
        badge: 'BUKU BARU',
        title: 'Kitab Puisi Pada Akhirnya - Matt Haig',
        originalPrice: 85000,
        discountLabel: 'Diskon 29%',
        price: 60000,
        image: '1000231023.png'
    },
    {
        id: 302,
        badge: 'PROMO TERLARIS',
        title: 'The Midnight Library (Edisi Hardcover)',
        originalPrice: 125000,
        discountLabel: 'Diskon 22%',
        price: 98000,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop'
    },
    {
        id: 303,
        badge: 'RILIS TERBARU',
        title: 'Atomic Habits - Edisi Spesial',
        originalPrice: 135000,
        discountLabel: 'Diskon 20%',
        price: 108000,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop'
    }
];
let promoBanners = JSON.parse(localStorage.getItem('gl_promo_banners')) || initialPromoBanners;
let currentPromoImageBase64 = null;

setInterval(() => {
    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    if (currentUser && document.getElementById('chat-modal').classList.contains('flex')) {
        renderCustomerChatMessages();
    }
    if (isAdminLoggedIn && !document.getElementById('admin-tab-livechat').classList.contains('hidden')) {
        renderAdminChatUsersList();
        if (activeChatEmail) renderAdminChatRoom();
    }
}, 1500);

window.onload = function() {
    renderCatalog();
    renderTerbitPackages();
    renderCertificates();
    renderRunningPromos();
    renderHomeCategories();
    renderCart();
    renderPaymentMethodsOptions();
    updateUserDisplay();
    setupProofFileInput();
    renderAdminProducts();
    renderAdminTerbitPackages();
    renderAdminCertificates();
    renderAdminPromoBanners();
};

function showSection(sectionId) {
    ['home', 'catalog', 'terbit', 'certificate', 'admin'].forEach(sec => {
        const el = document.getElementById(`sec-${sec}`);
        if(el) el.classList.add('hidden');
    });
    document.getElementById(`sec-${sectionId}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('gl_user');
    updateUserDisplay();
    closeChatModal();
    alert('Anda telah keluar dari akun.');
}

function updateUserDisplay() {
    const container = document.getElementById('user-auth-btn-container');
    const mobileContainer = document.getElementById('mobile-auth-container');

    if (currentUser) {
        container.innerHTML = `
            <div class="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <i class="fa-regular fa-user text-xs text-brand-700"></i>
                <span class="text-xs font-bold text-slate-800">${currentUser.name}</span>
                <button onclick="logoutUser()" title="Keluar Akun" class="ml-1 text-red-500 hover:text-red-700 text-xs font-bold px-1.5 py-0.5 rounded hover:bg-red-50 transition">
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                </button>
            </div>
        `;
        mobileContainer.innerHTML = `
            <div class="flex items-center justify-between py-2 px-3 bg-slate-100 rounded-lg">
                <span class="font-bold text-sm text-brand-800"><i class="fa-regular fa-user mr-2"></i>${currentUser.name}</span>
                <button onclick="logoutUser(); toggleMobileMenu();" class="text-xs text-red-600 font-bold"><i class="fa-solid fa-right-from-bracket mr-1"></i>Logout</button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button onclick="openAuthModal()" class="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition">
                <i class="fa-regular fa-user text-sm"></i>
                <span>Masuk / Daftar</span>
            </button>
        `;
        mobileContainer.innerHTML = `
            <button onclick="openAuthModal(); toggleMobileMenu();" class="block w-full text-left font-semibold py-2.5 px-3 rounded-lg bg-slate-100 text-brand-800">Masuk / Daftar Akun</button>
        `;
    }
}

function renderHomeCategories() {
    const categories = [
        { name: 'Fiksi', icon: 'fa-book-open', count: '45+ Novel' },
        { name: 'Romance', icon: 'fa-heart', count: '30+ Novel' },
        { name: 'Self-Help', icon: 'fa-brain', count: '20+ Novel' },
        { name: 'Fantasy', icon: 'fa-wand-magic-sparkles', count: '18+ Novel' },
        { name: 'Mystery', icon: 'fa-mask', count: '15+ Novel' },
        { name: 'Semua Novel', icon: 'fa-border-all', count: '100+ Novel' }
    ];

    document.getElementById('home-category-pills').innerHTML = categories.map(cat => `
        <div onclick="showSection('catalog'); filterCategoryDirect('${cat.name === 'Semua Novel' ? 'ALL' : cat.name}')" class="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition cursor-pointer group hover:border-brand-600">
            <div class="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center text-lg mx-auto mb-2 group-hover:bg-brand-800 group-hover:text-white transition"><i class="fa-solid ${cat.icon}"></i></div>
            <div class="font-bold text-xs text-slate-800">${cat.name}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">${cat.count}</div>
        </div>
    `).join('');
}

function filterCategoryDirect(cat) {
    document.getElementById('category-select').value = cat;
    filterProducts();
}

// RENDER KATALOG PAKET TERBIT
function renderTerbitPackages() {
    const grid = document.getElementById('terbit-packages-grid');
    if(!grid) return;

    terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;

    grid.innerHTML = terbitPackages.map((pkg, idx) => {
        const isFeatured = idx === 1 || pkg.name.toUpperCase().includes('LUAR BIASA');
        const featuresList = (pkg.features || []).map(f => `
            <li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 py-1 border-b border-dashed border-slate-200 last:border-0">
                <span class="text-amber-500 mt-0.5">✨</span>
                <span class="font-medium">${f}</span>
            </li>
        `).join('');

        const specsLines = (pkg.specs || '').split('\n').map(line => `<div class="text-xs font-semibold text-brand-800">${line}</div>`).join('');

        return `
            <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition border-2 ${isFeatured ? 'border-amber-400 relative ring-4 ring-amber-400/15' : 'border-slate-200'} flex flex-col justify-between">
                ${isFeatured ? `<div class="bg-amber-400 text-brand-900 text-[10px] font-extrabold uppercase tracking-widest text-center py-1.5">⭐ Paling Diminati Penulis</div>` : ''}
                
                <div>
                    <!-- Foto Banner Paket -->
                    <div class="relative h-44 bg-brand-900 overflow-hidden">
                        <img src="${pkg.image || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600'}" onerror="this.src='https://placehold.co/600x300/0f2b66/ffffff?text=Paket+Terbit'" alt="${pkg.name}" class="w-full h-full object-cover opacity-85">
                        <div class="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent"></div>
                        <div class="absolute bottom-3 inset-x-4 text-center">
                            <span class="inline-block px-5 py-1.5 rounded-full border-2 border-white/80 bg-white/95 text-brand-900 font-serif font-extrabold text-base sm:text-lg tracking-wide shadow">
                                ${pkg.name}
                            </span>
                        </div>
                    </div>

                    <!-- Blok Harga & Diskon -->
                    <div class="p-6 text-center bg-slate-50 border-b border-slate-200">
                        ${pkg.originalPrice && pkg.originalPrice > pkg.price ? `
                            <div class="inline-flex flex-col items-center">
                                <span class="bg-slate-600 text-white text-xs font-bold px-3 py-0.5 rounded line-through">
                                    Rp ${Number(pkg.originalPrice).toLocaleString('id-ID')}
                                </span>
                                ${pkg.discountLabel ? `<span class="bg-rose-100 text-rose-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full -mt-1 border border-rose-200">${pkg.discountLabel}</span>` : ''}
                            </div>
                        ` : ''}
                        <div class="text-3xl font-extrabold text-brand-900 mt-1">
                            Rp ${Number(pkg.price).toLocaleString('id-ID')}
                        </div>
                    </div>

                    <!-- List Fasilitas Paket -->
                    <div class="p-6">
                        <ul class="space-y-1 mb-5">
                            ${featuresList}
                        </ul>

                        <!-- Ketentuan Kata & Halaman -->
                        <div class="bg-brand-50/80 rounded-2xl p-3.5 text-center space-y-1 border border-brand-100">
                            ${specsLines}
                        </div>

                        <!-- Catatan Promo -->
                        ${pkg.promoNote ? `
                            <div class="mt-4 flex items-center justify-center gap-2 text-center text-xs font-bold text-slate-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                                <span>📢</span>
                                <span>${pkg.promoNote}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="p-6 pt-0">
                    <button onclick="openTerbitOrderModal(${pkg.id})" class="w-full ${isFeatured ? 'bg-amber-500 hover:bg-amber-600 text-brand-900' : 'bg-brand-800 hover:bg-brand-900 text-white'} font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm">
                        <i class="fa-solid fa-feather-pointed"></i>
                        <span>Pilih ${pkg.name}</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderCatalog() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    grid.innerHTML = products.map(book => {
        const cartItem = cart.find(item => item.id === book.id);
        const qty = cartItem ? cartItem.qty : 0;
        const isOutOfStock = book.stock <= 0 || book.status === 'sold-out';
        
        let statusBadgeHTML = '';
        if (book.status === 'sold-out') {
            statusBadgeHTML = `<span class="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow">sold out</span>`;
        } else if (book.status === 'diskon') {
            statusBadgeHTML = `<span class="absolute top-3 right-3 bg-amber-500 text-brand-900 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow">diskon</span>`;
        } else if (book.status === 'sale') {
            statusBadgeHTML = `<span class="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow">sale</span>`;
        }

        return `
            <div onclick="openProductModal(${book.id})" class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group cursor-pointer">
                <div>
                    <div class="relative h-64 overflow-hidden bg-slate-100">
                        <img src="${book.image}" onerror="this.src='https://placehold.co/400x500/0f2b66/ffffff?text=Graphia'" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-3 left-3 bg-brand-900/90 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">${book.category}</span>
                        ${statusBadgeHTML}
                        ${isOutOfStock ? `<div class="absolute inset-0 bg-black/60 flex items-center justify-center"><span class="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg">Stok Habis</span></div>` : ''}
                    </div>
                    <div class="p-5">
                        <span class="text-xs text-slate-400 font-semibold">${book.author}</span>
                        <h3 class="font-serif font-bold text-slate-900 text-base leading-snug line-clamp-2 mt-0.5">${book.title}</h3>
                    </div>
                </div>
                <div class="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between" onclick="event.stopPropagation()">
                    <div>
                        <span class="text-[10px] text-slate-400 block font-semibold">Harga</span>
                        <span class="text-base font-extrabold text-brand-900">Rp ${book.price.toLocaleString('id-ID')}</span>
                    </div>
                    ${isOutOfStock ? `<button disabled class="bg-slate-200 text-slate-400 font-bold text-xs px-4 py-2 rounded-xl">Habis</button>` : `
                        <div class="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                            <button onclick="updateCartQty(${book.id}, -1); event.stopPropagation();" class="px-3 py-1.5 hover:bg-slate-200 text-slate-700 font-bold">-</button>
                            <span class="px-2.5 text-xs font-bold text-slate-800">${qty}</span>
                            <button onclick="updateCartQty(${book.id}, 1); event.stopPropagation();" class="px-3 py-1.5 hover:bg-slate-200 text-slate-700 font-bold">+</button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-select').value;
    const allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;

    products = allProds.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(query) || p.author.toLowerCase().includes(query);
        const matchesCat = category === 'ALL' || p.category === category;
        return matchesSearch && matchesCat;
    });
    renderCatalog();
}

function updateCartQty(bookId, delta) {
    const book = (JSON.parse(localStorage.getItem('gl_products')) || initialProducts).find(p => p.id === bookId);
    if (!book) return;

    let item = cart.find(i => i.id === bookId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== bookId);
        else if (item.qty > book.stock) { item.qty = book.stock; }
    } else if (delta > 0) {
        cart.push({ id: book.id, title: book.title, price: book.price, image: book.image, qty: 1 });
    }
    renderCatalog();
    renderCart();
}

function renderCart() {
    const badge = document.getElementById('cart-badge');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalQty;
    totalQty > 0 ? badge.classList.remove('scale-0') : badge.classList.add('scale-0');

    const container = document.getElementById('cart-items-container');
    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-slate-400"><i class="fa-solid fa-cart-flatbed text-4xl mb-3"></i><p class="text-sm">Keranjang kosong.</p></div>`;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="py-4 flex items-center gap-3">
                <img src="${item.image}" class="w-14 h-18 object-cover rounded-lg border">
                <div class="flex-grow">
                    <h4 class="font-bold text-xs text-slate-800 line-clamp-1">${item.title}</h4>
                    <div class="text-xs text-brand-800 font-bold mt-1">Rp ${item.price.toLocaleString('id-ID')}</div>
                </div>
                <button onclick="removeCartItem(${item.id})" class="text-red-400 p-2"><i class="fa-solid fa-trash-can text-sm"></i></button>
            </div>
        `).join('');
    }
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cart-total-price').innerText = `Rp ${totalAmount.toLocaleString('id-ID')}`;
    document.getElementById('checkout-total-val').innerText = `Rp ${totalAmount.toLocaleString('id-ID')}`;
}

function removeCartItem(bookId) {
    cart = cart.filter(i => i.id !== bookId);
    renderCatalog();
    renderCart();
}

function openProductModal(bookId) {
    currentActiveBookId = bookId;
    const allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;
    const book = allProds.find(p => p.id === bookId);
    if (!book) return;

    document.getElementById('detail-img').src = book.image;
    document.getElementById('detail-category').innerText = book.category;
    document.getElementById('detail-title').innerText = book.title;
    document.getElementById('detail-author').innerText = book.author;
    document.getElementById('detail-price').innerText = `Rp ${book.price.toLocaleString('id-ID')}`;
    document.getElementById('detail-desc').innerText = book.description || '-';

    renderBookReviews(book);
    setSelectRating(5);
    document.getElementById('product-detail-modal').classList.remove('hidden');
}

function renderBookReviews(book) {
    const container = document.getElementById('detail-reviews');
    const reviews = book.reviews || [];

    if (reviews.length === 0) {
        container.innerHTML = `<div class="text-xs text-slate-400 italic">Belum ada ulasan untuk buku ini. Jadilah yang pertama memberikan ulasan!</div>`;
    } else {
        container.innerHTML = reviews.map(r => `
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-slate-800">${r.name}</span>
                    <div class="text-yellow-400 flex gap-0.5">
                        ${Array.from({length: 5}).map((_, i) => `<i class="${i < r.stars ? 'fa-solid' : 'fa-regular'} fa-star"></i>`).join('')}
                    </div>
                </div>
                <p class="text-slate-600">${r.comment}</p>
            </div>
        `).join('');
    }
}

function setSelectRating(stars) {
    selectedReviewRating = stars;
    const starEls = document.querySelectorAll('#star-rating-selector i');
    starEls.forEach((el, index) => {
        el.className = index < stars ? 'fa-solid fa-star' : 'fa-regular fa-star';
    });
}

function handleAddReview(e) {
    e.preventDefault();
    if (!currentUser) {
        openAuthModal();
        alert('Silakan masuk akun terlebih dahulu untuk memberikan ulasan.');
        return;
    }

    const comment = document.getElementById('review-comment-input').value.trim();
    if (!comment || !currentActiveBookId) return;

    let allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;
    const bookIndex = allProds.findIndex(p => p.id === currentActiveBookId);
    if (bookIndex !== -1) {
        if (!allProds[bookIndex].reviews) allProds[bookIndex].reviews = [];
        allProds[bookIndex].reviews.unshift({
            name: currentUser.name,
            stars: selectedReviewRating,
            comment: comment
        });
        localStorage.setItem('gl_products', JSON.stringify(allProds));
        products = allProds;

        renderBookReviews(allProds[bookIndex]);
        document.getElementById('review-comment-input').value = '';
        alert('Terima kasih! Ulasan Anda berhasil ditambahkan.');
    }
}

function closeProductModal() { document.getElementById('product-detail-modal').classList.add('hidden'); }
function toggleCartDrawer() { document.getElementById('cart-drawer').classList.toggle('hidden'); }

function openCheckoutModal() {
    if (cart.length === 0) { alert('Keranjang kosong!'); return; }
    toggleCartDrawer();
    document.getElementById('checkout-modal').classList.remove('hidden');
    handlePaymentMethodChange();
}

function closeCheckoutModal() { document.getElementById('checkout-modal').classList.add('hidden'); }

function renderPaymentMethodsOptions() {
    const activeMethods = paymentMethods.filter(m => m.active).map(m => `<option value="${m.name}">${m.name}</option>`).join('');
    const selectEl = document.getElementById('cust-payment-method');
    const trbSelectEl = document.getElementById('trb-cust-payment');
    if(selectEl) selectEl.innerHTML = activeMethods;
    if(trbSelectEl) trbSelectEl.innerHTML = activeMethods;
    handlePaymentMethodChange();
}

function handlePaymentMethodChange() {
    const selectEl = document.getElementById('cust-payment-method');
    if(!selectEl) return;
    const val = selectEl.value;
    const noteEl = document.getElementById('qris-note-info');
    if (val.toLowerCase().includes('qris')) {
        noteEl.classList.remove('hidden');
    } else {
        noteEl.classList.add('hidden');
    }
}

function setupProofFileInput() {
    const input = document.getElementById('cust-proof-file');
    if (input) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    currentUploadedProofBase64 = evt.target.result;
                    document.getElementById('proof-preview-img').src = currentUploadedProofBase64;
                    document.getElementById('proof-preview-container').classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            } else {
                currentUploadedProofBase64 = null;
                document.getElementById('proof-preview-container').classList.add('hidden');
            }
        });
    }

    const trbInput = document.getElementById('trb-cust-proof');
    if (trbInput) {
        trbInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    currentTrbProofBase64 = evt.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                currentTrbProofBase64 = null;
            }
        });
    }

    const trbPkgFile = document.getElementById('trb-image-file');
    if (trbPkgFile) {
        trbPkgFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    currentTrbPkgImageBase64 = evt.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                currentTrbPkgImageBase64 = null;
            }
        });
    }

    const certFile = document.getElementById('cert-image-file');
    if (certFile) {
        certFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    currentCertImageBase64 = evt.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                currentCertImageBase64 = null;
            }
        });
    }

    const promoFile = document.getElementById('promo-image-file');
    if (promoFile) {
        promoFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    currentPromoImageBase64 = evt.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                currentPromoImageBase64 = null;
            }
        });
    }
}

// PEMESANAN PAKET TERBIT
function openTerbitOrderModal(pkgId) {
    terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;
    const pkg = terbitPackages.find(p => p.id === pkgId);
    if (!pkg) return;

    document.getElementById('trb-order-pkg-id').value = pkg.id;
    document.getElementById('trb-modal-pkg-name').innerText = pkg.name;
    document.getElementById('trb-checkout-total-val').innerText = `Rp ${Number(pkg.price).toLocaleString('id-ID')}`;
    currentTrbProofBase64 = null;
    document.getElementById('terbit-order-modal').classList.remove('hidden');
}

function closeTerbitOrderModal() {
    document.getElementById('terbit-order-modal').classList.add('hidden');
}

function processTerbitOrderPlacement(event) {
    event.preventDefault();
    const pkgId = parseInt(document.getElementById('trb-order-pkg-id').value);
    terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;
    const pkg = terbitPackages.find(p => p.id === pkgId);
    if (!pkg) return;

    const name = document.getElementById('trb-cust-name').value.trim();
    const phone = document.getElementById('trb-cust-phone').value.trim();
    const manuscript = document.getElementById('trb-cust-manuscript').value.trim();
    const address = document.getElementById('trb-cust-address').value.trim();
    const paymentMethod = document.getElementById('trb-cust-payment').value;

    const orderId = 'TRB-' + Math.floor(10000 + Math.random() * 90000);
    const proofStatusStr = currentTrbProofBase64 ? "✅ Foto Bukti Pembayaran Sudah Di-upload" : "❌ Belum Upload Bukti Pembayaran";

    const newTerbitOrder = {
        id: orderId,
        name,
        phone,
        manuscript,
        address,
        packageName: pkg.name,
        total: Number(pkg.price),
        paymentMethod,
        proofImg: currentTrbProofBase64 || null,
        status: 'Diproses Terbit',
        date: new Date().toLocaleString('id-ID')
    };

    terbitOrders.unshift(newTerbitOrder);
    localStorage.setItem('gl_terbit_orders', JSON.stringify(terbitOrders));

    event.target.reset();
    currentTrbProofBase64 = null;
    closeTerbitOrderModal();

    const waMessage = `Halo Admin Graphia Labs, saya mau mendaftar *Paket Terbit Buku*:%0A%0A` +
        `📌 *Order ID:* ${orderId}%0A` +
        `📦 *Paket Dipilih:* ${pkg.name}%0A` +
        `👤 *Nama Penulis:* ${name}%0A` +
        `📱 *Nomor WhatsApp:* ${phone}%0A` +
        `📖 *Judul Naskah:* ${manuscript}%0A` +
        `🏠 *Alamat Kirim Buku:* ${address}%0A` +
        `💳 *Metode Pembayaran:* ${paymentMethod}%0A` +
        `📸 *Bukti Pembayaran:* ${proofStatusStr}%0A` +
        `💰 *Total Biaya:* Rp ${Number(pkg.price).toLocaleString('id-ID')}`;

    const waUrl = `${OFFICIAL_WA_LINK}?text=${waMessage}`;

    alert(`🎉 Pendaftaran Paket Terbit Berhasil!\n\nOrder ID: ${orderId}\nData Anda telah masuk ke Log Google Sheets Khusus Pembeli Terbit.\n\nAnda akan diarahkan ke WhatsApp Admin.`);
    window.open(waUrl, '_blank');
}

function processOrderPlacement(event) {
    event.preventDefault();
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const paymentMethod = document.getElementById('cust-payment-method').value;

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsSummary = cart.map(i => `${i.title} (${i.qty}x)`).join(', ');
    const proofStatusStr = currentUploadedProofBase64 ? "✅ Foto Bukti Pembayaran Sudah Di-upload" : "❌ Belum Upload Bukti Pembayaran";

    const newOrder = { 
        id: orderId, 
        name, 
        phone, 
        address, 
        items: itemsSummary, 
        total: totalAmount, 
        paymentMethod, 
        proofImg: currentUploadedProofBase64 || null,
        status: 'Diproses', 
        date: new Date().toLocaleString('id-ID') 
    };

    orders.unshift(newOrder);
    localStorage.setItem('gl_orders', JSON.stringify(orders));

    cart = [];
    currentUploadedProofBase64 = null;
    document.getElementById('proof-preview-container').classList.add('hidden');
    renderCart();
    renderCatalog();
    closeCheckoutModal();

    const waMessage = `Halo Admin Graphia Labs, saya mau konfirmasi pesanan novel:%0A%0A` +
        `📌 *Order ID:* ${orderId}%0A` +
        `👤 *Nama Lengkap Pemesan:* ${name}%0A` +
        `📱 *Nomor WhatsApp:* ${phone}%0A` +
        `🏠 *Alamat Lengkap Pengiriman:* ${address}%0A` +
        `💳 *Pilih Metode Pembayaran:* ${paymentMethod}%0A` +
        `📸 *Upload Bukti Pembayaran:* ${proofStatusStr}%0A` +
        `📚 *Buku Dibeli:* ${itemsSummary}%0A` +
        `💰 *Total Pembayaran:* Rp ${totalAmount.toLocaleString('id-ID')}`;

    const waUrl = `${OFFICIAL_WA_LINK}?text=${waMessage}`;

    alert(`🎉 Pesanan Berhasil dibuat!\n\nOrder ID: ${orderId}\nData pesanan & foto bukti pembayaran telah tersimpan ke Google Sheets admin.\n\nAnda akan langsung diarahkan ke WhatsApp.`);
    window.open(waUrl, '_blank');
}

// RENDER SERTIFIKAT GRAPHIA LABS & FITUR ZOOM
function renderCertificates() {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;
    certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;

    if (certificates.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center text-slate-400 italic py-10">Belum ada sertifikat yang ditampilkan.</div>`;
        return;
    }

    grid.innerHTML = certificates.map(cert => `
        <div class="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
            <div onclick="openCertZoomModal(${cert.id})" class="relative bg-slate-900 overflow-hidden cursor-zoom-in h-72 sm:h-80 flex items-center justify-center">
                <img src="${cert.image}" onerror="this.src='https://placehold.co/800x600/0f2b66/ffffff?text=Sertifikat+Graphia+Labs'" alt="${cert.title}" class="w-full h-full object-contain group-hover:scale-105 transition duration-500">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span class="opacity-0 group-hover:opacity-100 transition bg-white/95 text-brand-900 text-xs font-bold px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                        <i class="fa-solid fa-magnifying-glass-plus text-brand-600"></i> Tekan untuk Zoom
                    </span>
                </div>
            </div>
            <div class="p-6 bg-white flex-grow">
                <h3 class="font-serif font-bold text-lg text-brand-900 mb-2">${cert.title}</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${cert.description}</p>
            </div>
        </div>
    `).join('');
}

function openCertZoomModal(certId) {
    certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;
    const cert = certificates.find(c => c.id === certId);
    if (!cert) return;

    isCertZoomed = false;
    const imgEl = document.getElementById('cert-zoom-img');
    imgEl.src = cert.image;
    imgEl.style.transform = 'scale(1)';
    imgEl.classList.remove('cursor-zoom-out');
    imgEl.classList.add('cursor-zoom-in');

    document.getElementById('cert-zoom-title').innerText = cert.title;
    document.getElementById('cert-zoom-desc').innerText = cert.description;
    document.getElementById('cert-zoom-toggle-btn').innerHTML = `<i class="fa-solid fa-magnifying-glass-plus"></i> <span>Perbesar (1.5x)</span>`;
    document.getElementById('cert-zoom-modal').classList.remove('hidden');
}

function toggleCertImageScale() {
    const imgEl = document.getElementById('cert-zoom-img');
    const btnEl = document.getElementById('cert-zoom-toggle-btn');
    isCertZoomed = !isCertZoomed;
    if (isCertZoomed) {
        imgEl.style.transform = 'scale(1.5)';
        imgEl.classList.remove('cursor-zoom-in');
        imgEl.classList.add('cursor-zoom-out');
        btnEl.innerHTML = `<i class="fa-solid fa-magnifying-glass-minus"></i> <span>Perkecil (1x)</span>`;
    } else {
        imgEl.style.transform = 'scale(1)';
        imgEl.classList.remove('cursor-zoom-out');
        imgEl.classList.add('cursor-zoom-in');
        btnEl.innerHTML = `<i class="fa-solid fa-magnifying-glass-plus"></i> <span>Perbesar (1.5x)</span>`;
    }
}

function closeCertZoomModal() {
    document.getElementById('cert-zoom-modal').classList.add('hidden');
    isCertZoomed = false;
}

// ADMIN KELOLA SERTIFIKAT GRAPHIA LABS
function renderAdminCertificates() {
    certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;
    const tbody = document.getElementById('adm-cert-table-body');
    if (!tbody) return;

    tbody.innerHTML = certificates.map(cert => `
        <tr class="border-b hover:bg-slate-50 align-top">
            <td class="p-3"><img src="${cert.image}" class="w-20 h-14 object-cover rounded-lg border"></td>
            <td class="p-3 font-bold text-brand-900">${cert.title}</td>
            <td class="p-3 text-xs text-slate-600 max-w-md">${cert.description}</td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="editCertificate(${cert.id})" class="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200 transition"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button onclick="deleteCertificate(${cert.id})" class="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleSaveCertificate(e) {
    e.preventDefault();
    const editId = document.getElementById('cert-edit-id').value;
    const title = document.getElementById('cert-title').value.trim();
    const imageUrlInput = document.getElementById('cert-image-url').value.trim();
    const description = document.getElementById('cert-desc').value.trim();

    certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;

    if (editId) {
        const idx = certificates.findIndex(c => c.id === parseInt(editId));
        if (idx !== -1) {
            const finalImage = currentCertImageBase64 || imageUrlInput || certificates[idx].image;
            certificates[idx] = { ...certificates[idx], title, image: finalImage, description };
            alert('Sertifikat Berhasil Diperbarui!');
        }
    } else {
        const finalImage = currentCertImageBase64 || imageUrlInput || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&auto=format&fit=crop';
        certificates.push({
            id: Date.now(),
            title,
            image: finalImage,
            description
        });
        alert('Sertifikat Baru Berhasil Ditambahkan!');
    }

    localStorage.setItem('gl_certificates', JSON.stringify(certificates));
    resetCertForm();
    renderAdminCertificates();
    renderAdminPromoBanners();
    renderCertificates();
    renderRunningPromos();
}

function editCertificate(id) {
    certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;
    const cert = certificates.find(c => c.id === id);
    if (!cert) return;

    currentCertImageBase64 = null;
    document.getElementById('cert-edit-id').value = cert.id;
    document.getElementById('cert-title').value = cert.title;
    document.getElementById('cert-image-url').value = (cert.image && !cert.image.startsWith('data:')) ? cert.image : '';
    document.getElementById('cert-desc').value = cert.description;

    document.getElementById('form-cert-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-amber-500"></i> Edit Sertifikat (${cert.title})`;
    document.getElementById('btn-submit-cert-text').innerText = "Update Sertifikat";
    document.getElementById('btn-cancel-cert-edit').classList.remove('hidden');
}

function resetCertForm() {
    document.getElementById('cert-form').reset();
    document.getElementById('cert-edit-id').value = '';
    currentCertImageBase64 = null;
    document.getElementById('form-cert-title').innerHTML = `<i class="fa-solid fa-certificate text-amber-500"></i> Tambah / Edit Sertifikat Graphia Labs`;
    document.getElementById('btn-submit-cert-text').innerText = "Simpan Sertifikat";
    document.getElementById('btn-cancel-cert-edit').classList.add('hidden');
}

function deleteCertificate(id) {
    if (confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) {
        certificates = JSON.parse(localStorage.getItem('gl_certificates')) || initialCertificates;
        certificates = certificates.filter(c => c.id !== id);
        localStorage.setItem('gl_certificates', JSON.stringify(certificates));
        renderAdminCertificates();
        renderAdminPromoBanners();
        renderCertificates();
        renderRunningPromos();
    }
}

function openAuthModal() { document.getElementById('user-auth-modal').classList.remove('hidden'); }
function closeAuthModal() { document.getElementById('user-auth-modal').classList.add('hidden'); }

function handleUserAuth(e) {
    e.preventDefault();
    const name = document.getElementById('auth-name').value;
    const contact = document.getElementById('auth-contact').value;

    currentUser = { name, contact };
    localStorage.setItem('gl_user', JSON.stringify(currentUser));
    updateUserDisplay();
    closeAuthModal();
    openChatModal();
}

function openChatModal() {
    if (!currentUser) { openAuthModal(); return; }
    document.getElementById('chat-modal').classList.remove('hidden');
    document.getElementById('chat-modal').classList.add('flex');
    
    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    const userKey = `${currentUser.name} (${currentUser.contact})`;

    if (!chatConversations[userKey]) {
        chatConversations[userKey] = {
            name: currentUser.name,
            contact: currentUser.contact,
            messages: [
                { sender: 'admin', text: `Halo ${currentUser.name}! Selamat datang di Graphia Labs. Ada yang bisa kami bantu mengenai novel atau penerbitan?` }
            ],
            hasUnread: true
        };
        localStorage.setItem('gl_chat_conversations', JSON.stringify(chatConversations));
    }
    renderCustomerChatMessages();
}

function closeChatModal() {
    document.getElementById('chat-modal').classList.add('hidden');
    document.getElementById('chat-modal').classList.remove('flex');
}

function renderCustomerChatMessages() {
    if (!currentUser) return;
    const box = document.getElementById('chat-messages-box');
    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    const userKey = `${currentUser.name} (${currentUser.contact})`;
    const convo = chatConversations[userKey];
    if (!convo) return;

    box.innerHTML = convo.messages.map(m => `
        <div class="flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="${m.sender === 'user' ? 'bg-brand-800 text-white rounded-tr-none' : 'bg-white border text-slate-700 rounded-tl-none'} p-3 rounded-2xl max-w-[85%] shadow-sm">
                ${m.text}
            </div>
        </div>
    `).join('');
    box.scrollTop = box.scrollHeight;
}

function handleSendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const msgText = input.value.trim();
    if (!msgText || !currentUser) return;

    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    const userKey = `${currentUser.name} (${currentUser.contact})`;

    if (!chatConversations[userKey]) {
        chatConversations[userKey] = { name: currentUser.name, contact: currentUser.contact, messages: [], hasUnread: true };
    }

    chatConversations[userKey].messages.push({ sender: 'user', text: msgText });
    chatConversations[userKey].hasUnread = true;
    localStorage.setItem('gl_chat_conversations', JSON.stringify(chatConversations));
    input.value = '';
    renderCustomerChatMessages();

    if (isAdminLoggedIn) {
        renderAdminChatUsersList();
        if (activeChatEmail === userKey) renderAdminChatRoom();
    }
}

function requestAdminAccess() {
    if (isAdminLoggedIn) {
        showSection('admin');
        renderAdminProducts();
        renderAdminTerbitPackages();
        renderGoogleSheetsLog();
        renderTerbitSheetsLog();
        renderAdminReports();
        renderAdminPaymentMethods();
        renderAdminChatUsersList();
    } else {
        document.getElementById('admin-login-modal').classList.remove('hidden');
    }
}

function closeAdminLoginModal() { document.getElementById('admin-login-modal').classList.add('hidden'); }

function verifyAdminPassword(e) {
    e.preventDefault();
    if (document.getElementById('admin-pass-input').value === 'adminindonesia') {
        isAdminLoggedIn = true;
        closeAdminLoginModal();
        showSection('admin');
        renderAdminProducts();
        renderAdminTerbitPackages();
        renderGoogleSheetsLog();
        renderTerbitSheetsLog();
        renderAdminReports();
        renderAdminPaymentMethods();
        renderAdminChatUsersList();
        alert('Akses Admin Diberikan!');
    } else {
        alert('Password Salah!');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    showSection('home');
}

function switchAdminTab(tabName) {
    ['products', 'terbit-pkg', 'promo-banner', 'sheets', 'sheets-terbit', 'livechat', 'reports', 'certificates', 'payment-methods'].forEach(tab => {
        const el = document.getElementById(`admin-tab-${tab}`);
        const btn = document.getElementById(`tab-btn-${tab}`);
        if(el) el.classList.add('hidden');
        if(btn) btn.className = "px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition relative";
    });
    document.getElementById(`admin-tab-${tabName}`).classList.remove('hidden');
    document.getElementById(`tab-btn-${tabName}`).className = "px-4 py-2 rounded-xl text-sm font-bold bg-brand-800 text-white transition relative";
    
    if(tabName === 'terbit-pkg') renderAdminTerbitPackages();
    if(tabName === 'livechat') {
        renderAdminChatUsersList();
        document.getElementById('admin-chat-unread-badge').classList.add('hidden');
    }
    if(tabName === 'sheets') renderGoogleSheetsLog();
    if(tabName === 'sheets-terbit') renderTerbitSheetsLog();
    if(tabName === 'reports') renderAdminReports();
    if(tabName === 'certificates') renderAdminCertificates();
    if(tabName === 'promo-banner') renderAdminPromoBanners();
}

// KELOLA KATALOG PAKET TERBIT DI PORTAL ADMIN
function renderAdminTerbitPackages() {
    terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;
    const tbody = document.getElementById('adm-terbit-table-body');
    if(!tbody) return;

    tbody.innerHTML = terbitPackages.map(pkg => `
        <tr class="border-b hover:bg-slate-50 align-top">
            <td class="p-3"><img src="${pkg.image || 'https://placehold.co/100x100/0f2b66/ffffff?text=Paket'}" class="w-14 h-14 object-cover rounded-lg border"></td>
            <td class="p-3 font-extrabold text-brand-900">${pkg.name}</td>
            <td class="p-3">
                ${pkg.originalPrice ? `<div class="text-xs text-slate-400 line-through">Rp ${Number(pkg.originalPrice).toLocaleString('id-ID')}</div>` : ''}
                ${pkg.discountLabel ? `<span class="inline-block bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded mb-1">${pkg.discountLabel}</span>` : ''}
                <div class="font-bold text-emerald-700">Rp ${Number(pkg.price).toLocaleString('id-ID')}</div>
            </td>
            <td class="p-3 text-xs text-slate-600 max-w-xs">
                <ul class="list-disc pl-4 space-y-0.5 mb-1.5">
                    ${(pkg.features || []).map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="text-[11px] font-semibold text-brand-700">${(pkg.specs || '').replace(/\n/g, ' • ')}</div>
            </td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="editTerbitPkg(${pkg.id})" class="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200 transition"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button onclick="deleteTerbitPkg(${pkg.id})" class="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleSaveTerbitPkg(e) {
    e.preventDefault();
    const editId = document.getElementById('trb-edit-id').value;
    const name = document.getElementById('trb-name').value.trim();
    const origPriceVal = document.getElementById('trb-orig-price').value;
    const originalPrice = origPriceVal ? parseInt(origPriceVal) : null;
    const discountLabel = document.getElementById('trb-discount-label').value.trim();
    const price = parseInt(document.getElementById('trb-price').value);
    const imageUrlInput = document.getElementById('trb-image-url').value.trim();
    const featuresRaw = document.getElementById('trb-features').value.trim();
    const specs = document.getElementById('trb-specs').value.trim();
    const promoNote = document.getElementById('trb-promo-note').value.trim();

    const features = featuresRaw.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;

    if (editId) {
        const idx = terbitPackages.findIndex(p => p.id === parseInt(editId));
        if (idx !== -1) {
            const finalImage = currentTrbPkgImageBase64 || imageUrlInput || terbitPackages[idx].image;
            terbitPackages[idx] = {
                ...terbitPackages[idx],
                name,
                originalPrice,
                discountLabel,
                price,
                image: finalImage,
                features,
                specs,
                promoNote
            };
            alert('Paket Terbit Berhasil Diperbarui!');
        }
    } else {
        const finalImage = currentTrbPkgImageBase64 || imageUrlInput || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop';
        terbitPackages.push({
            id: Date.now(),
            name,
            originalPrice,
            discountLabel,
            price,
            image: finalImage,
            features,
            specs,
            promoNote
        });
        alert('Paket Terbit Baru Berhasil Ditambahkan!');
    }

    localStorage.setItem('gl_terbit_packages', JSON.stringify(terbitPackages));
    resetTerbitPkgForm();
    renderAdminTerbitPackages();
    renderTerbitPackages();
}

function editTerbitPkg(id) {
    terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;
    const pkg = terbitPackages.find(p => p.id === id);
    if (!pkg) return;

    currentTrbPkgImageBase64 = null;
    document.getElementById('trb-edit-id').value = pkg.id;
    document.getElementById('trb-name').value = pkg.name;
    document.getElementById('trb-orig-price').value = pkg.originalPrice || '';
    document.getElementById('trb-discount-label').value = pkg.discountLabel || '';
    document.getElementById('trb-price').value = pkg.price;
    document.getElementById('trb-image-url').value = (pkg.image && !pkg.image.startsWith('data:')) ? pkg.image : '';
    document.getElementById('trb-features').value = (pkg.features || []).join('\n');
    document.getElementById('trb-specs').value = pkg.specs || '';
    document.getElementById('trb-promo-note').value = pkg.promoNote || '';

    document.getElementById('form-terbit-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-amber-500"></i> Edit Paket Terbit (${pkg.name})`;
    document.getElementById('btn-submit-trb-text').innerText = "Update Paket Terbit";
    document.getElementById('btn-cancel-trb-edit').classList.remove('hidden');

    window.scrollTo({ top: document.getElementById('terbit-pkg-form').offsetTop - 100, behavior: 'smooth' });
}

function resetTerbitPkgForm() {
    document.getElementById('terbit-pkg-form').reset();
    document.getElementById('trb-edit-id').value = '';
    currentTrbPkgImageBase64 = null;
    document.getElementById('form-terbit-title').innerHTML = `<i class="fa-solid fa-feather-pointed text-amber-500"></i> Tambah / Edit Paket Terbit Buku`;
    document.getElementById('btn-submit-trb-text').innerText = "Simpan Paket Terbit";
    document.getElementById('btn-cancel-trb-edit').classList.add('hidden');
}

function deleteTerbitPkg(id) {
    if (confirm("Apakah Anda yakin ingin menghapus paket terbit ini?")) {
        terbitPackages = JSON.parse(localStorage.getItem('gl_terbit_packages')) || initialTerbitPackages;
        terbitPackages = terbitPackages.filter(p => p.id !== id);
        localStorage.setItem('gl_terbit_packages', JSON.stringify(terbitPackages));
        renderAdminTerbitPackages();
        renderTerbitPackages();
    }
}

// LOG SHEETS KHUSUS PEMBELI TERBIT
function renderTerbitSheetsLog() {
    terbitOrders = JSON.parse(localStorage.getItem('gl_terbit_orders')) || [];
    const tbody = document.getElementById('adm-sheets-terbit-tbody');
    if(!tbody) return;

    if (terbitOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="p-6 text-center text-slate-400 italic font-sans">Belum ada transaksi pembeli paket terbit.</td></tr>`;
        return;
    }

    tbody.innerHTML = terbitOrders.map(o => `
        <tr class="hover:bg-purple-50/50">
            <td class="p-3">${o.date}</td>
            <td class="p-3 font-bold text-purple-900">${o.id}</td>
            <td class="p-3 font-semibold">${o.name}</td>
            <td class="p-3 text-blue-600">${o.phone}</td>
            <td class="p-3 font-medium text-slate-800">${o.manuscript}</td>
            <td class="p-3"><span class="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">${o.packageName}</span></td>
            <td class="p-3 font-bold text-emerald-700">Rp ${Number(o.total).toLocaleString('id-ID')}</td>
            <td class="p-3">${o.paymentMethod}</td>
            <td class="p-3 text-center">
                ${o.proofImg ? `<button onclick="openTerbitProofModal('${o.id}')" class="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-blue-100 flex items-center gap-1 mx-auto"><i class="fa-solid fa-image"></i> Lihat Foto</button>` : `<span class="text-slate-400 text-[10px] italic">Tidak ada</span>`}
            </td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <span class="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded">${o.status}</span>
                    <button onclick="deleteTerbitOrder('${o.id}')" class="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold transition"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteTerbitOrder(orderId) {
    if (confirm(`Apakah Anda yakin ingin menghapus data pembeli terbit ${orderId}?`)) {
        terbitOrders = JSON.parse(localStorage.getItem('gl_terbit_orders')) || [];
        terbitOrders = terbitOrders.filter(o => o.id !== orderId);
        localStorage.setItem('gl_terbit_orders', JSON.stringify(terbitOrders));
        renderTerbitSheetsLog();
        renderAdminReports();
    }
}

function clearAllTerbitOrders() {
    terbitOrders = JSON.parse(localStorage.getItem('gl_terbit_orders')) || [];
    if (terbitOrders.length === 0) {
        alert('Log Sheets Pembeli Terbit sudah kosong.');
        return;
    }
    if (confirm(`Apakah Anda yakin ingin MENGHAPUS SEMUA (${terbitOrders.length}) data pada Log Sheets Pembeli Terbit? Tindakan ini tidak dapat dibatalkan.`)) {
        terbitOrders = [];
        localStorage.setItem('gl_terbit_orders', JSON.stringify(terbitOrders));
        renderTerbitSheetsLog();
        renderAdminReports();
        alert('Semua data Log Sheets Pembeli Terbit berhasil dihapus!');
    }
}

function openTerbitProofModal(orderId) {
    const order = terbitOrders.find(o => o.id === orderId);
    if (order && order.proofImg) {
        document.getElementById('proof-modal-img').src = order.proofImg;
        document.getElementById('proof-modal').classList.remove('hidden');
    }
}

function downloadTerbitSpreadsheetCSV() {
    terbitOrders = JSON.parse(localStorage.getItem('gl_terbit_orders')) || [];
    if (terbitOrders.length === 0) {
        alert('Belum ada data pembeli terbit untuk di-download!');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Timestamp,Order ID,Nama Penulis,WhatsApp,Judul Naskah,Alamat Pengiriman,Paket Dipilih,Total (Rp),Metode Bayar,Bukti Pembayaran,Status\n";

    terbitOrders.forEach(o => {
        const proofStr = o.proofImg ? "[Foto Bukti Terlampir]" : "Tidak Ada";
        const row = [
            `"${o.date}"`,
            `"${o.id}"`,
            `"${o.name}"`,
            `"${o.phone}"`,
            `"${(o.manuscript || '').replace(/"/g, '""')}"`,
            `"${(o.address || '').replace(/"/g, '""')}"`,
            `"${o.packageName}"`,
            `"${o.total}"`,
            `"${o.paymentMethod}"`,
            `"${proofStr}"`,
            `"${o.status}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GraphiaLabs_PembeliTerbit_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderAdminChatUsersList() {
    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    const listContainer = document.getElementById('admin-chat-users-list');
    const keys = Object.keys(chatConversations);

    let hasAnyUnread = false;
    if (keys.length === 0) {
        listContainer.innerHTML = `<div class="text-xs text-slate-400 italic text-center py-4">Belum ada chat masuk.</div>`;
        document.getElementById('admin-chat-unread-badge').classList.add('hidden');
        return;
    }

    listContainer.innerHTML = keys.map(key => {
        const convo = chatConversations[key];
        const lastMsg = convo.messages[convo.messages.length - 1];
        if (convo.hasUnread) hasAnyUnread = true;
        const safeKey = key.replace(/'/g, "\\'");

        return `
            <div onclick="selectAdminChatUser('${safeKey}')" class="p-3 rounded-xl border cursor-pointer hover:bg-white transition relative ${activeChatEmail === key ? 'bg-white border-brand-600 shadow-sm' : 'border-slate-200 bg-slate-50'}">
                <div class="flex items-center justify-between gap-1">
                    <div class="font-bold text-xs text-slate-900 truncate">${convo.name}</div>
                    <div class="flex items-center gap-1.5 shrink-0">
                        ${convo.hasUnread ? `<span class="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Baru</span>` : ''}
                        <button onclick="event.stopPropagation(); deleteAdminChatUser('${safeKey}')" title="Hapus Chat Konsumen" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-lg transition text-xs">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div class="text-[10px] text-blue-600 truncate">Kontak: ${convo.contact}</div>
                <div class="text-[10px] text-slate-500 truncate mt-1 font-sans">"${lastMsg ? lastMsg.text : ''}"</div>
            </div>
        `;
    }).join('');

    if (hasAnyUnread) {
        document.getElementById('admin-chat-unread-badge').classList.remove('hidden');
        document.getElementById('admin-chat-unread-badge').classList.add('flex');
    } else {
        document.getElementById('admin-chat-unread-badge').classList.add('hidden');
    }
}

function selectAdminChatUser(contactKey) {
    activeChatEmail = contactKey;
    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    if (chatConversations[contactKey]) {
        chatConversations[contactKey].hasUnread = false;
        localStorage.setItem('gl_chat_conversations', JSON.stringify(chatConversations));
    }
    renderAdminChatUsersList();
    renderAdminChatRoom();
}

function deleteAdminChatUser(contactKey) {
    if (!contactKey) return;
    if (confirm(`Apakah Anda yakin ingin menghapus riwayat chat dari "${contactKey}"?`)) {
        chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
        delete chatConversations[contactKey];
        localStorage.setItem('gl_chat_conversations', JSON.stringify(chatConversations));

        if (activeChatEmail === contactKey) {
            activeChatEmail = null;
            document.getElementById('active-chat-name').innerText = 'Pilih Konsumen';
            document.getElementById('active-chat-contact').innerText = 'Email/No HP: -';
            const delBtn = document.getElementById('btn-delete-active-chat');
            if (delBtn) delBtn.classList.add('hidden');
            document.getElementById('admin-chat-box').innerHTML = `<div class="text-center text-slate-400 py-16">Chat telah dihapus. Pilih salah satu konsumen di samping untuk mulai membalas pesan.</div>`;
        }
        renderAdminChatUsersList();
    }
}

function renderAdminChatRoom() {
    if (!activeChatEmail) return;
    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    const convo = chatConversations[activeChatEmail];
    if (!convo) return;

    document.getElementById('active-chat-name').innerText = convo.name;
    document.getElementById('active-chat-contact').innerText = `Email / HP: ${convo.contact}`;
    const delBtn = document.getElementById('btn-delete-active-chat');
    if (delBtn) delBtn.classList.remove('hidden');

    const box = document.getElementById('admin-chat-box');
    box.innerHTML = convo.messages.map(m => `
        <div class="flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}">
            <div class="${m.sender === 'admin' ? 'bg-brand-800 text-white rounded-tr-none' : 'bg-slate-100 border text-slate-800 rounded-tl-none'} p-3 rounded-2xl max-w-[85%] shadow-sm">
                <b>${m.sender === 'admin' ? 'Admin' : convo.name}:</b><br>${m.text}
            </div>
        </div>
    `).join('');
    box.scrollTop = box.scrollHeight;
}

function handleAdminSendChat(e) {
    e.preventDefault();
    if (!activeChatEmail) { alert('Pilih konsumen terlebih dahulu!'); return; }
    const input = document.getElementById('admin-chat-input');
    const text = input.value.trim();
    if (!text) return;

    chatConversations = JSON.parse(localStorage.getItem('gl_chat_conversations')) || {};
    chatConversations[activeChatEmail].messages.push({ sender: 'admin', text: text });
    localStorage.setItem('gl_chat_conversations', JSON.stringify(chatConversations));
    input.value = '';
    renderAdminChatRoom();
    renderAdminChatUsersList();

    if (currentUser && `${currentUser.name} (${currentUser.contact})` === activeChatEmail) {
        renderCustomerChatMessages();
    }
}

// ADMIN PRODUCTS MANAGEMENT (NOVEL)
function renderAdminProducts() {
    const allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;
    const tbody = document.getElementById('adm-products-table-body');
    if(!tbody) return;

    tbody.innerHTML = allProds.map(p => `
        <tr class="border-b hover:bg-slate-50">
            <td class="p-3"><img src="${p.image}" class="w-10 h-12 object-cover rounded border"></td>
            <td class="p-3 font-bold text-slate-800">${p.title}<br><span class="text-xs text-slate-400">${p.author}</span></td>
            <td class="p-3"><span class="bg-slate-100 px-2 py-1 rounded text-xs">${p.category}</span></td>
            <td class="p-3 font-semibold text-brand-900">Rp ${p.price.toLocaleString('id-ID')}</td>
            <td class="p-3 text-center"><span class="text-xs font-bold px-2 py-1 bg-slate-100 rounded">${p.status || 'sale'}</span></td>
            <td class="p-3 text-center font-bold text-sm">${p.stock}</td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="editProduct(${p.id})" class="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button onclick="deleteProduct(${p.id})" class="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 transition"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleSaveProduct(e) {
    e.preventDefault();
    const editId = document.getElementById('adm-edit-id').value;
    const title = document.getElementById('adm-title').value.trim();
    const author = document.getElementById('adm-author').value.trim();
    const category = document.getElementById('adm-category').value;
    const price = parseInt(document.getElementById('adm-price').value);
    const stock = parseInt(document.getElementById('adm-stock').value);
    const status = document.getElementById('adm-status').value;
    const image = document.getElementById('adm-image').value.trim();
    const description = document.getElementById('adm-desc').value.trim();

    let allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;

    if (editId) {
        const index = allProds.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            allProds[index].title = title;
            allProds[index].author = author;
            allProds[index].category = category;
            allProds[index].price = price;
            allProds[index].stock = stock;
            allProds[index].status = status;
            allProds[index].image = image;
            allProds[index].description = description;
            alert('Data Novel Berhasil Diperbarui!');
        }
    } else {
        allProds.unshift({
            id: Date.now(),
            title,
            author,
            category,
            price,
            stock,
            status,
            image,
            description,
            reviews: []
        });
        alert('Novel Baru Berhasil Ditambahkan ke Katalog!');
    }

    localStorage.setItem('gl_products', JSON.stringify(allProds));
    products = allProds;
    resetProductForm();
    renderAdminProducts();
    renderCatalog();
}

function editProduct(id) {
    const allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;
    const product = allProds.find(p => p.id === id);
    if (!product) return;

    document.getElementById('adm-edit-id').value = product.id;
    document.getElementById('adm-title').value = product.title;
    document.getElementById('adm-author').value = product.author;
    document.getElementById('adm-category').value = product.category;
    document.getElementById('adm-price').value = product.price;
    document.getElementById('adm-stock').value = product.stock;
    document.getElementById('adm-status').value = product.status || 'sale';
    document.getElementById('adm-image').value = product.image;
    document.getElementById('adm-desc').value = product.description || '';

    document.getElementById('form-product-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-amber-500"></i> Edit Produk Novel (${product.title})`;
    document.getElementById('btn-submit-text').innerText = "Update Data Novel";
    document.getElementById('btn-cancel-edit').classList.remove('hidden');

    window.scrollTo({ top: document.getElementById('add-product-form').offsetTop - 100, behavior: 'smooth' });
}

function resetProductForm() {
    document.getElementById('add-product-form').reset();
    document.getElementById('adm-edit-id').value = '';
    document.getElementById('form-product-title').innerHTML = `<i class="fa-solid fa-circle-plus text-brand-600"></i> Tambah / Update Produk Novel`;
    document.getElementById('btn-submit-text').innerText = "Simpan Novel Ke Katalog";
    document.getElementById('btn-cancel-edit').classList.add('hidden');
}

function deleteProduct(id) {
    if (confirm("Apakah Anda yakin ingin menghapus novel ini dari katalog?")) {
        let allProds = JSON.parse(localStorage.getItem('gl_products')) || initialProducts;
        allProds = allProds.filter(p => p.id !== id);
        localStorage.setItem('gl_products', JSON.stringify(allProds));
        products = allProds;
        renderAdminProducts();
        renderCatalog();
    }
}

function renderGoogleSheetsLog() {
    orders = JSON.parse(localStorage.getItem('gl_orders')) || [];
    const tbody = document.getElementById('adm-sheets-tbody');
    if(!tbody) return;
    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="p-6 text-center text-slate-400 italic font-sans">Belum ada transaksi pembeli novel.</td></tr>`;
        return;
    }
    tbody.innerHTML = orders.map(o => `
        <tr class="hover:bg-emerald-50/50">
            <td class="p-3">${o.date}</td>
            <td class="p-3 font-bold text-brand-900">${o.id}</td>
            <td class="p-3 font-semibold">${o.name}</td>
            <td class="p-3 text-blue-600">${o.phone}</td>
            <td class="p-3 truncate max-w-[150px]">${o.address}</td>
            <td class="p-3">${o.items}</td>
            <td class="p-3 font-bold text-emerald-700">Rp ${o.total.toLocaleString('id-ID')}</td>
            <td class="p-3">${o.paymentMethod}</td>
            <td class="p-3 text-center">
                ${o.proofImg ? `<button onclick="openProofModal('${o.id}')" class="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-blue-100 flex items-center gap-1 mx-auto"><i class="fa-solid fa-image"></i> Lihat Foto</button>` : `<span class="text-slate-400 text-[10px] italic">Tidak ada</span>`}
            </td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded">${o.status}</span>
                    <button onclick="deleteOrder('${o.id}')" class="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold transition" title="Hapus Pesanan"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteOrder(orderId) {
    if (confirm(`Apakah Anda yakin ingin menghapus pesanan novel ${orderId}?`)) {
        orders = JSON.parse(localStorage.getItem('gl_orders')) || [];
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('gl_orders', JSON.stringify(orders));
        renderGoogleSheetsLog();
        renderAdminReports();
    }
}

function clearAllNovelOrders() {
    orders = JSON.parse(localStorage.getItem('gl_orders')) || [];
    if (orders.length === 0) {
        alert('Log Sheets Novel sudah kosong.');
        return;
    }
    if (confirm(`Apakah Anda yakin ingin MENGHAPUS SEMUA (${orders.length}) data pada Log Sheets Novel? Tindakan ini tidak dapat dibatalkan.`)) {
        orders = [];
        localStorage.setItem('gl_orders', JSON.stringify(orders));
        renderGoogleSheetsLog();
        renderAdminReports();
        alert('Semua data Log Sheets Novel berhasil dihapus!');
    }
}

function openProofModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order && order.proofImg) {
        document.getElementById('proof-modal-img').src = order.proofImg;
        document.getElementById('proof-modal').classList.remove('hidden');
    }
}

function closeProofModal() {
    document.getElementById('proof-modal').classList.add('hidden');
}

function downloadSpreadsheetCSV() {
    orders = JSON.parse(localStorage.getItem('gl_orders')) || [];
    if (orders.length === 0) {
        alert('Belum ada data pesanan untuk di-download!');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Timestamp,Order ID,Nama Pembeli,WhatsApp,Alamat Pengiriman,Buku Dibeli,Total (Rp),Metode Bayar,Bukti Pembayaran,Status\n";

    orders.forEach(o => {
        const proofStr = o.proofImg ? "[Foto Bukti Terlampir]" : "Tidak Ada";
        const row = [
            `"${o.date}"`,
            `"${o.id}"`,
            `"${o.name}"`,
            `"${o.phone}"`,
            `"${o.address.replace(/"/g, '""')}"`,
            `"${o.items.replace(/"/g, '""')}"`,
            `"${o.total}"`,
            `"${o.paymentMethod}"`,
            `"${proofStr}"`,
            `"${o.status}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GraphiaLabs_Orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderAdminReports() {
    const novelRev = orders.reduce((sum, o) => sum + Number(o.total), 0);
    const terbitRev = terbitOrders.reduce((sum, o) => sum + Number(o.total), 0);
    const totalRevenue = novelRev + terbitRev;
    const totalCount = orders.length + terbitOrders.length;

    const revEl = document.getElementById('report-total-revenue');
    const ordEl = document.getElementById('report-total-orders');
    if(revEl) revEl.innerText = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
    if(ordEl) ordEl.innerText = `${totalCount} Transaksi`;
}

function renderAdminPaymentMethods() {
    const listEl = document.getElementById('payment-methods-admin-list');
    if(!listEl) return;
    listEl.innerHTML = paymentMethods.map(m => `
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border">
            <span class="font-bold text-slate-800 text-sm">${m.name}</span>
            <button onclick="togglePaymentMethod('${m.id}')" class="px-4 py-1.5 rounded-lg text-xs font-bold ${m.active ? 'bg-emerald-600 text-white' : 'bg-slate-300'}">${m.active ? 'Aktif' : 'Non-Aktif'}</button>
        </div>
    `).join('');
}

// RENDER & KELOLA IKLAN PROMOSI BERJALAN DI BERANDA
function renderRunningPromos() {
    const track = document.getElementById('home-running-promo-track');
    if (!track) return;
    promoBanners = JSON.parse(localStorage.getItem('gl_promo_banners')) || initialPromoBanners;

    if (promoBanners.length === 0) {
        track.innerHTML = `<div class="text-xs text-slate-300 py-4 px-2">Belum ada iklan promosi aktif.</div>`;
        return;
    }

    const loopedItems = [...promoBanners, ...promoBanners];
    track.innerHTML = loopedItems.map(item => `
        <div onclick="showSection('catalog')" class="cursor-pointer bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-center gap-4 min-w-[300px] sm:min-w-[350px] max-w-[380px] transition group">
            <div class="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-brand-950 border border-white/20 shadow-md">
                <img src="${item.image}" onerror="this.src='https://placehold.co/200x260/0f2b66/ffffff?text=Buku+Baru'" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="text-white space-y-1 overflow-hidden">
                <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="bg-amber-400 text-brand-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">${item.badge || 'BUKU BARU'}</span>
                    ${item.discountLabel ? `<span class="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">${item.discountLabel}</span>` : ''}
                </div>
                <h4 class="font-serif font-bold text-sm sm:text-base leading-snug line-clamp-2 text-white group-hover:text-amber-300 transition">${item.title}</h4>
                <div class="flex items-baseline gap-2 pt-0.5">
                    <span class="text-sm sm:text-base font-extrabold text-amber-400">Rp ${Number(item.price).toLocaleString('id-ID')}</span>
                    ${item.originalPrice && item.originalPrice > item.price ? `<span class="text-[11px] text-slate-300 line-through">Rp ${Number(item.originalPrice).toLocaleString('id-ID')}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderAdminPromoBanners() {
    promoBanners = JSON.parse(localStorage.getItem('gl_promo_banners')) || initialPromoBanners;
    const tbody = document.getElementById('adm-promo-table-body');
    if (!tbody) return;

    tbody.innerHTML = promoBanners.map(item => `
        <tr class="border-b hover:bg-slate-50 align-middle">
            <td class="p-3"><img src="${item.image}" onerror="this.src='https://placehold.co/100x120/0f2b66/ffffff?text=Promo'" class="w-12 h-16 object-cover rounded-lg border"></td>
            <td class="p-3"><span class="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded">${item.badge}</span></td>
            <td class="p-3 font-bold text-brand-900">${item.title}</td>
            <td class="p-3">
                ${item.originalPrice ? `<div class="text-xs text-slate-400 line-through">Rp ${Number(item.originalPrice).toLocaleString('id-ID')}</div>` : ''}
                ${item.discountLabel ? `<span class="inline-block bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded mb-0.5">${item.discountLabel}</span>` : ''}
                <div class="font-bold text-emerald-700">Rp ${Number(item.price).toLocaleString('id-ID')}</div>
            </td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="editPromoBanner(${item.id})" class="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200 transition"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button onclick="deletePromoBanner(${item.id})" class="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleSavePromoBanner(e) {
    e.preventDefault();
    const editId = document.getElementById('promo-edit-id').value;
    const badge = document.getElementById('promo-badge').value.trim();
    const title = document.getElementById('promo-title').value.trim();
    const origVal = document.getElementById('promo-orig-price').value;
    const originalPrice = origVal ? parseInt(origVal) : null;
    const discountLabel = document.getElementById('promo-discount').value.trim();
    const price = parseInt(document.getElementById('promo-price').value);
    const imageUrlInput = document.getElementById('promo-image-url').value.trim();

    promoBanners = JSON.parse(localStorage.getItem('gl_promo_banners')) || initialPromoBanners;

    if (editId) {
        const idx = promoBanners.findIndex(p => p.id === parseInt(editId));
        if (idx !== -1) {
            const finalImage = currentPromoImageBase64 || imageUrlInput || promoBanners[idx].image;
            promoBanners[idx] = {
                ...promoBanners[idx],
                badge,
                title,
                originalPrice,
                discountLabel,
                price,
                image: finalImage
            };
            alert('Iklan Promosi Beranda Berhasil Diperbarui!');
        }
    } else {
        const finalImage = currentPromoImageBase64 || imageUrlInput || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop';
        promoBanners.push({
            id: Date.now(),
            badge,
            title,
            originalPrice,
            discountLabel,
            price,
            image: finalImage
        });
        alert('Iklan Promosi Baru Berhasil Ditambahkan ke Beranda!');
    }

    localStorage.setItem('gl_promo_banners', JSON.stringify(promoBanners));
    resetPromoForm();
    renderAdminPromoBanners();
    renderRunningPromos();
}

function editPromoBanner(id) {
    promoBanners = JSON.parse(localStorage.getItem('gl_promo_banners')) || initialPromoBanners;
    const item = promoBanners.find(p => p.id === id);
    if (!item) return;

    currentPromoImageBase64 = null;
    document.getElementById('promo-edit-id').value = item.id;
    document.getElementById('promo-badge').value = item.badge || '';
    document.getElementById('promo-title').value = item.title || '';
    document.getElementById('promo-orig-price').value = item.originalPrice || '';
    document.getElementById('promo-discount').value = item.discountLabel || '';
    document.getElementById('promo-price').value = item.price || '';
    document.getElementById('promo-image-url').value = (item.image && !item.image.startsWith('data:')) ? item.image : '';

    document.getElementById('form-promo-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-rose-500"></i> Edit Iklan Promosi (${item.title})`;
    document.getElementById('btn-submit-promo-text').innerText = "Update Iklan Promosi";
    document.getElementById('btn-cancel-promo-edit').classList.remove('hidden');

    window.scrollTo({ top: document.getElementById('promo-banner-form').offsetTop - 100, behavior: 'smooth' });
}

function resetPromoForm() {
    document.getElementById('promo-banner-form').reset();
    document.getElementById('promo-edit-id').value = '';
    currentPromoImageBase64 = null;
    document.getElementById('form-promo-title').innerHTML = `<i class="fa-solid fa-bullhorn text-rose-500"></i> Tambah / Edit Iklan Promosi Berjalan di Beranda`;
    document.getElementById('btn-submit-promo-text').innerText = "Simpan Iklan Promosi";
    document.getElementById('btn-cancel-promo-edit').classList.add('hidden');
}

function deletePromoBanner(id) {
    if (confirm("Apakah Anda yakin ingin menghapus iklan promosi ini?")) {
        promoBanners = JSON.parse(localStorage.getItem('gl_promo_banners')) || initialPromoBanners;
        promoBanners = promoBanners.filter(p => p.id !== id);
        localStorage.setItem('gl_promo_banners', JSON.stringify(promoBanners));
        renderAdminPromoBanners();
        renderRunningPromos();
    }
}

function togglePaymentMethod(id) {
    const method = paymentMethods.find(m => m.id === id);
    if (method) {
        method.active = !method.active;
        localStorage.setItem('gl_payment_methods', JSON.stringify(paymentMethods));
        renderAdminPaymentMethods();
        renderPaymentMethodsOptions();
    }
}