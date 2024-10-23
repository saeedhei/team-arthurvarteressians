<script setup lang="ts">
import bookStore from './assets/bookStore.jpg'
import { ref, computed, onMounted } from 'vue'

// Define refs to store the books, filters, and pagination information
const books = ref([]);            // All books fetched from backend
const filteredBooks = ref([]);     // Filtered books after applying filters
const categories = ref([]);        // Categories for filter
const authors = ref([]);           // Authors for filter
const currentPage = ref(1);        // Current page number
const booksPerPage = 15;           // Number of books per page

// Price ranges for filtering
const priceRanges = ref([
  { label: 'All', min: null, max: null }, // "All" means no filtering on price
  { label: 'Below $10', min: 0, max: 10 },
  { label: '$10 - $20', min: 10, max: 20 },
  { label: '$20 - $30', min: 20, max: 30 },
  { label: '$30 - $50', min: 30, max: 50 },
  { label: 'Above $50', min: 50, max: Infinity }
]);
const selectedPriceRange = ref(priceRanges.value[0]); // Default to "All"

// Filter refs for category and author
const selectedCategory = ref('');
const selectedAuthor = ref('');

// Fetch books from the backend
const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    books.value = data;
    filteredBooks.value = books.value; // Set all books as initially filtered
    extractCategoriesAndAuthors();     // Extract categories and authors for filters
    applyFilters();                    // Apply filters to show books immediately
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

// Extract unique categories and authors for the filters
const extractCategoriesAndAuthors = () => {
  const uniqueCategories = new Set(books.value.map(book => book.category));
  const uniqueAuthors = new Set(books.value.map(book => book.author));
  categories.value = Array.from(uniqueCategories);
  authors.value = Array.from(uniqueAuthors);
};

// Filter books based on selected filters
const applyFilters = () => {
  filteredBooks.value = books.value.filter(book => {
    // If the price range is "All", do not filter by price
    const inPriceRange = selectedPriceRange.value.min === null || (
      book.price >= selectedPriceRange.value.min && book.price <= selectedPriceRange.value.max
    );
    
    // Apply category and author filters
    return (
      inPriceRange &&
      (selectedCategory.value === '' || book.category === selectedCategory.value) &&
      (selectedAuthor.value === '' || book.author === selectedAuthor.value)
    );
  });
  currentPage.value = 1; // Reset to page one after applying filters
};

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredBooks.value.length / booksPerPage));

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage;
  const end = start + booksPerPage;
  return filteredBooks.value.slice(start, end);
});

// Pagination controls
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

onMounted(fetchBooks); // Fetch books when component is mounted
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-slate-300 p-4 flex items-center justify-between">
      <div class="flex items-center">
        <img :src="bookStore" alt="Book Store" class="w-16 h-16 md:w-20 md:h-20 p-0" />
        <h1 class="ml-4 text-xl sm:text-2xl md:text-3xl font-bold">Book Store</h1>
      </div>
      <p class="hidden md:block text-gray-600 pr-10 text-lg md:text-xl">Welcome to the great book store!</p>
    </header>

    <!-- Filter Section -->
    <div class="bg-slate-200 p-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
      <!-- Price Range Filter -->
      <div class="w-full md:w-auto">
        <label class="block mb-2 text-base sm:text-lg">Price Range:</label>
        <select v-model="selectedPriceRange" @change="applyFilters" class="p-3 border rounded w-full text-lg">
          <option v-for="range in priceRanges" :key="range.label" :value="range">
            {{ range.label }}
          </option>
        </select>
      </div>

      <!-- Category Filter -->
      <div class="w-full md:w-auto">
        <label class="block mb-2 text-base sm:text-lg">Category:</label>
        <select v-model="selectedCategory" @change="applyFilters" class="p-3 border rounded w-full text-lg">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <!-- Author Filter -->
      <div class="w-full md:w-auto">
        <label class="block mb-2 text-base sm:text-lg">Author:</label>
        <select v-model="selectedAuthor" @change="applyFilters" class="p-3 border rounded w-full text-lg">
          <option value="">All Authors</option>
          <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
        </select>
      </div>
    </div>

    <!-- Main Content Section (Books) -->
    <main class="flex-1 bg-slate-100 p-4 md:p-6">
      <div v-if="paginatedBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="book in paginatedBooks" :key="book.id" class="bg-white p-4 rounded shadow-lg">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{{ book.title }}</h3>
          <p class="text-base sm:text-lg">Author: {{ book.author }}</p>
          <p class="text-base sm:text-lg">Price: ${{ book.price }}</p>
          <p class="text-base sm:text-lg">Category: {{ book.category }}</p>
          <p class="text-sm text-gray-600 mt-2">{{ book.description }}</p>
        </div>
      </div>

      <!-- No Books Available -->
      <div v-else class="text-center">
        <p class="text-lg sm:text-xl">No books available matching your filters.</p>
      </div>
    </main>

    <!-- Pagination Section -->
    <div class="flex justify-center space-x-4 my-4 md:my-6">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-base sm:text-lg" :class="{ 'opacity-50': currentPage === 1 }">
        Previous
      </button>
      <span class="text-base sm:text-lg">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-base sm:text-lg" :class="{ 'opacity-50': currentPage === totalPages }">
        Next
      </button>
    </div>

    <!-- Footer -->
    <footer class="bg-slate-400 p-4 flex flex-col md:flex-row items-center justify-around text-center md:text-left space-y-2 md:space-y-0">
      <div class="text-base sm:text-lg font-semibold">© 2024 All Rights Reserved</div>
      <div class="text-base sm:text-lg font-semibold">Lorem ipsum dolor sit amet</div>
      <div class="text-base sm:text-lg font-semibold">Lorem ipsum dolor sit amet</div>
    </footer>
  </div>
</template>
