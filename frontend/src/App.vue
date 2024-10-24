<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const books = ref([]);            // All books fetched from backend
const searchQuery = ref('');       // Search query input by user
const selectedCategory = ref('');  // Selected category for filtering
const selectedAuthor = ref('');    // Selected author for filtering
const categories = ref([]);        // Categories fetched from backend
const authors = ref([]);           // Authors fetched from backend
const currentPage = ref(1);        // Current page number
const totalPages = ref(1);         // Total number of pages
const isCategoryDropdownActive = ref(false); // Track the active state of category dropdown
const isAuthorDropdownActive = ref(false);   // Track the active state of author dropdown

// Fetch books from the backend
const fetchBooks = async (page = 1, query = '', category = '', author = '') => {
  try {
    const response = await fetch(
      `http://localhost:3000/books?page=${page}&title=${query}&category=${category}&author=${author}`
    );
    const data = await response.json();
    if (data && Array.isArray(data.books)) {
      books.value = data.books;
      currentPage.value = data.currentPage;
      totalPages.value = data.totalPages;
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

// Fetch categories and authors for filters
const fetchFilters = async () => {
  try {
    const response = await fetch('http://localhost:3000/books/filters');
    const data = await response.json();
    if (data) {
      categories.value = data.categories;
      authors.value = data.authors;
    }
  } catch (error) {
    console.error('Error fetching filters:', error);
  }
};

// Handle search functionality
const handleSearch = () => {
  fetchBooks(1, searchQuery.value, selectedCategory.value, selectedAuthor.value);
};

// Handle filter changes
const handleFilterChange = () => {
  fetchBooks(1, searchQuery.value, selectedCategory.value, selectedAuthor.value);
};

// Pagination logic
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchBooks(currentPage.value + 1, searchQuery.value, selectedCategory.value, selectedAuthor.value);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    fetchBooks(currentPage.value - 1, searchQuery.value, selectedCategory.value, selectedAuthor.value);
  }
};

// Toggle dropdown for category
const toggleCategoryDropdown = () => {
  isCategoryDropdownActive.value = !isCategoryDropdownActive.value;
  isAuthorDropdownActive.value = false; // Close author dropdown when category is opened
};

// Toggle dropdown for author
const toggleAuthorDropdown = () => {
  isAuthorDropdownActive.value = !isAuthorDropdownActive.value;
  isCategoryDropdownActive.value = false; // Close category dropdown when author is opened
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.dropdown')) {
    isCategoryDropdownActive.value = false;
    isAuthorDropdownActive.value = false;
  }
};

onMounted(() => {
  fetchBooks(1);
  fetchFilters();
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-slate-300 p-2 md:p-4 flex flex-col md:flex-row items-center justify-between">
      <div class="flex items-center">
        <img src="./assets/bookStore.jpg" alt="Book Store" class="w-12 h-12 md:w-16 md:h-16 p-0" />
        <h1 class="ml-2 md:ml-4 text-lg md:text-xl font-bold">Book Store</h1>
      </div>
      <p class="hidden md:block text-gray-600 pr-5 text-sm md:text-base">Welcome to the great book store!</p>
    </header>

    <!-- Search and Filter Section -->
    <div class="bg-slate-200 p-8 md:flex-row flex justify-around max-w-full">
      <!-- Search Field -->
      <div class="w-3/12">
        <label class="block mb-2">Search by Title:</label>
        <input v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Enter book title" 
          class="p-2 border rounded w-full text-sm md:text-base" />
      </div>

      <!-- Category Filter -->
      <div class="w-3/12 relative">
        <label class="block mb-2">Filter by Category:</label>
        <div @click="toggleCategoryDropdown" :class="{ 'dropdown-active': isCategoryDropdownActive }"
             class="p-2 border rounded w-full text-sm md:text-base bg-white dropdown">
          {{ selectedCategory || 'All Categories' }}
        </div>
        <ul v-if="isCategoryDropdownActive" class="absolute bg-gray-300 w-full max-h-[30vh] p-2 rounded-lg overflow-y-auto mt-2">
          <li v-for="category in categories" :key="category" @click="selectedCategory = category; toggleCategoryDropdown()"
              class="p-2 cursor-pointer hover:bg-gray-400">{{ category }}</li>
        </ul>
      </div>

      <!-- Author Filter -->
      <div class="w-3/12 relative">
        <label class="block mb-2">Filter by Author:</label>
        <div @click="toggleAuthorDropdown" :class="{ 'dropdown-active': isAuthorDropdownActive }"
             class="p-2 border rounded w-full text-sm md:text-base bg-white dropdown">
          {{ selectedAuthor || 'All Authors' }}
        </div>
        <ul v-if="isAuthorDropdownActive" class="absolute bg-gray-300 w-full max-h-[30vh] p-2 rounded-lg overflow-y-auto mt-2">
          <li v-for="author in authors" :key="author" @click="selectedAuthor = author; toggleAuthorDropdown()"
              class="p-2 cursor-pointer hover:bg-gray-400">{{ author }}</li>
        </ul>
      </div>
    </div>

    <!-- Main Content Section -->
    <main class="flex-1 bg-slate-100 p-4 md:p-6">
      <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="book in books" :key="book._id" class="bg-white p-4 rounded shadow-lg">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{{ book.title }}</h3>
          <p class="text-base sm:text-lg">Author: {{ book.author }}</p>
          <p class="text-base sm:text-lg">Price: ${{ book.price }}</p>
          <p class="text-base sm:text-lg">Category: {{ book.category }}</p>
          <p class="text-sm text-gray-600 mt-2">{{ book.description }}</p>
        </div>
      </div>

      <!-- No Books Available -->
      <div v-else class="text-center">
        <p class="text-lg sm:text-xl">No books available.</p>
      </div>
    </main>

    <!-- Pagination -->
    <div class="flex justify-center space-x-4 my-4 md:my-6">
      <button @click="previousPage" :disabled="currentPage === 1" 
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-base sm:text-lg">
        Previous
      </button>
      <span class="text-base sm:text-lg">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" 
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-base sm:text-lg">
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
