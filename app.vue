<template>
      <div class="w-full min-h-screen bg-gray-100">
      <section class="text-center pt-7">
        <h1 class="text-4xl text-gray-800">What are we doing today?</h1>
      </section>
      <section class="flex items-center justify-center w-9/12 max-w-lg mx-auto bg-white shadow mt-7">
        <form @submit.prevent>
          <input type="text" class="px-4 py-2 border border-blue-200 focus:outline-blue-300">
          <button class="px-4 py-2 ml-3 transition-all duration-200 border border-blue-200 rounded hover:bg-blue-200">Add Todo</button>
        </form>
      </section>
    </div>
</template>
