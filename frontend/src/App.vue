<script setup lang="ts">
import bookStore from './assets/bookStore.jpg'
import { ref, onMounted } from 'vue'

const books = ref([]);            // All books fetched from backend
const searchQuery = ref('');       // Search query input by user
const selectedCategory = ref('');  // Selected category for filtering
const selectedAuthor = ref('');    // Selected author for filtering
const categories = ref([]);        // Categories fetched from backend
const authors = ref([]);           // Authors fetched from backend
const currentPage = ref(1);        // Current page number
const totalPages = ref(1);         // Total number of pages

// Fetch books from the backend with optional search query, category, and author filters
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

// Fetch categories and authors to populate filters
const fetchFilters = async () => {
  try {
    const response = await fetch('http://localhost:3000/books/filters');
    const data = await response.json();

    if (data) {
      categories.value = data.categories; // Populate categories filter
      authors.value = data.authors;       // Populate authors filter
    }
  } catch (error) {
    console.error('Error fetching filters:', error);
  }
};

// Handle search functionality
const handleSearch = () => {
  fetchBooks(1, searchQuery.value, selectedCategory.value, selectedAuthor.value); // Fetch filtered books
};

// Handle category and author filter changes
const handleFilterChange = () => {
  fetchBooks(1, searchQuery.value, selectedCategory.value, selectedAuthor.value); // Fetch filtered books
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

// Fetch initial data and filters when the component is mounted
onMounted(() => {
  fetchBooks(1);       // Fetch initial books
  fetchFilters();      // Fetch available categories and authors for filtering
});
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-slate-300 p-3 flex items-center justify-between">
      <div class="flex items-center">
        <img :src="bookStore" alt="Book Store" class="w-10 h-10 p-0" />
        <h1 class="ml-3 text-lg font-bold">Book Store</h1>
      </div>
      <p class="text-gray-600 text-sm">Welcome to the great book store!</p>
    </header>

    <!-- Search and Filter Section -->
    <div class="bg-slate-200 p-3 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
      <!-- Search Field -->
      <div class="w-full sm:w-1/3">
        <label class="block mb-1 text-sm">Search by Title:</label>
        <input v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Enter book title" 
          class="p-2 border rounded w-full text-sm" />
      </div>

      <!-- Category Filter -->
      <div class="w-full sm:w-1/3">
        <label class="block mb-1 text-sm">Filter by Category:</label>
        <select v-model="selectedCategory" @change="handleFilterChange" class="p-2 border rounded w-full text-sm">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <!-- Author Filter -->
      <div class="w-full sm:w-1/3">
        <label class="block mb-1 text-sm">Filter by Author:</label>
        <select v-model="selectedAuthor" @change="handleFilterChange" class="p-2 border rounded w-full text-sm">
          <option value="">All Authors</option>
          <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
        </select>
      </div>
    </div>

    <!-- Main Content Section (Books) -->
    <main class="flex-1 bg-slate-100 p-4">
      <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="book in books" :key="book._id" class="bg-white p-4 rounded shadow-sm border">
          <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
          <p class="text-sm">Author: {{ book.author }}</p>
          <p class="text-sm">Price: ${{ book.price }}</p>
          <p class="text-sm">Category: {{ book.category }}</p>
          <p class="text-xs text-gray-600 mt-1">{{ book.description }}</p>
        </div>
      </div>

      <!-- No Books Available -->
      <div v-else class="text-center">
        <p class="text-sm">No books available.</p>
      </div>
    </main>

    <!-- Pagination Section -->
    <div class="flex justify-center space-x-4 my-4">
      <button 
        @click="previousPage" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm" 
        :class="{ 'opacity-50': currentPage === 1 }">
        Previous
      </button>
      <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm" 
        :class="{ 'opacity-50': currentPage === totalPages }">
        Next
      </button>
    </div>

    <!-- Footer -->
    <footer class="bg-slate-400 p-3 text-center text-xs">
      <div>© 2024 All Rights Reserved</div>
      <div>Lorem ipsum dolor sit amet</div>
    </footer>
  </div>
</template>
