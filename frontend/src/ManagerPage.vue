<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

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

// Editable fields and popups
const editingBook = ref<Book | null>(null);
const showEditPopup = ref(false);
const showEditWarning = ref(false);
const showDeleteConfirmation = ref(false);
const showFinalEditConfirmation = ref(false);
const selectedBookToDelete = ref<Book | null>(null);

const fetchBooks = async () => {
  try {
    const response = await fetch(`http://localhost:3000/books?page=${currentPage.value}&limit=${limit}`);
    const data = await response.json();
    books.value = data.books;
    totalPages.value = data.totalPages;
  } catch (error) {
    toast.error('Failed to fetch books.');
  }
};

// Trigger edit warning, then confirmation popup for editing
const editBook = (book: Book) => {
  editingBook.value = { ...book };
  showEditWarning.value = true;
};

const proceedToEdit = () => {
  showEditWarning.value = false;
  showEditPopup.value = true;
};

const saveBookChanges = async () => {
  if (!editingBook.value) return;

  showEditPopup.value = false;
  showFinalEditConfirmation.value = true;
};

const confirmEditSave = async () => {
  if (!editingBook.value) return;

  try {
    const response = await fetch(`http://localhost:3000/books/${editingBook.value._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBook.value),
    });
    if (response.ok) {
      toast.success('Book updated successfully!', {
        icon: customCheckmarkIcon(),
        timeout: 3000,
        onClose: () => {
          showFinalEditConfirmation.value = false;
          editingBook.value = null;
          fetchBooks(); // Refresh the book list after edit
        },
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error('Failed to update the book.');
  }
};

// Confirmation for deletion
const confirmDeleteBook = (book: Book) => {
  selectedBookToDelete.value = book;
  showDeleteConfirmation.value = true;
};

const deleteBook = async () => {
  if (!selectedBookToDelete.value) return;

  try {
    const response = await fetch(`http://localhost:3000/books/${selectedBookToDelete.value._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast.success('Book deleted successfully', {
        icon: customCheckmarkIcon(),
      });
      fetchBooks(); // Refresh the book list after deletion
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

const customCheckmarkIcon = () => `
  <svg class="toast-success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M6 12l4 4L18 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="checkmark-path"/>
  </svg>
`;
toast.success('Book updated successfully!', {
  icon: customCheckmarkIcon(),
  timeout: 3000,
});

onMounted(() => {
  fetchBooks();
});
</script>



<template>
  <div> 
    <AppHeader />
    <section class="p-8 min-h-[80vh] bg-gray-100 flex flex-col justify-between items-center">

      <!-- Header Section -->
      <header class="text-center mb-6">
        <h1 class="text-3xl font-bold text-blue-600 mb-2">Manager Dashboard</h1>
        <p class="text-lg text-gray-700">Manage your books below</p>
      </header>

      <!-- Book List with Modern SVG Icons for Edit and Delete -->
      <div class="grid grid-cols-3  gap-8 w-full">
        <div v-for="book in books" :key="book._id" class="bg-white p-4 rounded-lg shadow-md relative flex justify-between items-center">
          <div>
            <h2 class="font-semibold text-xl">{{ book.title }}</h2>
            <p class="text-gray-700">Author: {{ book.author }}</p>
            <p class="text-gray-700">Price: ${{ book.price }}</p>
          </div>
          
          <!-- SVG Icons for Edit and Delete, aligned with justify-between -->
          <div class="flex space-x-4">
            <button @click="editBook(book)" class="text-blue-500 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 3a1 1 0 0 1 .79.38l7.5 9a1 1 0 0 1 .02 1.24l-7.5 9A1 1 0 0 1 12 21V4a1 1 0 0 1 .5-.87Z"/>
              </svg>
              <span>Edit</span>
            </button>
            <button @click="confirmDeleteBook(book)" class="text-red-500 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.78 2.79a.5.5 0 0 1 .72 0l3.49 3.5a.5.5 0 0 1 0 .7l-12 12a.5.5 0 0 1-.7 0l-3.5-3.5a.5.5 0 0 1 0-.7l12-12ZM4.3 19.3a1 1 0 0 0 0 1.42L8 24a1 1 0 0 0 1.42 0l9.88-9.88-4.12-4.12L4.3 19.3Z"/>
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

      <!-- Warning for Edit Confirmation -->
      <div v-if="showEditWarning" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h3 class="text-lg mb-4 font-bold font-serif text-red-600 italic">Warning!</h3>
          <p>Be careful, you are about to edit important information for <strong>{{ editingBook.title }}</strong>.</p>
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showEditWarning = false" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button @click="proceedToEdit" class="bg-yellow-500 text-white px-4 py-2 rounded">Proceed</button>
          </div>
        </div>
      </div>

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
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showEditPopup = false" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button @click="saveBookChanges" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>

      <!-- Final Edit Confirmation Popup -->
      <div v-if="showFinalEditConfirmation" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Confirm Changes</h3>
          <p>Are you sure you want to save changes to <strong>{{ editingBook.title }}</strong>?</p>
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showFinalEditConfirmation = false" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button @click="confirmEditSave" class="bg-blue-500 text-white px-4 py-2 rounded">Yes, Save</button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Popup -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p>Are you sure you want to delete <strong>{{ selectedBookToDelete.title }}</strong>?</p>
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