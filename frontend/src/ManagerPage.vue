<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import LoadingOverlay from './LoadingOverlay.vue'; // Overlay for loading/success display
import SuccessIcon from './SuccessIcon.vue'; // Success icon for feedback

const toast = useToast();

// Define Book interface
interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
}

// Pagination and book data
const books = ref<Book[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 9;

// Sorting states
const isDescending = ref(true); // Default sorting order

// State for popups and book actions
const editingBook = ref<Book | null>(null);
const showEditPopup = ref(false);
const showAddPopup = ref(false);
const showDeleteConfirmation = ref(false);
const showLoadingOverlay = ref(false); // State for showing loading overlay
const selectedBookToDelete = ref<Book | null>(null);

// State for adding a new book
const newBook = ref<Book>({ _id: '', title: '', author: '', price: 0, description: '', category: '' });

// Fetch books with sorting across all pages
const fetchBooks = async () => {
  try {
    const sort = isDescending.value ? 'desc' : 'asc';
    const response = await fetch(`http://localhost:3000/books?page=${currentPage.value}&limit=${limit}&sort=${sort}`);
    const data = await response.json();
    books.value = data.books;
    totalPages.value = data.totalPages;
  } catch (error) {
    toast.error('Failed to fetch books.');
  }
};

// Toggle sorting direction and fetch sorted books
const toggleSorting = () => {
  isDescending.value = !isDescending.value;
  currentPage.value = 1; // Reset to first page on sort change
  fetchBooks();
};

// Function to handle adding a new book
const addBook = async () => {
  try {
    const response = await fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook.value),
    });
    if (response.ok) {
      toast.success('Book added successfully');
      showLoadingOverlay.value = true; // Show overlay on success
      fetchBooks(); // Refresh the book list to include the new addition
      showAddPopup.value = false;
      newBook.value = { _id: '', title: '', author: '', price: 0, description: '', category: '' };
      setTimeout(() => showLoadingOverlay.value = false, 2000); // Hide overlay after 2 seconds
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error('Failed to add book');
  }
};

// Function to trigger edit popup
const editBook = (book: Book) => {
  editingBook.value = { ...book };
  showEditPopup.value = true;
};

// Function to save book changes
const saveBookChanges = async () => {
  if (!editingBook.value) return;

  try {
    const response = await fetch(`http://localhost:3000/books/${editingBook.value._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBook.value),
    });
    if (response.ok) {
      toast.success('Book updated successfully!');
      showEditPopup.value = false;
      editingBook.value = null;
      fetchBooks();
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error('Failed to update the book.');
  }
};

// Function to confirm deletion
const confirmDeleteBook = (book: Book) => {
  selectedBookToDelete.value = book;
  showDeleteConfirmation.value = true;
};

// Function to delete a book
const deleteBook = async () => {
  if (!selectedBookToDelete.value) return;

  try {
    const response = await fetch(`http://localhost:3000/books/${selectedBookToDelete.value._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast.success('Book deleted successfully');
      fetchBooks();
      showDeleteConfirmation.value = false;
      selectedBookToDelete.value = null;
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error('Failed to delete the book.');
  }
};

// Pagination handlers
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchBooks();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchBooks();
  }
};

// Initial fetch of books
onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div> 
    <AppHeader />
    <section class="p-8 min-h-[80vh] bg-gray-100 flex flex-col justify-between items-center">
      
      <!-- Add Book and Sort Buttons -->
      <div class="flex justify-between w-full mb-4">
        <button @click="showAddPopup = true" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Book
        </button>
        <button @click="toggleSorting" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Sort by Date {{ isDescending ? 'Descending' : 'Ascending' }}
        </button>
      </div>
      
      <!-- Header Section -->
      <header class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-600 mb-2">Manager Dashboard</h1>
        <p class="text-lg text-gray-700">Manage your books below</p>
      </header>

      <!-- Book List with Edit and Delete Buttons -->
      <div class="grid grid-cols-3 gap-8 w-full">
        <div v-for="book in books" :key="book._id" class="bg-white p-4 rounded-lg shadow-md relative flex flex-col">
          <div>
            <h2 class="font-semibold text-xl">{{ book.title }}</h2>
            <p class="text-gray-700">Author: {{ book.author }}</p>
            <p class="text-gray-700">Price: ${{ book.price }}</p>
            <p class="text-gray-700">Category: {{ book.category }}</p>
            <p class="text-gray-600">Description: {{ book.description }}</p>
          </div>
          
          <!-- Edit and Delete Buttons with SVG Icons -->
          <div class="flex justify-end space-x-4 mt-4">
            <button @click="editBook(book)" class="text-blue-500 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.232 4.232a2.5 2.5 0 113.536 3.536l-1.768 1.768-3.536-3.536 1.768-1.768zM4 15.5v4h4l10.707-10.707a1 1 0 000-1.414l-3.586-3.586a1 1 0 00-1.414 0L4 15.5z"/>
              </svg>
              <span>Edit</span>
            </button>
            <button @click="confirmDeleteBook(book)" class="text-red-500 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-6 space-x-4">
        <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Next
        </button>
      </div>

      <!-- Add Book Popup -->
      <div v-if="showAddPopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Add New Book</h3>
          <label class="block mb-2">
            Title:
            <input v-model="newBook.title" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Author:
            <input v-model="newBook.author" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Price:
            <input type="number" v-model="newBook.price" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Description:
            <input v-model="newBook.description" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Category:
            <input v-model="newBook.category" class="border p-2 w-full" />
          </label>
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showAddPopup = false" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button @click="addBook" class="bg-green-500 text-white px-4 py-2 rounded">Add Book</button>
          </div>
        </div>
      </div>

      <!-- Loading Overlay with Success Icon -->
      <LoadingOverlay v-if="showLoadingOverlay">
        <SuccessIcon />
        <p class="text-white text-xl mt-4">Book added successfully!</p>
      </LoadingOverlay>

      <!-- Edit Book Popup -->
      <div v-if="showEditPopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Edit Book</h3>
          <label class="block mb-2">
            Title:
            <input v-model="editingBook.title" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Author:
            <input v-model="editingBook.author" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Price:
            <input type="number" v-model="editingBook.price" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Description:
            <input v-model="editingBook.description" class="border p-2 w-full" />
          </label>
          <label class="block mb-2">
            Category:
            <input v-model="editingBook.category" class="border p-2 w-full" />
          </label>
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showEditPopup = false" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button @click="saveBookChanges" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Popup -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p>Are you sure you want to delete <strong>{{ selectedBookToDelete?.title }}</strong>?</p>
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showDeleteConfirmation = false" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button @click="deleteBook" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
