<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useToast } from 'vue-toastification'; // Import Vue Toastification

// Define types for the book and filters data
interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
}

interface FilterResponse {
  categories: string[];
  authors: string[];
}

// Initialize Vue Router and Toast
const toast = useToast(); // Create toast instance

// Reactive State Variables with proper types
const books = ref<Book[]>([]); // Array of Book objects
const searchQuery = ref<string>(''); // String for search query
const selectedCategory = ref<string>('All Categories'); // Selected category for filtering
const selectedAuthor = ref<string>('All Authors'); // Selected author for filtering
const categories = ref<string[]>([]); // Categories fetched from backend
const authors = ref<string[]>([]); // Authors fetched from backend
const currentPage = ref<number>(1); // Current page number
const totalPages = ref<number>(1); // Total number of pages
const isCategoryDropdownActive = ref<boolean>(false); // Track the active state of category dropdown
const isAuthorDropdownActive = ref<boolean>(false); // Track the active state of author dropdown
const isSearchButtonActive = ref<boolean>(false); // Control the "Show Results" button's active state
const welcomeShown = ref<boolean>(false); // Track whether the welcome message was shown

// Function to show Toast Notification
const showToast = (message: string, type: 'success' | 'error' = 'success'): void => {
  if (type === 'success') {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

// Fetch books from the backend with filters and pagination
const fetchBooks = async (page = 1, query = '', category = '', author = ''): Promise<void> => {
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
    showToast("Failed to load books. Please try again later.", "error");
    throw error;
  }
};

// Fetch categories and authors for dropdown filters
const fetchFilters = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/books/filters');
    const data: FilterResponse = await response.json();
    if (data) {
      categories.value = ['All Categories', ...data.categories];
      authors.value = ['All Authors', ...data.authors];
    }
  } catch (error) {
    console.error('Error fetching filters:', error);
    showToast("Failed to load filters. Please try again later.", "error");
    throw error;
  }
};

// Handle search and filter functionality on button click
const handleFilter = (page = 1): void => {
  const category = selectedCategory.value === 'All Categories' ? '' : selectedCategory.value;
  const author = selectedAuthor.value === 'All Authors' ? '' : selectedAuthor.value;
  fetchBooks(page, searchQuery.value, category, author);
};

// Clear all filters and reset to default values
const clearFilters = (): void => {
  searchQuery.value = '';
  selectedCategory.value = 'All Categories';
  selectedAuthor.value = 'All Authors';
  handleFilter(1);
  showToast("Search again", "success");
};

// Pagination logic
const nextPage = (): void => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    handleFilter(currentPage.value);
  }
};

const previousPage = (): void => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    handleFilter(currentPage.value);
  }
};

// Toggle dropdown for category
const toggleCategoryDropdown = (): void => {
  isCategoryDropdownActive.value = !isCategoryDropdownActive.value;
  isAuthorDropdownActive.value = false;
};

// Toggle dropdown for author
const toggleAuthorDropdown = (): void => {
  isAuthorDropdownActive.value = !isAuthorDropdownActive.value;
  isCategoryDropdownActive.value = false;
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent): void => {
  if (!(event.target as HTMLElement).closest('.dropdown')) {
    isCategoryDropdownActive.value = false;
    isAuthorDropdownActive.value = false;
  }
};

// Watch for changes to enable/disable the "Show Results" button
watch([searchQuery, selectedCategory, selectedAuthor], (): void => {
  const isSearchFilled = searchQuery.value.trim() !== '';
  const isCategorySelected = selectedCategory.value !== 'All Categories';
  const isAuthorSelected = selectedAuthor.value !== 'All Authors';
  isSearchButtonActive.value = isSearchFilled || isCategorySelected || isAuthorSelected;
});

// Lifecycle hook: Runs when the component mounts
onMounted(async (): Promise<void> => {
  try {
    // Fetch books and filters, show welcome message only if both succeed
    await fetchBooks(1);
    await fetchFilters();
    if (!welcomeShown.value) {
      showToast("Welcome to the Book Store!", "success");
      welcomeShown.value = true;
    }
  } catch (error) {
    // Handle error, no welcome toast if there's a failure
    console.error('Error during setup:', error);
  }
});

// Lifecycle hook: Runs before the component unmounts
onBeforeUnmount((): void => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="w-screen h-[80vh] flex flex-col">
    <!-- Search and Filter Section -->
    <div class="bg-slate-100 p-4 md:flex-row flex items-center justify-around max-w-full">
      <!-- Search Field -->
      <div class="w-3/12">
        <label class="block mb-2">Search by Title:</label>
        <input v-model="searchQuery" placeholder="Enter book title" 
          class="p-2 border rounded w-full text-sm md:text-base" />
      </div>

      <!-- Category Filter -->
      <div class="w-3/12 relative">
        <label class="block mb-2">Filter by Category:</label>
        <div @click="toggleCategoryDropdown" :class="{ 'dropdown-active': isCategoryDropdownActive }"
             class="p-2 border rounded w-full text-sm md:text-base bg-white dropdown">
          {{ selectedCategory || 'All Categories' }}
        </div>
        <ul v-if="isCategoryDropdownActive" class="absolute bg-gray-300 w-full p-2 rounded-lg overflow-y-auto mt-2">
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
        <ul v-if="isAuthorDropdownActive" class="absolute bg-gray-300 w-full p-2 rounded-lg overflow-y-auto mt-2">
          <li v-for="author in authors" :key="author" @click="selectedAuthor = author; toggleAuthorDropdown()"
              class="p-2 cursor-pointer hover:bg-gray-400">{{ author }}</li>
        </ul>
      </div>

      <!-- Filter Results Button -->
      <div>
<button @click="() => handleFilter()" :disabled="!isSearchButtonActive" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
  Show Results
</button>


      </div>

      <!-- Clear Filters Button -->
      <div>
        <button @click="clearFilters" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Main Content Section -->
    <main class="flex-1 bg-slate-300 p-4  md:p-6">
     <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div
    v-for="book in books"
    :key="book._id"
    class="bg-white p-4 h-60 rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  >
    <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 truncate">{{ book.title }}</h3>
    <p class="text-base sm:text-lg truncate">Author: {{ book.author }}</p>
    <p class="text-base sm:text-lg truncate">Price: ${{ book.price }}</p>
    <p class="text-base sm:text-lg truncate">Category: {{ book.category }}</p>
    <p class="text-sm text-gray-600 mt-2 truncate">{{ book.description }}</p>
  </div>
</div>



      <!-- Message for No Books Available -->
      <div v-else class="text-center">
        <p class="text-lg sm:text-xl">No books available.</p>
      </div>
    </main>

    <!-- Pagination Buttons -->
     <div class="bg-gray-100" >
      <div class="flex justify-center space-x-4 my-4 md:my-6">
            <button @click="previousPage" :disabled="currentPage === 1" 
               class="px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-base sm:text-lg">
             Previous
             </button>
           <span class="text-base sm:text-lg">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" 
               class="px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-base sm:text-lg">
             Next
           </button>
     </div>
    </div>
  </div>
</template>